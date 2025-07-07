// A low-frequency, continuous sound, often associated with mechanical sources.
// Rumble noise produces deep, low-frequency content similar to distant thunder or large machinery.

class RumbleNoiseProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.phase1 = 0;
    this.phase2 = 0;
    this.phase3 = 0;
    this.b0 = this.b1 = this.b2 = 0.0;
    this.sampleRate = 44100; // Default sample rate
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0];
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        // Generate multiple low-frequency components
        const omega1 = 2 * Math.PI * 40 / this.sampleRate;  // 40Hz
        const omega2 = 2 * Math.PI * 80 / this.sampleRate;  // 80Hz
        const omega3 = 2 * Math.PI * 120 / this.sampleRate; // 120Hz
        
        const lowFreq1 = Math.sin(this.phase1 * omega1) * 0.6;
        const lowFreq2 = Math.sin(this.phase2 * omega2) * 0.3;
        const lowFreq3 = Math.sin(this.phase3 * omega3) * 0.1;
        
        // Add filtered noise for texture
        const white = Math.random() * 2 - 1;
        this.b0 = 0.99765 * this.b0 + white * 0.0990460;
        this.b1 = 0.96300 * this.b1 + white * 0.2965164;
        this.b2 = 0.57000 * this.b2 + white * 0.1526913;
        
        const filteredNoise = (this.b0 + this.b1 + this.b2) * 0.1;
        
        // Combine all components
        const rumble = lowFreq1 + lowFreq2 + lowFreq3 + filteredNoise;
        
        // Add slight amplitude modulation for realism
        const modulation = 1.0 + 0.1 * Math.sin(this.phase1 * 0.001);
        
        channel[i] = rumble * modulation * 0.5;
        
        this.phase1++;
        this.phase2++;
        this.phase3++;
      }
    });
    return true;
  }
}

registerProcessor("rumble-noise-processor", RumbleNoiseProcessor);
