export enum AudioModules {
  WHITE_NOISE = 'white-noise-processor'
}
  
export interface AudioModule {
  soundIsOn: boolean;
  moduleName: AudioModules;
} 

export interface AudioModuleWithContext extends AudioModule {
  audioContext: AudioContext;
}
