// DearthFunk copied from https://editor.p5js.org/codingtrain/sketches/sy1p1vnQn
// props to:
//
// Polar Perlin Noise Loop
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/136-polar-perlin-noise-loops.html
// https://youtu.be/ZI1dmHv3MeM
// https://editor.p5js.org/codingtrain/sketches/sy1p1vnQn

let phase = 0;
let zoff = 0;
let pg; // Graphics buffer for trailing effect

export const initSketch = (p) => {
    p.preload = () => {
        //load images and shaders here
    }
    p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        pg = p.createGraphics(window.innerWidth, window.innerHeight);
    }
    p.setup = () => {
        //setup canvas and init values here
        p.createCanvas(window.innerWidth, window.innerHeight);
        pg = p.createGraphics(window.innerWidth, window.innerHeight);
    }

    p.draw = () => {
        // Apply fading effect to the graphics buffer first
        pg.fill(0, 0, 0, 255 * 0.02); // Black with 7% opacity for fading
        pg.noStroke();
        pg.rect(0, 0, window.innerWidth, window.innerHeight);
        
        // Draw new frame to the graphics buffer
        pg.push();
        pg.translate(window.innerWidth / 2, window.innerHeight / 2);
        pg.stroke(255);
        pg.strokeWeight(5);
        pg.noFill();
        pg.beginShape();
        let distanceFromCenter = Math.floor(Math.sqrt(
            Math.pow(p.mouseX - (window.innerWidth/2), 2) + 
            Math.pow(p.mouseY - (window.innerHeight/2), 2)
        ));
        // createSlider(0, 10, 3, 0.1);
        let noiseMax = p.map(distanceFromCenter, 0, window.innerHeight/2, 0, 2);
        for (let a = 0; a < p.TWO_PI; a += p.radians(15)) {
            let xoff = p.map(p.cos(a + phase), -1, 1, 0, noiseMax);
            let yoff = p.map(p.sin(a + phase), -1, 1, 0, noiseMax);
            let r = p.map(p.noise(xoff, yoff, zoff), 0, 1, 100, window.innerHeight * 0.8);
            let x = r * p.cos(a);
            let y = r * p.sin(a);
            pg.vertex(x, y);
        }
        pg.endShape(p.CLOSE);
        pg.pop();
        
        phase += 0.003;
        zoff += 0.01;
        
        // Clear main canvas and draw the graphics buffer
        p.background(0);
        p.image(pg, 0, 0);
    }
}
