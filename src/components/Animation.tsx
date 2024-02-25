import { useRef, useEffect, useState } from "react";
import p5 from 'p5';
import { initSketch as starFieldSketch } from "./animations/starField";

export default function Animation() {
  const [p5Canvas, setP5Canvas] = useState<p5 | null>(null);
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect( () => {
    const canvas = new p5(starFieldSketch, sketchRef.current as HTMLElement);
    setP5Canvas(canvas);
    return () => { canvas?.remove(); }
  }, []);

  if (!p5Canvas) {
    return null;
  }

  return <div className="mySketch" ref={sketchRef} />;
}
