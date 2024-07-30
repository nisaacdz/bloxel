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
      const x = posX - Math.floor(activeTool.sizeY() / 2);
      const y = posY - Math.floor(activeTool.sizeX() / 2);
      pointerToolRef.current.style.transform = `translate(${x}px, ${y}px)`;
    },
  }));

  useEffect(() => {
    const canvas = pointerToolRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const ptrWidth = activeTool.sizeX();
    const ptrHeight = activeTool.sizeY();

    canvas.width = ptrHeight;
    canvas.height = ptrWidth;

    for (let x = 0; x < ptrWidth; x++) {
      for (let y = 0; y < ptrHeight; y++) {
        const [r, g, b, a] = activeTool.idx_ptr(x, y);
        const imageData = ctx.getImageData(y, x, 1, 1);
        imageData.data[0] = r;
        imageData.data[1] = g;
        imageData.data[2] = b;
        imageData.data[3] = a;
        ctx.putImageData(imageData, y, x);
      }
    }
  }, [colorIdx, designIdx, activeTool]);

  return <canvas ref={pointerToolRef} id="pointer-tool" />;
});

export default Pointer;
