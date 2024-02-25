import "./Logo.css";
import Logo from "./Logo";
import { VOLUME_LEVEL } from "../constants";

interface GainControlArgs {
  node: GainNode;
  mute: boolean;
  setMute: (newVal: boolean) => void;
}

export default function GainControl({node, mute, setMute}: GainControlArgs) {
  const handleClick = () => {
    const newVolume = mute ? VOLUME_LEVEL : 0;
    node.gain.setValueAtTime(newVolume, 0);
    setMute(!mute);
  }    

  return <Logo className="gain-controls" inGreyScale={!mute} onClick={handleClick} />
}