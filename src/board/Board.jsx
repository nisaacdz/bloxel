import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import "./Board.css";
import { BACKGROUNDS, complement, DefaultChalk, DefaultDuster } from "../utils";
import { CurveInterpolator } from "curve-interpolator";
import { invoke, path } from "@tauri-apps/api";
import { writeBinaryFile, BaseDirectory } from "@tauri-apps/api/fs";

const SCREENS = [null];

function escribe(mouseX, mouseY, contextRef) {
  const tool = DefaultChalk;
  const n = tool.sizeX();
  const m = tool.sizeY();
  const x = mouseX - Math.floor(n / 2);
  const y = mouseY - Math.floor(m / 2);

  const imageData = contextRef.current.getImageData(x, y, m, n);
  const data = imageData.data;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const idx = (i * m + j) * 4;
      const [r1, g1, b1, a1] = tool.idx(i, j);
      const r2 = data[idx],
        g2 = data[idx + 1],
        b2 = data[idx + 2],
        a2 = data[idx + 3];

      const f1 = a1 / 255;
      const f2 = (1 - f1) * (a2 / 255);
      const sumF = f1 + f2;

      const a = 255 - ((255 - a1) * (255 - a2)) / 255;
      const r = (r1 * f1 + r2 * f2) / sumF;
      const g = (g1 * f1 + g2 * f2) / sumF;
      const b = (b1 * f1 + b2 * f2) / sumF;

      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = a;
    }
  }

  contextRef.current.putImageData(imageData, x, y);
}

function erase(mouseX, mouseY, contextRef) {
  const x = mouseX - Math.floor(DefaultDuster.sizeX() / 2);
  const y = mouseY - Math.floor(DefaultDuster.sizeY() / 2);
  contextRef.current.clearRect(
    x,
    y,
    DefaultDuster.sizeX(),
    DefaultDuster.sizeY()
  );
}

class PointQueue {
  constructor() {
    this.queue = [];
    this.maxSize = 5;
  }

  enqueue(point) {
    while (this.queue.length >= this.maxSize) {
      this.queue.shift();
    }
    this.queue.push(point);
  }

  getQueue() {
    return this.queue;
  }
}

function interpolate(activeMouseRef, mouseX, mouseY, contextRef, toolIdx) {
  if (!activeMouseRef.current) {
    activeMouseRef.current = new PointQueue();
  }

  const pointQueue = activeMouseRef.current;
  const points = pointQueue.getQueue();

  if (points.length == 0) {
    if (toolIdx === 0) {
      escribe(mouseX, mouseY, contextRef);
    } else {
      erase(mouseX, mouseY, contextRef);
    }
    pointQueue.enqueue([mouseX, mouseY]);
    return;
  }

  const lastPoint = points[points.length - 1];

  const diffX = mouseX - lastPoint[0];
  const diffY = mouseY - lastPoint[1];

  const totalSteps = Math.max(Math.abs(diffX), Math.abs(diffY));

  if (totalSteps === 0) {
    return;
  }

  pointQueue.enqueue([mouseX, mouseY]);

  const stepX = diffX / totalSteps;
  const stepY = diffY / totalSteps;

  const interp = new CurveInterpolator(pointQueue.getQueue(), {
    tension: 0.2,
    alpha: 0.5,
  });

  for (let s = 1; s <= totalSteps; s += 1) {
    const pX = lastPoint[0] + s * stepX;
    const pY = lastPoint[1] + s * stepY;
    const point = interp.getNearestPosition([pX, pY]).point;
    if (toolIdx === 0) {
      escribe(Math.round(point[0]), Math.round(point[1]), contextRef);
    } else {
      erase(Math.round(point[0]), Math.round(point[1]), contextRef);
    }
  }
}

async function savePDF(backgroundColor) {
  const cacheDir = await invoke("reset_cache");
  const tasks = SCREENS.map(async (screen, idx) => {
    await writeBinaryFile(`${cacheDir}\\screen${idx + 1}`, screen.data.buffer, {
      dir: BaseDirectory.AppCache,
    });
  });
  await Promise.all(tasks);
  await invoke("save_pdf", { background: backgroundColor });
}

