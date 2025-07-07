// A low-frequency, continuous sound, often caused by electrical currents.
// Hum noise typically occurs at 50Hz or 60Hz (power line frequencies) and their harmonics.

class HumNoiseProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.phase60 = 0;
    this.phase120 = 0;
    this.phase180 = 0;
    this.sampleRate = 44100; // Default sample rate
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0];
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        // 60Hz fundamental frequency (common electrical hum)
        const omega60 = 2 * Math.PI * 60 / this.sampleRate;
        const omega120 = 2 * Math.PI * 120 / this.sampleRate;
        const omega180 = 2 * Math.PI * 180 / this.sampleRate;
        
        // Generate harmonics with decreasing amplitude
        const fundamental = Math.sin(this.phase60 * omega60) * 0.8;
        const harmonic2 = Math.sin(this.phase120 * omega120) * 0.3;
        const harmonic3 = Math.sin(this.phase180 * omega180) * 0.1;
        
        // Add slight randomness to simulate real-world electrical hum
        const noise = (Math.random() * 2 - 1) * 0.05;
        
        channel[i] = (fundamental + harmonic2 + harmonic3 + noise) * 0.4;
        
        this.phase60++;
        this.phase120++;
        this.phase180++;
      }
    });
    return true;
  }
}

registerProcessor("hum-noise-processor", HumNoiseProcessor);
