import { useRef, useEffect, useState } from "react";
import p5 from 'p5';
import { initSketch as starFieldSketch } from "./animations/starField";
import { initSketch as noiseLoopSketch } from "./animations/noiseLoop";
import { AnimationNames, ModuleNames } from "../constants";

export default function Animation({animationName}: {animationName: AnimationNames}) {
  const [p5Canvas, setP5Canvas] = useState<p5 | null>(null);
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = animationName === AnimationNames.NOISE_LOOP ? noiseLoopSketch : starFieldSketch;
    const canvas = new p5(sketch, sketchRef.current as HTMLElement);
    setP5Canvas(canvas);
    return () => {
      canvas?.remove();
    }
  }, [animationName]);

  if (!p5Canvas) {
    return null;
  }

  return <div className="mySketch" ref={sketchRef} />;
}
