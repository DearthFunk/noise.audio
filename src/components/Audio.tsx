import { AudioModule, AudioModules } from '../constants';
import ModuleNode from './ModuleNode';


export default function Audio({soundIsOn, moduleName}: AudioModule) {
  let audioContext = new AudioContext();

  return <ModuleNode
    soundIsOn={soundIsOn}
    moduleName={moduleName}
    audioContext={audioContext}
  />
}
