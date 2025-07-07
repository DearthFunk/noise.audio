// An even more extreme version of blue noise, Violet noise emphasizes high frequencies even more.
// With even steeper frequency emphasis than blue noise.

class VioletNoiseProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const output = outputs[0];
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        const white = Math.random() * 2 - 1;
        // More aggressive high-frequency emphasis than blue noise
        channel[i] = white * Math.pow(i / channel.length, 2);
      }
    });
    return true;
  }
}

registerProcessor("violet-noise-processor", VioletNoiseProcessor);
