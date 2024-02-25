import { useEffect, useState } from "react";
import { ModuleNames, VOLUME_LEVEL } from "../constants";
import GainControl from "./GainControl";

export default function ModuleNode({ moduleName}: {moduleName: ModuleNames}) {
    const audioContext = new AudioContext();
    const [mute, setMute] = useState(true);
    const [gainNode, setGainNode] = useState<GainNode| null>(null);
    const [audioWorkletNode, setAudioWorkletNode] = useState<AudioWorkletNode| null>(null);

    async function setupModule(moduleName: ModuleNames) {
      await audioContext.audioWorklet.addModule(`modules/${moduleName}.js`);
      let newAudioWorkletNode = new AudioWorkletNode(audioContext, moduleName);
      let newGainNode = audioContext.createGain();
      newAudioWorkletNode.connect(newGainNode);
      newGainNode.connect(audioContext.destination);
      const newVolume = mute ? 0 : VOLUME_LEVEL; //dup-code, smell? dont' track mute, track gainNodes volume and add hook with selector?
      newGainNode.gain.setValueAtTime(newVolume, audioContext.currentTime);
      setGainNode(newGainNode);
      setAudioWorkletNode(newAudioWorkletNode);
    }

    useEffect(() => {
      // module type has changed, so we need to disconnect any pre-existing nodes first
      if (gainNode) { gainNode.disconnect(); }
      if (audioWorkletNode) { audioWorkletNode.disconnect(); }

      setupModule(moduleName);
  
    }, [moduleName])
  
    if (!gainNode){
      return null;
    }

    return <GainControl node={gainNode} mute={mute} setMute={setMute} />
}
  