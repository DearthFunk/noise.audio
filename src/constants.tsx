import { initSketch, initSketch as starFieldSketch } from "./modules/visual/star-field";
import { initSketch as noiseLoopSketch } from "./modules/visual/noise-loop";

export const VOLUME_LEVEL = 0.6;

export type MenuItem = {
  name: string,
  sketch?: typeof initSketch
};

// noises work kinda diff as they load from public
export const noises: MenuItem[] = [
  { name: 'pink'},
  { name: 'brown'},
  { name: 'white'}
];

// where as these are imported. can import noises? todo?
export const visuals: MenuItem[] = [
  {name: 'star-field', sketch: starFieldSketch },
  {name: 'nosie-loop', sketch: noiseLoopSketch }
];
