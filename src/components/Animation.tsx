import { useRef, useEffect } from "react";
import useWindowSize from "./UseWindowSize";

class CanvasState {
  width = 0;
  height = 0;
  get halfWidth() {
    return this.width / 2;
  }
  get halfHeight() {
    return this.height / 2;
  }
}

export default function Animation() {
  // window size ( width, height ) pass into animation for canvas resizing
  const windowSize = useWindowSize();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = canvasRef.current?.getContext("2d");
  const previousTimeRef = useRef(0);
  const requestRef = useRef(0);
  let size = 450;
  let size2 = 440;
  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined && ctx) {
      // https://stackoverflow.com/questions/53310138/creating-a-draggable-and-scaleable-grid-in-html5

      //partial erase
      var oldArray = ctx.getImageData(
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
      );
      for (var d = 3; d < oldArray.data.length; d += 4) {
        //count through only the alpha pixels
        //dim it with some feedback, I'm using .9
        oldArray.data[d] = Math.floor(oldArray.data[d] * 0.93);
      }
      ctx.putImageData(oldArray, 0, 0);

      // render animation
      ctx.beginPath();
      ctx.arc(0, 0, size2, 0, 2 * Math.PI);
      ctx.strokeStyle = "#FFBBBB";
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(0, 0, size, 0, 2 * Math.PI);
      ctx.strokeStyle = "#FFFFFF";
      ctx.stroke();
      ctx.closePath();

      size = --size;
      size2 = --size2;
      if (size <= 250) {
        size = 450;
      }
      if (size2 <= 250) {
        size2 = 440;
      }
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.translate(windowSize.width / 2, windowSize.height / 2);
      ctx.globalCompositeOperation = "hue";
    }
  }, [windowSize]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  });

  return (
    <canvas
      ref={canvasRef}
      width={windowSize.width + "px"}
      height={windowSize.height + "px"}
    ></canvas>
  );
}
