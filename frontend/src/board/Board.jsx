import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import "./Board.css";
import { BACKGROUNDS, DefaultChalk, DefaultDuster } from "../utils";
import jsPDF from "jspdf";

const SCREENS = [null];

/*
class PointQueue {
  constructor(maxSize) {
    this.queue = [];
    this.maxSize = maxSize;
  }

  enqueue(point) {
    if (this.queue.length >= this.maxSize) {
      this.queue.shift(); // Remove the first element if the queue is full
    }
    this.queue.push(point); // Add the new point
  }

  len() {
    return this.queue.length;
  }

  dequeue() {
    return this.queue.shift(); // Remove and return the first element
  }

  getQueue() {
    return this.queue; // Return the current state of the queue
  }
}


function catmullRomSpline(p0, p1, p2, p3, t) {
  let t2 = t * t;
  let t3 = t2 * t;

  let f1 = -0.5 * t3 + t2 - 0.5 * t;
  let f2 =  1.5 * t3 - 2.5 * t2 + 1.0;
  let f3 = -1.5 * t3 + 2.0 * t2 + 0.5 * t;
  let f4 =  0.5 * t3 - 0.5 * t2;

  let x = p0.x * f1 + p1.x * f2 + p2.x * f3 + p3.x * f4;
  let y = p0.y * f1 + p1.y * f2 + p2.y * f3 + p3.y * f4;

  return { x, y };
}
*/

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
      const sumA = a1 + a2;

      const r = (r1 * a1 + r2 * a2) / sumA;
      const g = (g1 * a1 + g2 * a2) / sumA;
      const b = (b1 * a1 + b2 * a2) / sumA;
      const a = a1 + Math.round((a2 / 255) * (255 - a1));

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
  constructor(maxSize) {
    this.queue = [];
    this.maxSize = maxSize;
  }

  enqueue(point) {
    if (this.queue.length >= this.maxSize) {
      this.queue.shift(); // Remove the first element if the queue is full
    }
    this.queue.push(point); // Add the new point
  }

  dequeue() {
    return this.queue.shift(); // Remove and return the first element
  }

  getQueue() {
    return this.queue; // Return the current state of the queue
  }
}

function catmullRomSpline(p0, p1, p2, p3, t) {
  let t2 = t * t;
  let t3 = t2 * t;

  let f1 = -0.5 * t3 + t2 - 0.5 * t;
  let f2 = 1.5 * t3 - 2.5 * t2 + 1.0;
  let f3 = -1.5 * t3 + 2.0 * t2 + 0.5 * t;
  let f4 = 0.5 * t3 - 0.5 * t2;

  let x = p0.xPos * f1 + p1.xPos * f2 + p2.xPos * f3 + p3.xPos * f4;
  let y = p0.yPos * f1 + p1.yPos * f2 + p2.yPos * f3 + p3.yPos * f4;

  return { x, y };
}

function linearInterpolate(points, mouseX, mouseY, contextRef, toolIdx) {
  const step = 1;
  if (points.length === 0) {
    if (toolIdx === 0) {
      escribe(mouseX, mouseY, contextRef);
    } else {
      erase(mouseX, mouseY, contextRef);
    }
  } else {
    const { xPos: prevX, yPos: prevY } = points[0];
    const dx = mouseX - prevX;
    const dy = mouseY - prevY;

    const steps = Math.max(Math.abs(dx), Math.abs(dy)) / step;

    if (steps !== 0) {
      const xIncrement = dx / steps;
      const yIncrement = dy / steps;

      for (let i = 0; i <= steps; i++) {
        const x = Math.round(prevX + xIncrement * i);
        const y = Math.round(prevY + yIncrement * i);
        if (toolIdx === 0) {
          escribe(x, y, contextRef);
        } else {
          erase(x, y, contextRef);
        }
      }
    }
  }
}

function interpolate(activeMouseRef, mouseX, mouseY, contextRef, toolIdx) {
  if (!activeMouseRef.current) {
    // Initialize PointQueue if null
    activeMouseRef.current = new PointQueue(4);
  }

  const pointQueue = activeMouseRef.current;
  const points = pointQueue.getQueue();

  // Ensure we have at least four points for interpolation
  if (points.length < 3) {
    linearInterpolate(points, mouseX, mouseY, contextRef, toolIdx);
    pointQueue.enqueue({ xPos: mouseX, yPos: mouseY });
    return;
  }

  const { xPos: prevX, yPos: prevY } = points[points.length - 1];
  const maxDiff = Math.max(Math.abs(prevX - mouseX), Math.abs(prevY - mouseY));

  if (maxDiff === 0) {
    return;
  }

  const step = 1 / maxDiff;
  // Enqueue the current mouse position
  pointQueue.enqueue({ xPos: mouseX, yPos: mouseY });

  const cpoints = activeMouseRef.current.getQueue();

  // Draw using Catmull-Rom spline interpolation
  for (let t = step; t <= 1; t += step) {
    // Adjust the step size for smoothness
    const p = catmullRomSpline(
      cpoints[0],
      cpoints[1],
      cpoints[2],
      cpoints[3],
      t
    );
    const x = Math.round(p.x);
    const y = Math.round(p.y);

    if (toolIdx === 0) {
      escribe(x, y, contextRef);
    } else {
      erase(x, y, contextRef);
    }
  }
}

function save(backgroundColor) {
  let maxWidth = 0;
  let maxHeight = 0;
  SCREENS.forEach((screen) => {
    maxWidth = Math.max(maxWidth, screen.width);
    maxHeight = Math.max(maxHeight, screen.height);
  });

  const pdf = new jsPDF({
    orientation: maxWidth > maxHeight ? "landscape" : "portrait",
    unit: "px",
    format: [maxWidth, maxHeight],
  });

  const [r1, g1, b1, _] = backgroundColor;

  SCREENS.forEach((screen, index) => {
    for (let i = 0; i < screen.width; i++) {
      for (let j = 0; j < screen.height; j++) {
        const idx = (i * screen.height + j) * 4;
        const r2 = screen.data[idx];
        const g2 = screen.data[idx + 1];
        const b2 = screen.data[idx + 2];
        const a2 = screen.data[idx + 3];

        const f2 = a2 / 255;
        const f1 = 1.0 - f2;

        screen.data[idx] = Math.floor(f1 * r1 + f2 * r2);
        screen.data[idx + 1] = Math.floor(f1 * g1 + f2 * g2);
        screen.data[idx + 2] = Math.floor(f1 * b1 + f2 * b2);
        screen.data[idx + 3] = 255;
      }
    }
    const x = (maxWidth - screen.width) / 2;
    const y = (maxHeight - screen.height) / 2;
    if (index > 0) pdf.addPage();
    pdf.addImage(screen, "JPEG", x, y, screen.width, screen.height);
  });

  pdf.save("screen_data.pdf");
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
        save(BACKGROUNDS[backgroundIdx]);
      },
      withinRect: (x, y) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x1 = rect.left;
        const y1 = rect.top;
        const x2 = x1 + rect.width;
        const y2 = y1 + rect.height;

        return x >= x1 && y >= y1 && x < x2 && y < y2;
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
    SCREENS[screenIdx.current] = contextRef.current.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
  };

  const resetBackground = () => {
    const background = BACKGROUNDS[backgroundIdx];
    const color = `rgb(${background[0]}, ${background[1]}, ${background[2]})`;
    canvasRef.current.style.backgroundColor = color;
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
    const data = contextRef.current.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    contextRef.current = ctx;
    ctx.putImageData(data, 0, 0);
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
