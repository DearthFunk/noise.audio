import Audio from "./Audio";
import Visualizer from "./Visualizer";
import { useState } from "react";
import { visuals, noises } from "../constants";
import { _generateMenuOptions } from "./MenuItem";

export default function NoiseAudio() {
    let [selectedVisual, setSelectedVisual] = useState(visuals[0]);
    let [selectedNoise, setSelectedNoise] = useState(noises[2]);

    const noiseOptions = _generateMenuOptions(noises, setSelectedNoise, selectedNoise);
    const visualOptions = _generateMenuOptions(visuals, setSelectedVisual, selectedVisual);

    return <>
        <div className="menu">
            <ul className="noise">{noiseOptions}</ul>
            <ul className="visual">{visualOptions}</ul>
        </div>
        {!!selectedNoise.name && <><Audio selectedNoise={selectedNoise.name} /></>}
        {!!selectedVisual.sketch && <Visualizer sketch={selectedVisual.sketch} />}        
    </>
}
