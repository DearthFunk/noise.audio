interface AudioArgs {
  soundIsOn: boolean
}
export default function Audio({ soundIsOn }: AudioArgs) {

  setup();

  async function setup() {
    console.log(' SETUP =========');
    const audioContext = new AudioContext();
    debugger;
    await audioContext.audioWorklet.addModule("modules/random-noise-processor.js");
    const randomNoiseNode = new AudioWorkletNode(audioContext, "random-noise-processor");
    randomNoiseNode.connect(audioContext.destination);
    console.log(randomNoiseNode);
  };

  return <div></div>;
}