const Board = forwardRef(({ toolIdx, backgroundIdx }, ref) => {
  const activeMouseRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const screenIdx = useRef(0);

  useEffect(() => {
    window.addEventListener("resize", onresize);
    return () => {
      window.removeEventListener("resize", onresize);
    };
  }, []);

  useEffect(() => {
    resetBackground();
  }, [backgroundIdx]);

  useEffect(() => {
    onstart();
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      clearBoard: () => {
        clearCanvas();
      },
      delPage: () => {
        SCREENS.splice(screenIdx.current, 1);
        if (SCREENS.length == 0) SCREENS.push(null);
        const newIdx = Math.max(0, screenIdx.current - 1);
        loadScreenAt(newIdx);
        return { idx: newIdx, size: SCREENS.length };
      },
      addPage: () => {
        SCREENS.splice(screenIdx.current + 1, 0, null);
        slidePage(screenIdx.current + 1);
        return { idx: screenIdx.current, size: SCREENS.length };
      },
      prevPage: () => {
        slidePage(screenIdx.current - 1);
        return { idx: screenIdx.current, size: SCREENS.length };
      },
      nextPage: () => {
        slidePage(screenIdx.current + 1);
        return { idx: screenIdx.current, size: SCREENS.length };
      },
      saveData: () => {
        updateScreensArray();
        savePDF(BACKGROUNDS[backgroundIdx]);
      },
      withinRect: (x, y) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x1 = rect.left;
        const y1 = rect.top;
        const x2 = x1 + rect.width;
        const y2 = y1 + rect.height;

        return x >= x1 && y >= y1 && x < x2 && y < y2;
      },
      reset: () => {
        SCREENS.splice(0, SCREENS.length);
        SCREENS.push(null);
        loadScreenAt(0);
        return { idx: 0, size: SCREENS.length };
      },
    }),
    [backgroundIdx]
  );

  const loadScreenAt = (idx) => {
    clearCanvas();
    if (SCREENS[idx]) {
      contextRef.current.putImageData(SCREENS[idx], 0, 0);
    }
    screenIdx.current = idx;
  };

  const slidePage = (idx) => {
    updateScreensArray();
    loadScreenAt(idx);
  };

  const updateScreensArray = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;

    if (!SCREENS[screenIdx.current]) {
      SCREENS[screenIdx.current] = context.createImageData(
        screen.width,
        screen.height
      );
    }

    const smallImg = context.getImageData(0, 0, canvas.width, canvas.height);

    const largeImg = SCREENS[screenIdx.current];

    for (let y = 0; y < smallImg.height; y++) {
      for (let x = 0; x < smallImg.width; x++) {
        const smallerIndex = (y * smallImg.width + x) * 4;
        const largerIndex = (y * largeImg.width + x) * 4;

        largeImg.data[largerIndex] = smallImg.data[smallerIndex];
        largeImg.data[largerIndex + 1] = smallImg.data[smallerIndex + 1];
        largeImg.data[largerIndex + 2] = smallImg.data[smallerIndex + 2];
        largeImg.data[largerIndex + 3] = smallImg.data[smallerIndex + 3];
      }
    }
  };

  const resetBackground = () => {
    const background = BACKGROUNDS[backgroundIdx];
    const foreground = complement(background);

    const backgroundRGB = `rgb(${background[0]}, ${background[1]}, ${background[2]})`;
    const foregroundRGB = `rgb(${foreground[0]}, ${foreground[1]}, ${foreground[2]})`;
    canvasRef.current.style.backgroundColor = backgroundRGB;
    document.getElementById("page-number").style.color = foregroundRGB;
  };

  const clearCanvas = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  const onstart = () => {
    const canvas = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    contextRef.current = ctx;
  };

  const onresize = () => {
    const canvas = canvasRef.current;
    updateScreensArray();
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    contextRef.current = ctx;
    loadScreenAt(screenIdx.current);
  };

  const pointerEnterHandler = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    if (activeMouseRef.current != null) {
      activeMouseRef.current = null;
      interpolate(activeMouseRef, x, y, contextRef, toolIdx);
    }
  };

  const pointerDownHandler = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    if (event.button == 0) {
      event.stopPropagation();
      activeMouseRef.current = null;
      interpolate(activeMouseRef, x, y, contextRef, toolIdx);
    }
  };

  const pointerMoveHandler = (event) => {
    event.preventDefault();
    const x = event.clientX;
    const y = event.clientY;
    if (activeMouseRef.current != null) {
      interpolate(activeMouseRef, x, y, contextRef, toolIdx);
    }
  };

  const pointerUpHandler = (event) => {
    event.preventDefault();
    activeMouseRef.current = null;
  };

  return (
    <canvas
      id="board"
      ref={canvasRef}
      onPointerEnter={pointerEnterHandler}
      onPointerDown={pointerDownHandler}
      onPointerMove={pointerMoveHandler}
      onPointerUp={pointerUpHandler}
      onPointerCancel={pointerUpHandler}
    ></canvas>
  );
});

export default Board;
