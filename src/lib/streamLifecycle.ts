import { vagonApi } from './vagonApi';

export class StreamLifecycle {
  private static instance: StreamLifecycle;
  private idleTimer: number | null = null;
  private readonly IDLE_TIMEOUT = 300000; // 5 minutes
  private isActive = false;

  private constructor() {
    this.setupEventListeners();
  }

  static getInstance(): StreamLifecycle {
    if (!StreamLifecycle.instance) {
      StreamLifecycle.instance = new StreamLifecycle();
    }
    return StreamLifecycle.instance;
  }

  private setupEventListeners(): void {
    // Page visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.startIdleTimer();
      } else {
        this.resetIdleTimer();
        this.wakeStream();
      }
    });

    // User activity
    const resetOnActivity = () => {
      if (document.visibilityState === 'visible') {
        this.resetIdleTimer();
        this.wakeStream();
      }
    };

    window.addEventListener('mousemove', resetOnActivity);
    window.addEventListener('keypress', resetOnActivity);
    window.addEventListener('click', resetOnActivity);
    window.addEventListener('scroll', resetOnActivity);
    window.addEventListener('touchstart', resetOnActivity);
  }

  private startIdleTimer(): void {
    if (this.idleTimer) {
      window.clearTimeout(this.idleTimer);
    }
    
    this.idleTimer = window.setTimeout(() => {
      this.sleepStream();
    }, this.IDLE_TIMEOUT);
  }

  private resetIdleTimer(): void {
    if (this.idleTimer) {
      window.clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
  }

  private async sleepStream(): Promise<void> {
    if (this.isActive) {
      try {
        // Cleanup and deactivate stream
        vagonApi.cleanup();
        this.isActive = false;
        console.log('Stream sleeping due to inactivity');
      } catch (error) {
        console.error('Error putting stream to sleep:', error);
      }
    }
  }

  private async wakeStream(): Promise<void> {
    if (!this.isActive) {
      try {
        await vagonApi.activateStream();
        this.isActive = true;
        console.log('Stream activated');
      } catch (error) {
        console.error('Error waking stream:', error);
      }
    }
  }

  public initialize(): void {
    if (document.visibilityState === 'visible') {
      this.wakeStream();
    } else {
      this.startIdleTimer();
    }
  }

  public cleanup(): void {
    this.resetIdleTimer();
    this.sleepStream();
  }
}</content>