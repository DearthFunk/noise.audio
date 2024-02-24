import { useEffect, useState } from "react";
import { ModuleNames, VolumeLevel } from "../constants";
import GainControl from "./GainControl";

export default function ModuleNode({ moduleName}: {moduleName: ModuleNames}) {
    const audioContext = new AudioContext();
    const [soundIsOn, setSoundIsOn] = useState(false);
    const [gainNode, setGainNode] = useState<GainNode| null>(null);
    const [audioWorkletNode, setAudioWorkletNode] = useState<AudioWorkletNode| null>(null);

    async function setupModule(moduleName: ModuleNames) {
      await audioContext.audioWorklet.addModule(`modules/${moduleName}.js`);
      let newAudioWorkletNode = new AudioWorkletNode(audioContext, moduleName);
      let newGainNode = audioContext.createGain();
      newAudioWorkletNode.connect(newGainNode);
      newGainNode.connect(audioContext.destination);
      const volume = soundIsOn ? VolumeLevel.high : VolumeLevel.low;
      newGainNode.gain.setValueAtTime(volume, audioContext.currentTime);
      setGainNode(newGainNode);
      setAudioWorkletNode(newAudioWorkletNode);
    }

    useEffect(() => {
      // module type has changed, so we need to disconnect any pre-existing nodes first
      if (gainNode) { gainNode.disconnect(); }
      if (audioWorkletNode) { audioWorkletNode.disconnect(); }

      console.log('Initializing Audio Setup: expect a complete message');
      setupModule(moduleName);
      console.log('Audio Setup Initialized: CooMMMpleTE... .  .  .');
  
    }, [moduleName])
  
    if (!gainNode){
      return <div className="centerScreen">LoaDing Audi0 Wokrl€t Nod3... . . .</div>
    }

    return <GainControl node={gainNode} soundIsOn={soundIsOn} setSoundIsOn={setSoundIsOn} />
}
  