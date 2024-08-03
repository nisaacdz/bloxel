import { forwardRef, useEffect, useRef, useImperativeHandle } from "react";

const Pointer = forwardRef(({ colorIdx, designIdx, activeTool }, ref) => {
  const pointerToolRef = useRef(null);

  useImperativeHandle(ref, () => ({
    hide: () => {
      pointerToolRef.current.style.display = "none";
    },
    show: () => {
      pointerToolRef.current.style.display = "block";
    },
    reposition: (posX, posY) => {
      const x = posX - Math.floor(activeTool.sizeX() / 2);
      const y = posY - Math.floor(activeTool.sizeY() / 2);
      pointerToolRef.current.style.transform = `translate(${x}px, ${y}px)`;
    },
  }));

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

  return <canvas ref={pointerToolRef} id="pointer-tool" />;
});

export default Pointer;
