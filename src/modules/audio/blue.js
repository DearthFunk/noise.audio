// Characterized by an emphasis on higher frequencies, with power density increasing by 3dB per octave.
// Blue noise can sound shrill and is sometimes described as a hissing sound.

class BlueNoiseProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const output = outputs[0];
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        const white = Math.random() * 2 - 1;
        channel[i] = white * (i / channel.length);
      }
    });
    return true;
  }
}

registerProcessor("blue-noise-processor", BlueNoiseProcessor);
