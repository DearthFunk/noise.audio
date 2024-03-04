export default {}
// import { useState } from "react";
// import Logo from "./Logo";
// import { MenuItem, VOLUME_LEVEL } from "../constants";

// const _getModuleName = (name: string) => {
//     return `modules/audio/${name}.js`;
// }
// /**
//  * TODO: look at https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode for idea on controlly params externally 
//  */

// export default function Audio({modules, selectedNoise}:{modules: MenuItem[], selectedNoise: MenuItem}) {
//     let [modulesLoaded, setModulesLoaded] = useState(false);
//     let [isMuted, setIsMuted] = useState(true);
//     let gainNode: GainNode | undefined;

    
//     const connectNoise = (name: string) => {

//     }
//     const setupModules = async() => {
//         // setup module on audioWorklet
//         let promises = modules.map(({name}) => {
//             audioContext.audioWorklet.addModule(_getModuleName(name))
//             let audioWorkletNode = new AudioWorkletNode(audioContext, name);
            
//         });
//         await Promise.all(promises);
//         console.log('noise modules add to audio context worklet');

//         // setup
//         let gainNode = audioContext.createGain();
//         }


//     audioWorkletNode.connect(gainNode);
//     gainNode.gain.setValueAtTime(0, 0);
//     setModulesLoaded(true);
//     return gainNode;
// }
//     const handleLogoClick = () => { 
//         const newIsMuted = !isMuted;

//         // bypass if not ready
//         if (!modulesLoaded || !gainNode) { return; }

//         // set value at time 0 which is now
//         const newVolume = newIsMuted ? VOLUME_LEVEL : 0;
//         gainNode.gain.setValueAtTime(newVolume, 0);
//         setIsMuted(newIsMuted);
//     }

//     if (!modulesLoaded) {
//         setupModules(modules);
//         return null;
//     }
//     return <Logo active={!isMuted} onClick={handleLogoClick}/>
// }