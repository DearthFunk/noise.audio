// ref: https://noisehack.com/generate-noise-web-audio-api/

/**
 * Characterized by an equal distribution of frequencies across the audible spectrum (20Hz-20kHz), often described as a static or hissing sound. It can be effective at masking other sounds.
 */

class WhiteNoiseProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const output = outputs[0];
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        const white = Math.random() * 2 - 1;
        channel[i] = white;
      }
    });
    return true;
  }
}

registerProcessor("white-noise-processor", WhiteNoiseProcessor);
