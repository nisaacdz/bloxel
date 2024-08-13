function cubicBezierSpline(p0, p1, p2, p3, t) {
  let t2 = t * t;
  let t3 = t2 * t;
  let mt = 1 - t;
  let mt2 = mt * mt;
  let mt3 = mt2 * mt;

  let x =
    mt3 * p0.xPos +
    3 * mt2 * t * p1.xPos +
    3 * mt * t2 * p2.xPos +
    t3 * p3.xPos;
  let y =
    mt3 * p0.yPos +
    3 * mt2 * t * p1.yPos +
    3 * mt * t2 * p2.yPos +
    t3 * p3.yPos;

  return { x, y };
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
    const [prevX, prevY] = points[0];
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


function escribe3(mouseX, mouseY, contextRef) {
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