export enum ModuleNames {
  WHITE_NOISE = 'white-noise-processor'
}
  
export interface ModuleToLoad {
  audioContext: AudioContext;
  moduleName: ModuleNames;
}
