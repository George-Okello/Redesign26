class AudioManager {
  private ctx: AudioContext | null = null;
  private _isMuted: boolean = false;
  private lastHoverTime: number = 0;
  
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

  /**
   * Premium glass-chime hover effect for major buttons and CTAs
   */
  playHover() {
    if (this._isMuted) return;
    const now = Date.now();
    if (now - this.lastHoverTime < 50) return; // Throttling for smooth rapid hovering
    this.lastHoverTime = now;

    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2400, ctx.currentTime);

      osc.type = 'sine';
      // Subtle pitch lift: 1400Hz -> 2100Hz
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(2100, ctx.currentTime + 0.04);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.012, ctx.currentTime + 0.008);
      gainNode.gain.exponentialRampToValueAtTime(0.0005, ctx.currentTime + 0.04);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  }

  /**
   * Ultra-subtle acoustic micro-tick for dense lists, icons, and cards
   */
  playSubtleHover() {
    if (this._isMuted) return;
    const now = Date.now();
    if (now - this.lastHoverTime < 40) return;
    this.lastHoverTime = now;

    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(950, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.02);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.008, ctx.currentTime + 0.005);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.02);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } catch (e) {}
  }

  /**
   * Tactile, refined mechanical click
   */
  playClick() {
    if (this._isMuted) return;
    try {
      const ctx = this.getContext();

      // High crisp snap
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.03);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 0.004);
      gainNode.gain.exponentialRampToValueAtTime(0.0005, ctx.currentTime + 0.03);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.03);

      // Low warm thud body
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(160, ctx.currentTime);
      subOsc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.04);

      subGain.gain.setValueAtTime(0, ctx.currentTime);
      subGain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.005);
      subGain.gain.exponentialRampToValueAtTime(0.0005, ctx.currentTime + 0.04);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);

      subOsc.start();
      subOsc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  }

  /**
   * Harmonic dual-tone chime for state toggles or mode switches
   */
  playToggle() {
    if (this._isMuted) return;
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      // C5 to E5 harmonic interval
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc2.frequency.setValueAtTime(659.25, now + 0.04); // E5

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.02, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.12);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.12);
      osc2.start(now + 0.04);
      osc2.stop(now + 0.12);
    } catch (e) {}
  }

  /**
   * Expanding swell sound effect for cards and modals
   */
  playCardExpand() {
    if (this._isMuted) return;
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.018, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }

  startAmbient() {
    if (this._isMuted || this._isAmbientPlaying) return;
    try {
      const ctx = this.getContext();
      if (!ctx.createStereoPanner) return;

      this.ambientOsc = ctx.createOscillator();
      this.ambientGain = ctx.createGain();
      this.ambientPan = ctx.createStereoPanner();

      this.ambientOsc.type = 'sine';
      this.ambientOsc.frequency.setValueAtTime(60, ctx.currentTime);
      this.ambientOsc.frequency.linearRampToValueAtTime(65, ctx.currentTime + 5);

      this.ambientGain.gain.setValueAtTime(0, ctx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 2);

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
        const safePan = Math.max(-1, Math.min(1, panValue));
        this.ambientPan.pan.setTargetAtTime(safePan, ctx.currentTime, 0.1);
      } catch (e) {}
    }
  }
}

export const audio = new AudioManager();
