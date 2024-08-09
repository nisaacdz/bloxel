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
