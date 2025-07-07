// A higher-pitched, often mechanical, continuous sound.
// Buzz noise is characterized by a consistent, high-pitched sound often associated with small motors or machinery.

class BuzzNoiseProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.phase = 0;
    this.sampleRate = 44100; // Default sample rate
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0];
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        const frequency = 1000; // Common buzz frequency in Hz
        const omega = 2 * Math.PI * frequency / this.sampleRate;
        const buzz = Math.sin(this.phase * omega);

        // Add slight variations to simulate real-world buzz
        const variation = (Math.random() * 2 - 1) * 0.05;

        channel[i] = (buzz + variation) * 0.5;
        this.phase++;
      }
    });
    return true;
  }
}

registerProcessor("buzz-noise-processor", BuzzNoiseProcessor);
