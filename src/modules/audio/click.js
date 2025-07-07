// A short, sharp sound, often caused by electrical or mechanical events.
// Click noise produces brief, sharp impulses that occur at random intervals.

class ClickNoiseProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.timeSinceLastClick = 0;
    this.nextClickTime = this.generateNextClickTime();
    this.clickDuration = 50; // samples
    this.clickSamples = 0;
  }

  generateNextClickTime() {
    // Random interval between clicks (0.1 to 2 seconds)
    return Math.random() * 88200 + 4410; // at 44.1kHz
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0];
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        this.timeSinceLastClick++;
        
        // Check if it's time for a new click
        if (this.timeSinceLastClick >= this.nextClickTime && this.clickSamples === 0) {
          this.clickSamples = this.clickDuration;
          this.timeSinceLastClick = 0;
          this.nextClickTime = this.generateNextClickTime();
        }
        
        // Generate click sound
        if (this.clickSamples > 0) {
          // Sharp attack with exponential decay
          const amplitude = Math.exp(-5 * (this.clickDuration - this.clickSamples) / this.clickDuration);
          const noise = (Math.random() * 2 - 1) * amplitude;
          channel[i] = noise * 0.8;
          this.clickSamples--;
        } else {
          channel[i] = 0;
        }
      }
    });
    return true;
  }
}

registerProcessor("click-noise-processor", ClickNoiseProcessor);
