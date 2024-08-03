import { useEffect, useRef } from "react";
import './Pointer.css';

const Pointer = ({ colorIdx, designIdx, activeTool, withinDrawingZone }) => {
  const pointerToolRef = useRef(null);

  const hide = () => {
    pointerToolRef.current.style.display = "none";
  };

  const show = () => {
    pointerToolRef.current.style.display = "block";
  };

  const reposition = (posX, posY) => {
    const x = posX - Math.floor(activeTool.sizeX() / 2);
    const y = posY - Math.floor(activeTool.sizeY() / 2);
    console.log(activeTool.sizeX(), activeTool.sizeY());
    pointerToolRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseMove = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    if (withinDrawingZone(x, y)) {
      show();
      reposition(x, y);
    } else {
      hide();
    }
  };

  useEffect(() => {
    const canvas = pointerToolRef.current;
    const ctx = canvas.getContext("2d");

    const width = activeTool.sizeY();
    const height = activeTool.sizeX();

    canvas.width = height;
    canvas.height = width;

    const imageData = ctx.createImageData(height, width);
    const data = imageData.data;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const [r, g, b, a] = activeTool.idx_ptr(x, y);
        const index = (x * height + y) * 4;
        data[index] = r;
        data[index + 1] = g;
        data[index + 2] = b;
        data[index + 3] = a;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [colorIdx, designIdx, activeTool]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseMove);
    };
  }, []);

  return <canvas ref={pointerToolRef} id="pointer-tool"/>;
};

export default Pointer;
