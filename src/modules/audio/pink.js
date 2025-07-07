// ref: https://noisehack.com/generate-noise-web-audio-api/

/**
 *  Has a balance of frequencies with more energy in the lower frequencies than white noise, decreasing by 3dB per octave. It is often described as a smooth, calming sound and is frequently used in audio testing and sound masking.
 */

class PinkNoiseProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const output = outputs[0];
    var b0, b1, b2, b3, b4, b5, b6;
    b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        channel[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        channel[i] *= 0.11; // (roughly) compensate for gain
        b6 = white * 0.115926;
      }
    });
    return true;
  }
}

registerProcessor("pink-noise-processor", PinkNoiseProcessor);
