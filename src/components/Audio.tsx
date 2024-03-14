import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import AudioControls from "./AudioControls";

export default function Audio({selectedNoise}: {selectedNoise: string}) {
    let [isMuted, setIsMuted] = useState(true);
    const audioRef = useRef<AudioControls>(new AudioControls(selectedNoise));

    useEffect(() => {
        if (audioRef.current?.isLoaded) {
            audioRef.current.selectNoise(selectedNoise);
        }
    }, [selectedNoise]);

    useEffect(() => {
        if (audioRef.current?.isLoaded) {
            audioRef.current.mute(isMuted);
        }
    }, [isMuted]);

    return <Logo active={!isMuted} onClick={() => setIsMuted(!isMuted)} />;
}
