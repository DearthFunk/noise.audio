// DearthFunk Copied From https://editor.p5js.org/codingtrain/sketches/1wLHIck3T
// props to: 
//
// StarField
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/17WoOqgXsRM

export const initSketch = (p) => {
    let stars = [];
    p.preload = () => {
        //load images and shaders here
    }
    p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
    }
    p.setup = () => {
      for (var i = 0; i < 1000; i++) {
        stars.push(new Star(p, i));
      }
      //setup canvas and init values here
        p.createCanvas(window.innerWidth, window.innerHeight);
    }

    p.draw = () => {
      const newXPos = p.mouseX ? p.mouseX : p.width / 2;
      // newXPos exists to handle transitions in view prior to a mousemove, cause mouseX to be set
      let speed = p.map(newXPos, 0, p.width, 0, 50);
      p.background(0);
      p.translate(p.width / 2, p.height / 2);
      for (var i = 0; i < stars.length; i++) {
        stars[i].update(speed);
        stars[i].show();
      }
    }
  };

  
class Star {
  
    p;
    x;
    y;
    z;
    pz;
  
    constructor(p, id) {
        this.p = p;

        this.x = this.p.random(-this.p.width, this.p.width);
        this.y = this.p.random(-this.p.height, this.p.height);
        this.z = this.p.random(this.p.width);
        this.pz = this.z;
    }
  
    update(speed) {
        this.z = this.z - speed;
        if (this.z < 1) {
            this.x = this.p.random(-this.p.width, this.p.width);
            this.y = this.p.random(-this.p.height, this.p.height);
            this.z = this.p.random(this.p.width);
            this.pz = this.z;
        }
    }
  
    show() {
        this.p.fill(255);
        this.p.noStroke();
        
        var sx = this.p.map(this.x / this.z, 0, 1, 0, this.p.width);
        var sy = this.p.map(this.y / this.z, 0, 1, 0, this.p.height);
        
        var r = this.p.map(this.z, 0, this.p.width, 4, 0);
        this.p.ellipse(sx, sy, r, r);
        
        var px = this.p.map(this.x / this.pz, 0, 1, 0, this.p.width);
        var py = this.p.map(this.y / this.pz, 0, 1, 0, this.p.height);
        
        this.pz = this.z;
        
        this.p.stroke(255);
        this.p.line(px, py, sx, sy);
    }
}
  