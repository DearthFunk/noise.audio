// Concentrates energy around a center frequency of 500 Hz, often associated with natural ambiences.
// Green noise has most of its energy focused in the mid-frequency range.

class GreenNoiseProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.phase = 0;
    this.sampleRate = 44100; // Default sample rate
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0];
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        const white = Math.random() * 2 - 1;
        
        // Create a bandpass filter centered around 500Hz
        const frequency = 500;
        const omega = 2 * Math.PI * frequency / this.sampleRate;
        const bandpassComponent = Math.sin(this.phase * omega) * white;
        
        // Apply gaussian-like envelope to concentrate energy around 500Hz
        const normalizedFreq = (i / channel.length) * (this.sampleRate / 2);
        const distance = Math.abs(normalizedFreq - 500) / 500;
        const envelope = Math.exp(-distance * distance * 4);
        
        channel[i] = bandpassComponent * envelope * 0.3; // compensate for gain
        this.phase++;
      }
    });
    return true;
  }
}

registerProcessor("green-noise-processor", GreenNoiseProcessor);
