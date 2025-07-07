// A high-frequency, often static-like sound, similar to white noise but potentially less evenly distributed.
// Hiss noise emphasizes higher frequencies and is commonly heard in audio equipment or tape recordings.

class HissNoiseProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const output = outputs[0];
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        const white = Math.random() * 2 - 1;
        
        // Emphasize higher frequencies with a high-pass characteristic
        const highFreqWeight = Math.pow(i / channel.length, 0.7);
        
        // Add some irregularity to make it less evenly distributed than white noise
        const irregularity = Math.sin(i * 0.01) * 0.3;
        
        channel[i] = white * (0.3 + highFreqWeight + irregularity) * 0.6;
      }
    });
    return true;
  }
}

registerProcessor("hiss-noise-processor", HissNoiseProcessor);
