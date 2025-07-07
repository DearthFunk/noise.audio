// An intermittent, often high-frequency, sound.
// Crackling noise produces sporadic bursts of high-frequency content, like fire crackling or electrical sparks.

class CracklingNoiseProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.timeSinceLastCrackle = 0;
    this.nextCrackleTime = this.generateNextCrackleTime();
    this.crackleDuration = 100; // samples
    this.crackleSamples = 0;
    this.burstCount = 0;
    this.burstsInSequence = 0;
  }

  generateNextCrackleTime() {
    // Random interval between crackles (0.05 to 0.5 seconds)
    return Math.random() * 22050 + 2205; // at 44.1kHz
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0];
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        this.timeSinceLastCrackle++;
        
        // Check if it's time for a new crackle
        if (this.timeSinceLastCrackle >= this.nextCrackleTime && this.crackleSamples === 0) {
          this.crackleSamples = this.crackleDuration;
          this.timeSinceLastCrackle = 0;
          this.burstCount++;
          
          // Sometimes create sequences of rapid crackles
          if (this.burstsInSequence > 0) {
            this.nextCrackleTime = Math.random() * 1000 + 500; // Very short interval
            this.burstsInSequence--;
          } else {
            this.nextCrackleTime = this.generateNextCrackleTime();
            // Occasionally start a new burst sequence
            if (Math.random() < 0.3) {
              this.burstsInSequence = Math.floor(Math.random() * 4) + 2;
            }
          }
        }
        
        // Generate crackling sound
        if (this.crackleSamples > 0) {
          // High-frequency emphasis with rapid decay
          const progress = (this.crackleDuration - this.crackleSamples) / this.crackleDuration;
          const amplitude = Math.exp(-12 * progress);
          
          // High-frequency noise with some mid-frequency content
          const highFreqNoise = (Math.random() * 2 - 1) * amplitude;
          const midFreqNoise = (Math.random() * 2 - 1) * amplitude * 0.3;
          
          channel[i] = (highFreqNoise + midFreqNoise) * 0.6;
          this.crackleSamples--;
        } else {
          channel[i] = 0;
        }
      }
    });
    return true;
  }
}

registerProcessor("crackling-noise-processor", CracklingNoiseProcessor);
