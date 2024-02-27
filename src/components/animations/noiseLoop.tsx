import p5 from "p5";

// DearthFunk copied from https://editor.p5js.org/codingtrain/sketches/MPqnctIGg
// props to:
//
// 4D Open Simplex Noise Loop
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/137-4d-opensimplex-noise-loop
// https://youtu.be/3_0Ax95jIrk

export const initSketch = (p: p5) => {
    p.preload = () => {
        //load images and shaders here
    }
    p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
    }
    p.setup = () => {
        //setup canvas and init values here
        p.createCanvas(window.innerWidth, window.innerHeight);
    }

    p.draw = () => {
        p.background(50);
    }
  };
