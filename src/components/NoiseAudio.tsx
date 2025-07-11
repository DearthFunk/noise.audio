import Audio from "./Audio";
import Visualizer from "./Visualizer";
import { useState } from "react";
import { visuals, noises } from "../constants";
import { _generateNoiseMenuOptions, _generateVisualMenuOptions } from "./MenuItem";

export default function NoiseAudio() {
    let [selectedVisual, setSelectedVisual] = useState(visuals[0]);
    let [selectedNoise, setSelectedNoise] = useState(noises[2]);

    const noiseOptions = _generateNoiseMenuOptions(noises, setSelectedNoise, selectedNoise);
    const visualOptions = _generateVisualMenuOptions(visuals, setSelectedVisual, selectedVisual);

    return <>
        <div className="menu">
            <ul className="noise">{noiseOptions}</ul>
            <ul className="visual">{visualOptions}</ul>
        </div>
        <Audio selectedNoise={selectedNoise.name} />
        {!!selectedVisual.sketch && <Visualizer sketch={selectedVisual.sketch} />}        
    </>
}
