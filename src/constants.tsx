export enum ModuleNames {
  WHITE_NOISE = 'white-noise-processor',
  BROWN_NOISE = 'brown-noise-processor',
  PINK_NOISE = 'pink-noise-processor'
}
  
export interface ModuleToLoad {
  audioContext: AudioContext;
  moduleName: ModuleNames;
}
