import { useState } from "react";
import Logo from "./Logo";

export default function GainControl({node}: { node: GainNode}) {
    const [soundIsOn, setSoundIsOn] = useState(false);
    
    const handleToggleSound = () => {
        setSoundIsOn(!soundIsOn);
        const newVolume = soundIsOn ? 0 : 0.9;
        node.gain.setValueAtTime(newVolume, 0);
    }
    
    return <Logo
        inGreyScale={soundIsOn}
        toggleSound={() => handleToggleSound()}
    />
}