import { useRef, useEffect, useState } from "react";
import p5 from 'p5';

export default function Animation() {
  const [p5Canvas, setP5Canvas] = useState<p5 | null>(null);
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect( () => {
    const initSketch = (p: any) => {
      p.preload = () => {
          //load images and shaders here
      }
      p.windowResized = (a: any, b: any, c: any) => {
          p.resizeCanvas(window.innerWidth, window.innerHeight);
      }
      p.setup = () => {
          //setup canvas and init values here
          p.createCanvas(window.innerWidth, window.innerWidth);
      }
  
      p.draw = () => {
          //update canvas here
          p.background(p.frameCount % 255)
      }
    };
    const canvas = new p5(initSketch, sketchRef.current as HTMLElement);
    setP5Canvas(canvas);
    return () => { canvas?.remove(); }
  }, []);

  if (!p5Canvas) {
    return null;
  }

  return <div className="mySketch" ref={sketchRef} />;
}
