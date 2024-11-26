import axios from 'axios';

interface RegionPing {
  region: string;
  ping: number;
}

interface PingResult {
  regionPings: RegionPing[];
  bestRegion: string;
}

export class VagonPinger {
  private static readonly PING_ENDPOINT = 'https://app.vagon.io/ping';
  private static readonly REGIONS = [
    'dublin',        // 108.128.247.206, 46.137.22.30
    'frankfurt',     // 3.123.182.185, 3.125.217.59
    'north_virginia',// 34.195.8.219, 35.168.183.190
    'singapore',     // 52.74.82.212, 54.254.155.254
    'tokyo'         // 18.178.188.247, 35.74.75.36
  ];

  private static readonly REGION_IPS = {
    dublin: ['108.128.247.206', '46.137.22.30'],
    frankfurt: ['3.123.182.185', '3.125.217.59'],
    north_virginia: ['34.195.8.219', '35.168.183.190'],
    singapore: ['52.74.82.212', '54.254.155.254'],
    tokyo: ['18.178.188.247', '35.74.75.36']
  };

  private static async pingRegion(region: string): Promise<number> {
    const start = performance.now();
    try {
      // Try primary endpoint
      await axios.get(`${this.PING_ENDPOINT}/${region}`, { 
        timeout: 5000,
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      // Also try IP addresses for more accurate latency
      const ips = this.REGION_IPS[region as keyof typeof this.REGION_IPS] || [];
      await Promise.all(ips.map(ip => 
        axios.get(`https://${ip}`, { 
          timeout: 2000,
          validateStatus: () => true // Accept any status to avoid errors
        })
      ));

      return Math.round(performance.now() - start);
    } catch {
      return Infinity;
    }
  }

  static async getRegionPings(regions = this.REGIONS): Promise<PingResult> {
    const pingPromises = regions.map(async (region) => ({
      region,
      ping: await this.pingRegion(region)
    }));

    const regionPings = await Promise.all(pingPromises);
    const sortedPings = regionPings.sort((a, b) => a.ping - b.ping);
    
    return {
      regionPings: sortedPings,
      bestRegion: sortedPings[0].region
    };
  }
}

export default VagonPinger;