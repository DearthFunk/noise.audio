import { useRef, useEffect, useState } from "react";
import p5 from 'p5';

export default function Visualizer({sketch}: {sketch: (p:any) => void}) {
  const [p5Canvas, setP5Canvas] = useState<p5 | null>(null);
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new p5(sketch, sketchRef.current as HTMLElement);
    setP5Canvas(canvas);

    return () => {
      canvas?.remove();
    }
  }, [sketch]);

  if (!p5Canvas) {
    return null;
  }

  return <div className="visualizer-sketch" ref={sketchRef} />
}
