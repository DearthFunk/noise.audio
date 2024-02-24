import { useState } from "react";
import Logo from "./Logo";

interface GainControlArgs {
    node: GainNode;
    setSoundIsOn: (newVal: boolean) => void;
    soundIsOn: boolean;
}
export default function GainControl({node, setSoundIsOn, soundIsOn}: GainControlArgs) {
    console.log((' - - gain control'));

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