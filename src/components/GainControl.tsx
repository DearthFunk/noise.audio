import { useState } from "react";
import Logo from "./Logo";

export default function GainControl({gainNode, audioContext}: { gainNode: GainNode, audioContext: AudioContext}) {
    const [soundIsOn, setSoundIsOn] = useState(false);
    
    const handleToggleSound = () => {
        setSoundIsOn(!soundIsOn);
        const newVolume = soundIsOn ? 0 : 0.9;
        gainNode.gain.setValueAtTime(newVolume, audioContext.currentTime);
    }
    
    return <Logo
        inGreyScale={soundIsOn}
        toggleSound={() => handleToggleSound()}
    />
}