import { useEffect, useState } from "react";

interface AudioArgs {
  soundIsOn: boolean
}
enum AudioModules {
  WHITE_NOISE = 'white-noise-processor'
}

const audioContext = new AudioContext();

async function getModuleAsNode(name: AudioModules) {
  await audioContext.audioWorklet.addModule(`modules/${name}.js`);
  return new AudioWorkletNode(audioContext, name);
}

export default function Audio({ soundIsOn }: AudioArgs) {
  const [isLoading, setLoading] = useState(true);
  const [audioNode, setAudioNode] = useState(undefined);
  let something: undefined | AudioWorkletNode;

  useEffect(() => {
    getModuleAsNode(AudioModules.WHITE_NOISE)
      .then(whiteNoiseNode => {
        something = whiteNoiseNode;
        setLoading(false);
      });
  }, [])

  if (isLoading || !something) {
    return <div>Loading Audio...</div>;
  }
  console.log('here');
  if (soundIsOn) {
    something.connect(audioContext.destination);
  } else {
    something.disconnect(audioContext.destination);
  }

  return <div></div>;
}
