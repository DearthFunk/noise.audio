// Similar to click noise but often with a more pronounced "popping" sound.
// Pop noise creates sudden bursts with a characteristic low-frequency thump followed by a quick decay.

class PopNoiseProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.timeSinceLastPop = 0;
    this.nextPopTime = this.generateNextPopTime();
    this.popDuration = 200; // samples - longer than clicks
    this.popSamples = 0;
    this.phase = 0;
  }

  generateNextPopTime() {
    // Random interval between pops (0.5 to 3 seconds)
    return Math.random() * 132300 + 22050; // at 44.1kHz
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0];
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        this.timeSinceLastPop++;
        
        // Check if it's time for a new pop
        if (this.timeSinceLastPop >= this.nextPopTime && this.popSamples === 0) {
          this.popSamples = this.popDuration;
          this.timeSinceLastPop = 0;
          this.nextPopTime = this.generateNextPopTime();
          this.phase = 0;
        }
        
        // Generate pop sound
        if (this.popSamples > 0) {
          // Create a low-frequency "thump" with exponential decay
          const progress = (this.popDuration - this.popSamples) / this.popDuration;
          const amplitude = Math.exp(-8 * progress);
          
          // Low frequency component for the "pop" character
          const lowFreq = Math.sin(this.phase * 0.1) * amplitude;
          const noise = (Math.random() * 2 - 1) * amplitude * 0.3;
          
          channel[i] = (lowFreq + noise) * 0.7;
          this.popSamples--;
          this.phase++;
        } else {
          channel[i] = 0;
        }
      }
    });
    return true;
  }
}

registerProcessor("pop-noise-processor", PopNoiseProcessor);
