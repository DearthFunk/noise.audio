import { useEffect, useState } from "react";
import { ModuleNames } from "../constants";
import GainControl from "./GainControl";

export default function ModuleNode({ moduleName}: {moduleName: ModuleNames}) {
    const audioContext = new AudioContext();
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
      return <div className="centerScreen">LoaDing Audi0 Wokrl€t Nod3... . . .</div>
    }

    return <GainControl node={gainNode} />
}
  