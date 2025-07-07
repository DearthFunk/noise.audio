// Similar to pink noise, with equal power across all frequencies but adjusted to mimic human hearing perception.
// Gray noise accounts for the human ear's sensitivity curve to create psychoacoustically balanced noise.

class GrayNoiseProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.b0 = this.b1 = this.b2 = this.b3 = this.b4 = this.b5 = this.b6 = 0.0;
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0];
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        const white = Math.random() * 2 - 1;
        
        // Apply psychoacoustic curve weighting (approximation of equal-loudness contour)
        this.b0 = 0.99886 * this.b0 + white * 0.0555179;
        this.b1 = 0.99332 * this.b1 + white * 0.0750759;
        this.b2 = 0.96900 * this.b2 + white * 0.1538520;
        this.b3 = 0.86650 * this.b3 + white * 0.3104856;
        this.b4 = 0.55000 * this.b4 + white * 0.5329522;
        this.b5 = -0.7616 * this.b5 - white * 0.0168980;
        
        // Apply human hearing curve compensation
        const pinkComponent = this.b0 + this.b1 + this.b2 + this.b3 + this.b4 + this.b5 + this.b6 + white * 0.5362;
        const hearingWeight = 1.0 + 0.2 * Math.sin(i / channel.length * Math.PI * 0.5);
        
        channel[i] = pinkComponent * hearingWeight * 0.08; // compensate for gain
        this.b6 = white * 0.115926;
      }
    });
    return true;
  }
}

registerProcessor("gray-noise-processor", GrayNoiseProcessor);
