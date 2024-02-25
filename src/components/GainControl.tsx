import "./Logo.css";
import Logo from "./Logo";
import { VolumeLevel } from "../constants";

interface GainControlArgs {
  node: GainNode;
  setSoundIsOn: (newVal: boolean) => void;
  soundIsOn: boolean;
}

export default function GainControl({node, setSoundIsOn, soundIsOn}: GainControlArgs) {
  const handleToggleSound = () => {
    const newVolume = soundIsOn ? VolumeLevel.low : VolumeLevel.high;
    node.gain.setValueAtTime(newVolume, 0);
    setSoundIsOn(!soundIsOn);
  }    

  return <Logo inGreyScale={soundIsOn} onClick={handleToggleSound} />
}