import React from 'react';
import { ModuleNames } from '../constants';
import ModuleNode from './ModuleNode';


export default function Audio({ moduleName}: {moduleName: ModuleNames}) {
  let audioContext = new AudioContext();
  console.log(' - - Audio');
  return <ModuleNode
    moduleName={moduleName}
    audioContext={audioContext}
  />
}
