// DearthFunk copied from https://editor.p5js.org/codingtrain/sketches/18cjVoAX1
// props to:
//
// Polar Perlin Noise Loop
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/136-polar-perlin-noise-loops.html
// https://youtu.be/ZI1dmHv3MeM
// https://editor.p5js.org/codingtrain/sketches/sy1p1vnQn

let phase = 0;
let zoff = 0;

export const initSketch = (p) => {
    let stars = [];
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
        p.background(0);
        p.translate(window.innerWidth / 2, window.innerHeight / 2);
        p.stroke(255);
        p.strokeWeight(15);
        p.noFill();
        p.beginShape();
        let distanceFromCenter = Math.floor(Math.sqrt(
            Math.pow(p.mouseX - (window.innerWidth/2), 2) + 
            Math.pow(p.mouseY - (window.innerHeight/2), 2)
        ));
        // createSlider(0, 10, 3, 0.1);
        let noiseMax = p.map(distanceFromCenter, 0, window.innerHeight/2, 0, 5);
        for (let a = 0; a < p.TWO_PI; a += p.radians(15)) {
            let xoff = p.map(p.cos(a + phase), -1, 1, 0, noiseMax);
            let yoff = p.map(p.sin(a + phase), -1, 1, 0, noiseMax);
            let r = p.map(p.noise(xoff, yoff, zoff), 0, 1, 100, window.innerHeight * 0.8);
            let x = r * p.cos(a);
            let y = r * p.sin(a);
            p.vertex(x, y);
        }
        p.endShape(p.CLOSE);
        phase += 0.003;
        zoff += 0.01;
    }
};
