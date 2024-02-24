import { useEffect, useState } from "react";
import { ModuleNames } from "../constants";
import GainControl from "./GainControl";

export default function ModuleNode({ moduleName}: {moduleName: ModuleNames}) {
    const audioContext = new AudioContext();
    const [gainNode, setGainNode] = useState<GainNode| null>(null);
    const [audioWorkletNode, setAudioWorkletNode] = useState<AudioWorkletNode| null>(null);
    const [soundIsOn, setSoundIsOn] = useState(false);

    useEffect(() => {
      if (gainNode) { gainNode.disconnect(); }
      if (audioWorkletNode) { audioWorkletNode.disconnect(); }
      setSoundIsOn(false);

      console.log('Initializing Audio Setup: expect a complete message');

      async function getModule(moduleName: ModuleNames) {
        await audioContext.audioWorklet.addModule(`modules/${moduleName}.js`);
        let newAudioWorkletNode = new AudioWorkletNode(audioContext, moduleName);
        let newGainNode = audioContext.createGain();
        newAudioWorkletNode.connect(newGainNode);
        newGainNode.connect(audioContext.destination);
        newGainNode.gain.setValueAtTime(0, audioContext.currentTime);
        setGainNode(newGainNode);
        setAudioWorkletNode(newAudioWorkletNode);
        console.log('Audio Setup Initialized: CooMMMpleTE... .  .  .');
      }
  
      getModule(moduleName);
  
    }, [moduleName])
  
    if (!gainNode){
      return <div className="centerScreen">LoaDing Audi0 Wokrl€t Nod3... . . .</div>
    }

    return <GainControl node={gainNode} soundIsOn={soundIsOn} setSoundIsOn={setSoundIsOn} />
}
  