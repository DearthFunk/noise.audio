import { initSketch, initSketch as starFieldSketch } from "./modules/visual/star-field.js";
import { initSketch as marchingSquaresSketch } from "./modules/visual/marching-squares.js";
import { initSketch as perlinNoiseSketch } from "./modules/visual/perlin-noise.js";

export const VOLUME_LEVEL = 0.6;

export type NoiseMenuItem = {
  name: string,
  tooltip: string
};

export type VisualMenuItem = {
  name: string,
  sketch: typeof initSketch
};

// noises work kinda diff as they load from public
export const noises: NoiseMenuItem[] = [
  { name: 'pink', tooltip: 'Has a balance of frequencies with more energy in the lower frequencies than white noise, decreasing by 3dB per octave. It is often described as a smooth, calming sound and is frequently used in audio testing and sound masking.' },
  { name: 'brown', tooltip: 'Also known as Red Noise. Features even more energy concentrated in the lower frequencies than pink noise, producing a deep, rumbling sound like thunder. It is often used for relaxation, sleep, and reducing anxiety.' },
  { name: 'white', tooltip: 'Characterized by an equal distribution of frequencies across the audible spectrum (20Hz-20kHz), often described as a static or hissing sound. It can be effective at masking other sounds.' },
  { name: 'blue', tooltip: 'Characterized by an emphasis on higher frequencies, with power density increasing by 3dB per octave. Blue noise can sound shrill and is sometimes described as a hissing sound.' },
  { name: 'gray', tooltip: 'Similar to pink noise, with equal power across all frequencies but adjusted to mimic human hearing perception. Gray noise accounts for the human ear\'s sensitivity curve to create psychoacoustically balanced noise.' },
  { name: 'violet', tooltip: 'An even more extreme version of blue noise, Violet noise emphasizes high frequencies even more. With even steeper frequency emphasis than blue noise.' },
  { name: 'buzz', tooltip: 'A higher-pitched, often mechanical, continuous sound. Buzz noise is characterized by a consistent, high-pitched sound often associated with small motors or machinery.' },
  { name: 'click', tooltip: 'A short, sharp sound, often caused by electrical or mechanical events. Click noise produces brief, sharp impulses that occur at random intervals.' },
  { name: 'crackling', tooltip: 'An intermittent, often high-frequency, sound. Crackling noise produces sporadic bursts of high-frequency content, like fire crackling or electrical sparks.' },
  { name: 'green', tooltip: 'Concentrates energy around a center frequency of 500 Hz, often associated with natural ambiences. Green noise has most of its energy focused in the mid-frequency range.' },
  { name: 'hiss', tooltip: 'A high-frequency, often static-like sound, similar to white noise but potentially less evenly distributed. Hiss noise emphasizes higher frequencies and is commonly heard in audio equipment or tape recordings.' },
  { name: 'hum', tooltip: 'A low-frequency, continuous sound, often caused by electrical currents. Hum noise typically occurs at 50Hz or 60Hz (power line frequencies) and their harmonics.' },
  { name: 'pop', tooltip: 'Similar to click noise but often with a more pronounced "popping" sound. Pop noise creates sudden bursts with a characteristic low-frequency thump followed by a quick decay.' },
  { name: 'rumble', tooltip: 'A low-frequency, continuous sound, often associated with mechanical sources. Rumble noise produces deep, low-frequency content similar to distant thunder or large machinery.' }
];

// where as these are imported. can import noises? todo?
export const visuals: VisualMenuItem[] = [
  {name: 'star-field', sketch: starFieldSketch },
  {name: 'marching-squares', sketch: marchingSquaresSketch },
  {name: 'perlin-noise', sketch: perlinNoiseSketch }
];
