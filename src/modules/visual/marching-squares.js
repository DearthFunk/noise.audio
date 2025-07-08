// DearthFunk copied from https://editor.p5js.org/codingtrain/sketches/18cjVoAX1
// props to:
//
// Marching Squares
// Coding in the Cabana
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/coding-in-the-cabana/005-marching-squares.html
// https://youtu.be/0ZONMNUKTfU
// p5 port: https://editor.p5js.org/codingtrain/sketches/18cjVoAX1

import OpenSimplexNoise from './OpenSimplexNoise.js';

export const initSketch = (p) => {
    let field = [];
    let rez = 10;
    let cols, rows;
    let increment = 0.2;
    let zoff = 0;
    let noise;
    let pg; // Graphics buffer for trailing effect

    function drawLine(v1, v2) {
        pg.line(v1.x, v1.y, v2.x, v2.y);
    }
    function getState(a, b, c, d) {
        return a * 8 + b * 4 + c * 2 + d * 1;
    }
  
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
        noise = new OpenSimplexNoise(Date.now());
        cols = 1 + window.innerWidth / rez;
        rows = 1 + window.innerHeight / rez;
        for (let i = 0; i < cols; i++) {
            let k = [];
            for (let j = 0; j < rows; j++) {
                k.push(0);
            }
            field.push(k);
        }
    }

    p.draw = () => {
        // Apply fading effect to the graphics buffer first
        pg.fill(0, 0, 0, 255 * 0.02); // Black with 2% opacity for fading
        pg.noStroke();
        pg.rect(0, 0, window.innerWidth, window.innerHeight);
        
        let xoff = 0;
        for (let i = 0; i < cols; i++) {
            xoff += increment;
            let yoff = 0;
            for (let j = 0; j < rows; j++) {
                // Calculate distance from current grid point to mouse
                let gridX = i * rez;
                let gridY = j * rez;
                let distToMouse = p.dist(gridX, gridY, p.mouseX, p.mouseY);
                
                // Create radial magnifying glass effect with smooth falloff
                let localZoff = zoff;
                let radius = 300; // Effect radius in pixels
                
                if (distToMouse <= radius) {
                    // Normalize distance (0 at center, 1 at edge)
                    let normalizedDist = distToMouse / radius;
                    
                    // Create smooth falloff using cosine curve for natural feel
                    let falloff = Math.cos(normalizedDist * Math.PI * 0.5);
                    
                    // Speed multiplier: 1 (normal) at edge, down to 0.1 (very slow) at center
                    let minSpeed = 0.1;
                    let speedMultiplier = 1 - (falloff * (1 - minSpeed));
                    
                    localZoff *= speedMultiplier;
                }
                
                field[i][j] = p.float(noise.noise3D(xoff, yoff, localZoff));
                yoff += increment;
            }
        }
        zoff += 0.02;

        for (let i = 0; i < cols - 1; i++) {
            for (let j = 0; j < rows - 1; j++) {
                let x = i * rez;
                let y = j * rez;

                let state = getState(
                    p.ceil(field[i][j]),
                    p.ceil(field[i + 1][j]),
                    p.ceil(field[i + 1][j + 1]),
                    p.ceil(field[i][j + 1])
                );

                let a_val = field[i][j] + 1;
                let b_val = field[i + 1][j] + 1;
                let c_val = field[i + 1][j + 1] + 1;
                let d_val = field[i][j + 1] + 1;

                let a = p.createVector();
                let amt = (1 - a_val) / (b_val - a_val);
                a.x = p.lerp(x, x + rez, amt);
                a.y = y;

                let b = p.createVector();
                amt = (1 - b_val) / (c_val - b_val);
                b.x = x + rez;
                b.y = p.lerp(y, y + rez, amt);

                let c = p.createVector();
                amt = (1 - d_val) / (c_val - d_val);
                c.x = p.lerp(x, x + rez, amt);
                c.y = y + rez;

                let d = p.createVector();
                amt = (1 - a_val) / (d_val - a_val);
                d.x = x;
                d.y = p.lerp(y, y + rez, amt);

                pg.stroke(255);
                pg.strokeWeight(2);
                switch (state) {
                    case 1:
                    drawLine(c, d);
                    break;
                    case 2:
                    drawLine(b, c);
                    break;
                    case 3:
                    drawLine(b, d);
                    break;
                    case 4:
                    drawLine(a, b);
                    break;
                    case 5:
                    drawLine(a, d);
                    drawLine(b, c);
                    break;
                    case 6:
                    drawLine(a, c);
                    break;
                    case 7:
                    drawLine(a, d);
                    break;
                    case 8:
                    drawLine(a, d);
                    break;
                    case 9:
                    drawLine(a, c);
                    break;
                    case 10:
                    drawLine(a, b);
                    drawLine(c, d);
                    break;
                    case 11:
                    drawLine(a, b);
                    break;
                    case 12:
                    drawLine(b, d);
                    break;
                    case 13:
                    drawLine(b, c);
                    break;
                    case 14:
                    drawLine(c, d);
                    break;
                    default:
                    break;
                }
            }
        }
        
        // Clear main canvas and draw the graphics buffer
        p.background(0);
        p.image(pg, 0, 0);
    }
};
