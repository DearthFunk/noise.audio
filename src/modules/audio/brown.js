// ref: https://noisehack.com/generate-noise-web-audio-api/

/**
 * Also known as Red Noise.
 * Features even more energy concentrated in the lower frequencies than pink noise, producing a deep, rumbling sound like thunder. It is often used for relaxation, sleep, and reducing anxiety. 
 */

class BrownNoiseProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const output = outputs[0];
    output.forEach((channel) => {
      let lastOut = 0;
      for (let i = 0; i < channel.length; i++) {
        const white = Math.random() * 2 - 1;
        const newValue = Math.round((lastOut + (0.02 * white)) / 1.02 * 1000) / 1000;
        channel[i] = newValue;
        lastOut = channel[i];
        channel[i] *= 3.5; // (roughly) compensate for gain
      }
    });
    return true;
  }
}

registerProcessor("brown-noise-processor", BrownNoiseProcessor);
