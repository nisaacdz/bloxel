import { useEffect, useRef } from "react";
import "./Pointer.css";
import { DefaultChalk, DefaultDuster } from "./utils";

const Pointer = ({
  colorIdx,
  designIdx,
  toolIdx,
  backgroundIdx,
  withinDrawingZone,
}) => {
  const pointerToolRef = useRef(null);
  useEffect(() => {
    const canvas = pointerToolRef.current;
    const ctx = canvas.getContext("2d");

    let tool = null;
    if (toolIdx == 0) {
      tool = DefaultChalk;
    } else {
      tool = DefaultDuster;
    }

    const width = tool.sizeY();
    const height = tool.sizeX();

    canvas.width = height;
    canvas.height = width;

    const imageData = ctx.createImageData(height, width);
    const data = imageData.data;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const [r, g, b, a] = tool.idx_ptr(x, y);
        const index = (x * height + y) * 4;
        data[index] = r;
        data[index + 1] = g;
        data[index + 2] = b;
        data[index + 3] = a;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [colorIdx, designIdx, toolIdx, backgroundIdx]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseMove);
    };
  }, [toolIdx]);

  const hide = () => {
    pointerToolRef.current.style.display = "none";
  };

  const show = () => {
    pointerToolRef.current.style.display = "block";
  };

  const reposition = (posX, posY) => {
    let tool = null;
    if (toolIdx == 0) {
      tool = DefaultChalk;
    } else {
      tool = DefaultDuster;
    }
    const x = posX - Math.floor(tool.sizeX() / 2);
    const y = posY - Math.floor(tool.sizeY() / 2);
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

  return <canvas ref={pointerToolRef} id="pointer-tool" />;
};

export default Pointer;
