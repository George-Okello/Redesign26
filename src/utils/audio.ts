class AudioManager {
  private ctx: AudioContext | null = null;
  private clickBuffer: AudioBuffer | null = null;
  private hoverBuffer: AudioBuffer | null = null;
  private _isMuted: boolean = false;
  
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private ambientPan: StereoPannerNode | null = null;
  private _isAmbientPlaying = false;

  get isMuted() {
    return this._isMuted;
  }

  setMuted(muted: boolean) {
    this._isMuted = muted;
    if (muted) {
      this.stopAmbient();
    }
  }

  private getContext() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playHover() {
    if (this._isMuted) return;
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      // High frequency, low volume "click/tick" for hover
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1500, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.03);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch (e) {
      // Ignore audio errors
    }
  }

  playClick() {
    if (this._isMuted) return;
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      // Sharp, crisp "clack" for click
      osc.type = 'square';
      osc.frequency.setValueAtTime(3000, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Ignore
    }
  }

  startAmbient() {
    if (this._isMuted || this._isAmbientPlaying) return;
    try {
      const ctx = this.getContext();
      // Ensure browser supports StereoPannerNode
      if (!ctx.createStereoPanner) return;

      this.ambientOsc = ctx.createOscillator();
      this.ambientGain = ctx.createGain();
      this.ambientPan = ctx.createStereoPanner();

      // Deep drone sound for ambient lab environment
      this.ambientOsc.type = 'sine';
      this.ambientOsc.frequency.setValueAtTime(60, ctx.currentTime);
      // Add subtle modulation
      this.ambientOsc.frequency.linearRampToValueAtTime(65, ctx.currentTime + 5);

      this.ambientGain.gain.setValueAtTime(0, ctx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 2); // Gentle fade in

      this.ambientPan.pan.setValueAtTime(0, ctx.currentTime);

      this.ambientOsc.connect(this.ambientPan);
      this.ambientPan.connect(this.ambientGain);
      this.ambientGain.connect(ctx.destination);

      this.ambientOsc.start();
      this._isAmbientPlaying = true;
    } catch (e) {}
  }

  stopAmbient() {
    if (!this._isAmbientPlaying || !this.ambientGain || !this.ambientOsc) return;
    try {
      const ctx = this.getContext();
      // Fade out
      this.ambientGain.gain.cancelScheduledValues(ctx.currentTime);
      this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, ctx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
      
      setTimeout(() => {
        if (this.ambientOsc) {
          try {
            this.ambientOsc.stop();
            this.ambientOsc.disconnect();
          } catch(e){}
        }
        this.ambientPan?.disconnect();
        this.ambientGain?.disconnect();
        
        this.ambientOsc = null;
        this.ambientPan = null;
        this.ambientGain = null;
        this._isAmbientPlaying = false;
      }, 1000);
    } catch (e) {}
  }

  setAmbientPan(panValue: number) {
    if (this.ambientPan && this._isAmbientPlaying) {
      try {
        const ctx = this.getContext();
        // panValue should be between -1 and 1
        const safePan = Math.max(-1, Math.min(1, panValue));
        this.ambientPan.pan.setTargetAtTime(safePan, ctx.currentTime, 0.1);
      } catch (e) {}
    }
  }
}

export const audio = new AudioManager();
