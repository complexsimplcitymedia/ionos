import axios, { AxiosError } from 'axios';
import { VagonAuth } from './vagonAuth';
import VagonPinger from './vagonPinger';

const VAGON_API_URL = 'https://api.vagon.io/v2';
const VAGON_STREAM_API_URL = 'https://api.vagon.io/app-stream-management/v2';
const TIMEOUT = 10000;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

interface StreamStatus {
  status: 'running' | 'stopped' | 'starting' | 'stopping' | 'unknown';
  message?: string;
  region?: string;
  quality?: 'good' | 'fair' | 'poor';
}

interface VagonConfig {
  apiKey: string;
  secretKey: string;
  appId: string;
  streamId: string;
  streamUrl: string;
  region?: string;
}

interface ConnectionQuality {
  latency: number;
  jitter: number;
  packetLoss: number;
}

class VagonAPI {
  private config: VagonConfig;
  private retryCount: number = 0;
  private connectionQuality: ConnectionQuality = {
    latency: 0,
    jitter: 0,
    packetLoss: 0
  };
  private controller: AbortController | null = null;

  constructor() {
    const streamUrl = import.meta.env.VITE_VAGON_STREAM_URL;
    const streamId = streamUrl.split('/').pop() || '';

    this.config = {
      apiKey: import.meta.env.VITE_VAGON_API_KEY,
      secretKey: import.meta.env.VITE_VAGON_SECRET_KEY,
      appId: import.meta.env.VITE_VAGON_APP_ID,
      streamId,
      streamUrl: streamUrl.replace('wss://', 'https://')
    };

    this.validateConfig();
    this.initializeRegion();
  }

  private async initializeRegion() {
    try {
      const { bestRegion } = await VagonPinger.getRegionPings();
      this.config.region = bestRegion;
    } catch (error) {
      console.warn('Failed to determine optimal region:', error);
    }
  }

  private validateConfig() {
    const { apiKey, secretKey, appId, streamUrl, streamId } = this.config;

    if (!streamUrl || !streamId) {
      throw new Error('Stream URL is not configured. Please check your environment variables.');
    }
    if (!apiKey || !secretKey || !appId) {
      throw new Error('Missing required Vagon credentials. Please check your environment variables.');
    }

    try {
      new URL(streamUrl);
    } catch (e) {
      throw new Error('Invalid stream URL format. Please check your configuration.');
    }
  }

  private getAuthHeaders(method: string, path: string, body: string = '') {
    return VagonAuth.generateAuthHeaders(
      this.config.apiKey,
      this.config.secretKey,
      method,
      path,
      body
    );
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async retryRequest<T>(request: () => Promise<T>): Promise<T> {
    try {
      return await request();
    } catch (error) {
      if (this.retryCount < MAX_RETRIES) {
        this.retryCount++;
        await this.delay(RETRY_DELAY * this.retryCount);
        return this.retryRequest(request);
      }
      throw error;
    }
  }

  private formatError(error: unknown): Error {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;
      
      if (status === 401 || status === 403) {
        return new Error('Authentication failed. Please check your API credentials.');
      }
      if (status === 404) {
        return new Error('Stream not found. Please check your configuration.');
      }
      if (status >= 500) {
        return new Error('Stream service is temporarily unavailable. Please try again later.');
      }
      
      return new Error(`Stream service error: ${message}`);
    }
    
    return error instanceof Error ? error : new Error('An unexpected error occurred');
  }

  private assessConnectionQuality(): 'good' | 'fair' | 'poor' {
    const { latency, jitter, packetLoss } = this.connectionQuality;
    
    if (latency < 100 && jitter < 30 && packetLoss < 1) {
      return 'good';
    }
    if (latency < 200 && jitter < 50 && packetLoss < 3) {
      return 'fair';
    }
    return 'poor';
  }

  async activateStream(): Promise<void> {
    // Cancel any existing requests
    if (this.controller) {
      this.controller.abort();
    }
    this.controller = new AbortController();

    const path = `/streams/${this.config.streamId}/activate`;
    const headers = this.getAuthHeaders('PUT', path);

    try {
      await axios.put(
        `${VAGON_STREAM_API_URL}${path}`,
        {},
        { 
          headers, 
          timeout: TIMEOUT,
          signal: this.controller.signal
        }
      );
    } catch (error) {
      if (axios.isCancel(error)) {
        return; // Request was cancelled, ignore error
      }
      const formattedError = this.formatError(error);
      console.error('Failed to activate stream:', formattedError.message);
      throw formattedError;
    }
  }

  async getStreamStatus(): Promise<StreamStatus> {
    try {
      // First, try to activate the stream
      await this.activateStream();

      // Then check the status
      const path = `/applications/${this.config.appId}/status`;
      const headers = this.getAuthHeaders('GET', path);

      const response = await this.retryRequest(() => 
        axios.get(`${VAGON_API_URL}${path}`, {
          headers,
          timeout: TIMEOUT,
          signal: this.controller?.signal
        })
      );

      // Update connection quality metrics
      if (response.data.metrics) {
        this.connectionQuality = {
          latency: response.data.metrics.latency || 0,
          jitter: response.data.metrics.jitter || 0,
          packetLoss: response.data.metrics.packetLoss || 0
        };
      }

      return {
        status: response.data.status || 'unknown',
        message: response.data.message,
        region: this.config.region,
        quality: this.assessConnectionQuality()
      };
    } catch (error) {
      if (axios.isCancel(error)) {
        throw new Error('Request cancelled');
      }
      const formattedError = this.formatError(error);
      console.error('Failed to get stream status:', formattedError.message);
      throw formattedError;
    } finally {
      this.retryCount = 0;
    }
  }

  getStreamUrl(): string {
    const url = new URL(this.config.streamUrl);
    if (this.config.region) {
      url.searchParams.set('region', this.config.region);
    }
    return url.toString();
  }

  async switchRegion(newRegion: string): Promise<void> {
    this.config.region = newRegion;
    // Force a new connection with the new region
    await this.getStreamStatus();
  }

  cleanup(): void {
    if (this.controller) {
      this.controller.abort();
      this.controller = null;
    }
  }
}

export const vagonApi = new VagonAPI();