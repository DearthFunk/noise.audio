
import { useState } from "react";
import Logo from "./Logo";
import { MenuItem, noises } from "../constants";

type NoiseWorkletNodes = Record<string, AudioWorkletNode>;

export default function Audio({selectedNoise}: {selectedNoise: string}) {
    let audioContext = new AudioContext();
    let [audioModules, setAudioModules] = useState<NoiseWorkletNodes | undefined>();
    let [isMuted, setIsMuted] = useState(true);

    const setupAudioModules = async () => {
        let newAudioModules: NoiseWorkletNodes = {};
         // Add audio modules for each noise
         await Promise.all(noises.map(async ({name}) => {
            await audioContext.audioWorklet.addModule(`modules/audio/${name}.js`);
            const noiseNode = new AudioWorkletNode(audioContext, `${name}-noise-processor`);
            newAudioModules[name] = noiseNode;
        }));
        setAudioModules(newAudioModules);
    }

    if (!audioModules) {
        setupAudioModules();
        return <span>'Loading...'</span>;
    }

    return <Logo active={!isMuted} onClick={() => setIsMuted(!isMuted)} />;
}
