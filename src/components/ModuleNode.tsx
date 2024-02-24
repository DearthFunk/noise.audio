import { useEffect, useState } from "react";
import { AudioModuleWithContext, AudioModules } from "../constants";

export default function ModuleNode({ audioContext, soundIsOn, moduleName }: AudioModuleWithContext) {
    const [gainNode, setNode] = useState<GainNode| null>(null);
  
    useEffect(() => {
        console.log('Initializing Audio Setup: expect a complete message');
        async function getModule(moduleName: AudioModules) {
            await audioContext.audioWorklet.addModule(`modules/${moduleName}.js`);
        let audioWorkletNode = new AudioWorkletNode(audioContext, moduleName);
        let gainNode = audioContext.createGain();
        audioWorkletNode.connect(gainNode);
        gainNode.connect(audioContext.destination);
        setNode(gainNode);
        console.log('Audio Setup Initialized: CooMMMpleTE... .  .  .');
      }
      getModule(moduleName);
    }, [])
  
    if (!gainNode){
      return <div>Loading Audio Wokrlet Node</div>
    }
  
    if (soundIsOn) {
        gainNode.gain.setValueAtTime(0.8, audioContext.currentTime);
    } else {
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    }
    console.log(gainNode.gain);
    return <div>{soundIsOn ? 'On!' : 'off!'}</div>;
}
  