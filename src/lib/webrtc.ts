import 'webrtc-adapter';

interface PixelStreamConfig {
  onAudioTrack?: (track: MediaStreamTrack) => void;
  onMessage?: (message: any) => void;
  onConnectionStateChange?: (state: RTCPeerConnectionState) => void;
}

class WebRTCManager {
  private peerConnection: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private audioStream: MediaStream | null = null;
  private config: PixelStreamConfig;

  constructor(config: PixelStreamConfig = {}) {
    this.config = config;
    this.initializePeerConnection();
  }

  private async initializePeerConnection() {
    const configuration: RTCConfiguration = {
      iceServers: [
        {
          urls: [
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
          ],
        }
      ],
      bundlePolicy: 'max-bundle',
      rtcpMuxPolicy: 'require',
      sdpSemantics: 'unified-plan'
    };

    this.peerConnection = new RTCPeerConnection(configuration);

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('New ICE candidate:', event.candidate);
      }
    };

    this.peerConnection.onconnectionstatechange = () => {
      const state = this.peerConnection?.connectionState;
      console.log('Connection state:', state);
      this.config.onConnectionStateChange?.(state!);
    };

    this.peerConnection.ontrack = (event) => {
      console.log('Track received:', event.track.kind);
      if (event.track.kind === 'audio') {
        this.config.onAudioTrack?.(event.track);
      }
    };

    this.setupDataChannel();
  }

  private setupDataChannel() {
    if (!this.peerConnection) return;

    this.dataChannel = this.peerConnection.createDataChannel('datachannel', {
      ordered: true,
      maxRetransmits: 0
    });

    this.dataChannel.onopen = () => {
      console.log('Data channel opened');
    };

    this.dataChannel.onclose = () => {
      console.log('Data channel closed');
    };

    this.dataChannel.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        this.config.onMessage?.(message);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    this.peerConnection.ondatachannel = (event) => {
      const channel = event.channel;
      channel.onmessage = (e) => {
        try {
          const message = JSON.parse(e.data);
          this.config.onMessage?.(message);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };
    };
  }

  public async createOffer(): Promise<RTCSessionDescriptionInit> {
    if (!this.peerConnection) throw new Error('Peer connection not initialized');

    const offer = await this.peerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    });
    
    await this.peerConnection.setLocalDescription(offer);
    console.log('SDP Offer:', this.peerConnection.localDescription?.sdp);
    return offer;
  }

  public async handleAnswer(answer: RTCSessionDescriptionInit) {
    if (!this.peerConnection) throw new Error('Peer connection not initialized');
    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    console.log('SDP Answer:', this.peerConnection.remoteDescription?.sdp);
  }

  public async handleCandidate(candidate: RTCIceCandidateInit) {
    if (!this.peerConnection) throw new Error('Peer connection not initialized');
    await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  }

  public sendMessage(message: any) {
    if (this.dataChannel?.readyState === 'open') {
      this.dataChannel.send(JSON.stringify(message));
    }
  }

  public async startAudio() {
    try {
      this.audioStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 48000,
          channelCount: 2
        }
      });

      this.audioStream.getTracks().forEach(track => {
        if (this.peerConnection) {
          this.peerConnection.addTrack(track, this.audioStream!);
        }
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
      throw error;
    }
  }

  public stopAudio() {
    if (this.audioStream) {
      this.audioStream.getTracks().forEach(track => track.stop());
      this.audioStream = null;
    }
  }

  public cleanup() {
    this.stopAudio();
    if (this.dataChannel) {
      this.dataChannel.close();
    }
    if (this.peerConnection) {
      this.peerConnection.close();
    }
    this.dataChannel = null;
    this.peerConnection = null;
  }
}

export const webRTCManager = new WebRTCManager({
  onAudioTrack: (track) => {
    const audioElement = new Audio();
    audioElement.volume = 1.0;
    const stream = new MediaStream([track]);
    audioElement.srcObject = stream;
    audioElement.play().catch(error => {
      console.error('Error playing audio:', error);
      document.addEventListener('click', () => {
        audioElement.play().catch(console.error);
      }, { once: true });
    });
  },
  onMessage: (message) => {
    console.log('Received message:', message);
  },
  onConnectionStateChange: (state) => {
    console.log('Connection state changed:', state);
  }
});