export enum ModuleNames {
  WHITE_NOISE = 'white-noise-processor',
  BROWN_NOISE = 'brown-noise-processor',
  PINK_NOISE = 'pink-noise-processor'
}

export enum AnimationNames {
  STAR_FIELD
}

export interface ModuleToLoad {
  audioContext: AudioContext;
  moduleName: ModuleNames;
}

export const VOLUME_LEVEL = 0.6;