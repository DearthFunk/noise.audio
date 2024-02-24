import { useEffect, useState } from "react";
import { ModuleToLoad, ModuleNames } from "../constants";
import GainControl from "./GainControl";

export default function ModuleNode({ audioContext, moduleName }: ModuleToLoad) {
    const [gainNode, setNode] = useState<GainNode| null>(null);
  
    useEffect(() => {
        console.log('Initializing Audio Setup: expect a complete message');
        async function getModule(moduleName: ModuleNames) {
        await audioContext.audioWorklet.addModule(`modules/${moduleName}.js`);
        let audioWorkletNode = new AudioWorkletNode(audioContext, moduleName);
        let gainNode = audioContext.createGain();
        audioWorkletNode.connect(gainNode);
        gainNode.connect(audioContext.destination);
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        setNode(gainNode);
        console.log('Audio Setup Initialized: CooMMMpleTE... .  .  .');
      }
      getModule(moduleName);
    }, [])
  
    if (!gainNode){
      return <div>LoaDing Audi0 Wokrl€t Nod3... . . .</div>
    }

    return <GainControl gainNode={gainNode} audioContext={audioContext} />
}
  