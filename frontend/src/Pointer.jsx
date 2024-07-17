import { forwardRef, useEffect, useRef, useImperativeHandle } from "react";

const Pointer = forwardRef(({ background }, ref) => {
  const pointerToolRef = useRef(null);

  useImperativeHandle(ref, () => ({
    hide: () => {
      pointerToolRef.current.style.display = "none";
    },
    show: () => {
      pointerToolRef.current.style.display = "block";
    },
    reposition: (posX, posY) => {
      const x = posX - Math.floor(background.sizeX() / 2);
      const y  = posY - Math.floor(background.sizeY() / 2);
      pointerToolRef.current.style.transform = `translate(${x}px, ${y}px)`;
    },
  }));

  useEffect(() => {
    const canvas = pointerToolRef.current;
    const ctx = canvas.getContext("2d");

    const width = background.sizeX();
    const height = background.sizeY();

    canvas.width = width;
    canvas.height = height;

    const imageData = ctx.createImageData(width, height);
    for (let y = 0; y < width; y++) {
      for (let x = 0; x < height; x++) {
        const [r, g, b, a] = background.idx(y, x);
        const index = (y * width + x) * 4;
        imageData.data[index] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = Math.floor(a * 0.8);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }, [background]);

  return <canvas ref={pointerToolRef} id="pointer-tool" />;
});

export default Pointer;
