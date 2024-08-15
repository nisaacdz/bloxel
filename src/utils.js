export const DEFAULT_BACKGROUND = [50, 50, 50, 255];
export const DEFAULT_CHALK_COLOR = [65, 72, 205];
const DOUBLE_LINE_CHALK_TRACE = [
  [
    [255, 255, 255, 0],
    [255, 255, 255, 0],
    [160, 163, 230, 0],
    [65, 72, 205, 0],
    [160, 163, 230, 0],
    [255, 255, 255, 0],
    [160, 163, 230, 0],
    [65, 72, 205, 0],
    [160, 163, 230, 0],
    [255, 255, 255, 0],
  ],
  [
    [255, 255, 255, 0],
    [255, 255, 255, 0],
    [160, 163, 230, 0],
    [65, 72, 205, 51],
    [160, 163, 230, 81],
    [255, 255, 255, 91],
    [160, 163, 230, 81],
    [65, 72, 205, 51],
    [160, 163, 230, 0],
    [255, 255, 255, 0],
  ],
  [
    [255, 255, 255, 0],
    [255, 255, 255, 0],
    [160, 163, 230, 71],
    [65, 72, 205, 122],
    [160, 163, 230, 153],
    [255, 255, 255, 163],
    [160, 163, 230, 153],
    [65, 72, 205, 122],
    [160, 163, 230, 71],
    [255, 255, 255, 0],
  ],
  [
    [255, 255, 255, 0],
    [255, 255, 255, 51],
    [160, 163, 230, 122],
    [65, 72, 205, 173],
    [160, 163, 230, 204],
    [255, 255, 255, 214],
    [160, 163, 230, 204],
    [65, 72, 205, 173],
    [160, 163, 230, 122],
    [255, 255, 255, 51],
  ],
  [
    [255, 255, 255, 0],
    [255, 255, 255, 81],
    [160, 163, 230, 153],
    [65, 72, 205, 204],
    [160, 163, 230, 234],
    [255, 255, 255, 244],
    [160, 163, 230, 234],
    [65, 72, 205, 204],
    [160, 163, 230, 153],
    [255, 255, 255, 81],
  ],
  [
    [255, 255, 255, 0],
    [255, 255, 255, 91],
    [160, 163, 230, 163],
    [65, 72, 205, 214],
    [160, 163, 230, 244],
    [255, 255, 255, 255],
    [160, 163, 230, 244],
    [65, 72, 205, 214],
    [160, 163, 230, 163],
    [255, 255, 255, 91],
  ],
  [
    [255, 255, 255, 0],
    [255, 255, 255, 81],
    [160, 163, 230, 153],
    [65, 72, 205, 204],
    [160, 163, 230, 234],
    [255, 255, 255, 244],
    [160, 163, 230, 234],
    [65, 72, 205, 204],
    [160, 163, 230, 153],
    [255, 255, 255, 81],
  ],
  [
    [255, 255, 255, 0],
    [255, 255, 255, 51],
    [160, 163, 230, 122],
    [65, 72, 205, 173],
    [160, 163, 230, 204],
    [255, 255, 255, 214],
    [160, 163, 230, 204],
    [65, 72, 205, 173],
    [160, 163, 230, 122],
    [255, 255, 255, 51],
  ],
  [
    [255, 255, 255, 0],
    [255, 255, 255, 0],
    [160, 163, 230, 71],
    [65, 72, 205, 122],
    [160, 163, 230, 153],
    [255, 255, 255, 163],
    [160, 163, 230, 153],
    [65, 72, 205, 122],
    [160, 163, 230, 71],
    [255, 255, 255, 0],
  ],
  [
    [255, 255, 255, 0],
    [255, 255, 255, 0],
    [160, 163, 230, 0],
    [65, 72, 205, 51],
    [160, 163, 230, 81],
    [255, 255, 255, 91],
    [160, 163, 230, 81],
    [65, 72, 205, 51],
    [160, 163, 230, 0],
    [255, 255, 255, 0],
  ],
];

const SOLID_CHALK_TRACE = [
  [
    [65, 72, 205, 0],
    [65, 72, 205, 0],
    [65, 72, 205, 27],
    [65, 72, 205, 45],
    [65, 72, 205, 51],
    [65, 72, 205, 45],
    [65, 72, 205, 27],
    [65, 72, 205, 0],
    [65, 72, 205, 0],
  ],
  [
    [65, 72, 205, 0],
    [65, 72, 205, 39],
    [65, 72, 205, 71],
    [65, 72, 205, 94],
    [65, 72, 205, 102],
    [65, 72, 205, 94],
    [65, 72, 205, 71],
    [65, 72, 205, 39],
    [65, 72, 205, 0],
  ],
  [
    [65, 72, 205, 27],
    [65, 72, 205, 71],
    [65, 72, 205, 111],
    [65, 72, 205, 141],
    [65, 72, 205, 153],
    [65, 72, 205, 141],
    [65, 72, 205, 111],
    [65, 72, 205, 71],
    [65, 72, 205, 27],
  ],
  [
    [65, 72, 205, 45],
    [65, 72, 205, 94],
    [65, 72, 205, 141],
    [65, 72, 205, 183],
    [65, 72, 205, 204],
    [65, 72, 205, 183],
    [65, 72, 205, 141],
    [65, 72, 205, 94],
    [65, 72, 205, 45],
  ],
  [
    [65, 72, 205, 51],
    [65, 72, 205, 102],
    [65, 72, 205, 153],
    [65, 72, 205, 204],
    [65, 72, 205, 255],
    [65, 72, 205, 204],
    [65, 72, 205, 153],
    [65, 72, 205, 102],
    [65, 72, 205, 51],
  ],
  [
    [65, 72, 205, 45],
    [65, 72, 205, 94],
    [65, 72, 205, 141],
    [65, 72, 205, 183],
    [65, 72, 205, 204],
    [65, 72, 205, 183],
    [65, 72, 205, 141],
    [65, 72, 205, 94],
    [65, 72, 205, 45],
  ],
  [
    [65, 72, 205, 27],
    [65, 72, 205, 71],
    [65, 72, 205, 111],
    [65, 72, 205, 141],
    [65, 72, 205, 153],
    [65, 72, 205, 141],
    [65, 72, 205, 111],
    [65, 72, 205, 71],
    [65, 72, 205, 27],
  ],
  [
    [65, 72, 205, 0],
    [65, 72, 205, 39],
    [65, 72, 205, 71],
    [65, 72, 205, 94],
    [65, 72, 205, 102],
    [65, 72, 205, 94],
    [65, 72, 205, 71],
    [65, 72, 205, 39],
    [65, 72, 205, 0],
  ],
  [
    [65, 72, 205, 0],
    [65, 72, 205, 0],
    [65, 72, 205, 27],
    [65, 72, 205, 45],
    [65, 72, 205, 51],
    [65, 72, 205, 45],
    [65, 72, 205, 27],
    [65, 72, 205, 0],
    [65, 72, 205, 0],
  ],
];

const MIDLINE_CHALK_TRACE = [
  [
    [254, 254, 254, 0],
    [247, 247, 253, 0],
    [235, 235, 249, 27],
    [222, 223, 246, 45],
    [217, 218, 245, 51],
    [222, 223, 246, 45],
    [235, 235, 249, 27],
    [247, 247, 253, 0],
    [254, 254, 254, 0],
  ],
  [
    [247, 247, 253, 0],
    [227, 228, 247, 39],
    [196, 198, 239, 71],
    [170, 173, 232, 94],
    [160, 163, 230, 102],
    [170, 173, 232, 94],
    [196, 198, 239, 71],
    [227, 228, 247, 39],
    [247, 247, 253, 0],
  ],
  [
    [235, 235, 249, 27],
    [196, 198, 239, 71],
    [149, 153, 227, 111],
    [114, 119, 218, 141],
    [103, 108, 215, 153],
    [114, 119, 218, 141],
    [149, 153, 227, 111],
    [196, 198, 239, 71],
    [235, 235, 249, 27],
  ],
  [
    [222, 223, 246, 45],
    [170, 173, 232, 94],
    [114, 119, 218, 141],
    [81, 87, 209, 183],
    [72, 79, 206, 204],
    [81, 87, 209, 183],
    [114, 119, 218, 141],
    [170, 173, 232, 94],
    [222, 223, 246, 45],
  ],
  [
    [217, 218, 245, 51],
    [160, 163, 230, 102],
    [103, 108, 215, 153],
    [72, 79, 206, 204],
    [65, 72, 205, 255],
    [72, 79, 206, 204],
    [103, 108, 215, 153],
    [160, 163, 230, 102],
    [217, 218, 245, 51],
  ],
  [
    [222, 223, 246, 45],
    [170, 173, 232, 94],
    [114, 119, 218, 141],
    [81, 87, 209, 183],
    [72, 79, 206, 204],
    [81, 87, 209, 183],
    [114, 119, 218, 141],
    [170, 173, 232, 94],
    [222, 223, 246, 45],
  ],
  [
    [235, 235, 249, 27],
    [196, 198, 239, 71],
    [149, 153, 227, 111],
    [114, 119, 218, 141],
    [103, 108, 215, 153],
    [114, 119, 218, 141],
    [149, 153, 227, 111],
    [196, 198, 239, 71],
    [235, 235, 249, 27],
  ],
  [
    [247, 247, 253, 0],
    [227, 228, 247, 39],
    [196, 198, 239, 71],
    [170, 173, 232, 94],
    [160, 163, 230, 102],
    [170, 173, 232, 94],
    [196, 198, 239, 71],
    [227, 228, 247, 39],
    [247, 247, 253, 0],
  ],
  [
    [254, 254, 254, 0],
    [247, 247, 253, 0],
    [235, 235, 249, 27],
    [222, 223, 246, 45],
    [217, 218, 245, 51],
    [222, 223, 246, 45],
    [235, 235, 249, 27],
    [247, 247, 253, 0],
    [254, 254, 254, 0],
  ],
];

const GRID_CHALK_TRACE = [
  [
    [65, 72, 205, 0],
    [255, 255, 255, 0],
    [65, 72, 205, 53],
    [255, 255, 255, 69],
    [65, 72, 205, 75],
    [255, 255, 255, 69],
    [65, 72, 205, 53],
    [255, 255, 255, 0],
    [65, 72, 205, 0],
  ],
  [
    [255, 255, 255, 0],
    [65, 72, 205, 64],
    [255, 255, 255, 92],
    [65, 72, 205, 112],
    [255, 255, 255, 120],
    [65, 72, 205, 112],
    [255, 255, 255, 92],
    [65, 72, 205, 64],
    [255, 255, 255, 0],
  ],
  [
    [65, 72, 205, 53],
    [255, 255, 255, 92],
    [65, 72, 205, 128],
    [255, 255, 255, 154],
    [65, 72, 205, 165],
    [255, 255, 255, 154],
    [65, 72, 205, 128],
    [255, 255, 255, 92],
    [65, 72, 205, 53],
  ],
  [
    [255, 255, 255, 69],
    [65, 72, 205, 112],
    [255, 255, 255, 154],
    [65, 72, 205, 191],
    [255, 255, 255, 210],
    [65, 72, 205, 191],
    [255, 255, 255, 154],
    [65, 72, 205, 112],
    [255, 255, 255, 69],
  ],
  [
    [65, 72, 205, 75],
    [255, 255, 255, 120],
    [65, 72, 205, 165],
    [255, 255, 255, 210],
    [65, 72, 205, 255],
    [255, 255, 255, 210],
    [65, 72, 205, 165],
    [255, 255, 255, 120],
    [65, 72, 205, 75],
  ],
  [
    [255, 255, 255, 69],
    [65, 72, 205, 112],
    [255, 255, 255, 154],
    [65, 72, 205, 191],
    [255, 255, 255, 210],
    [65, 72, 205, 191],
    [255, 255, 255, 154],
    [65, 72, 205, 112],
    [255, 255, 255, 69],
  ],
  [
    [65, 72, 205, 53],
    [255, 255, 255, 92],
    [65, 72, 205, 128],
    [255, 255, 255, 154],
    [65, 72, 205, 165],
    [255, 255, 255, 154],
    [65, 72, 205, 128],
    [255, 255, 255, 92],
    [65, 72, 205, 53],
  ],
  [
    [255, 255, 255, 0],
    [65, 72, 205, 64],
    [255, 255, 255, 92],
    [65, 72, 205, 112],
    [255, 255, 255, 120],
    [65, 72, 205, 112],
    [255, 255, 255, 92],
    [65, 72, 205, 64],
    [255, 255, 255, 0],
  ],
  [
    [65, 72, 205, 0],
    [255, 255, 255, 0],
    [65, 72, 205, 53],
    [255, 255, 255, 69],
    [65, 72, 205, 75],
    [255, 255, 255, 69],
    [65, 72, 205, 53],
    [255, 255, 255, 0],
    [65, 72, 205, 0],
  ],
];

/// Takes three color components and returns a fourth value that is as similar to the third as the first is similar to the second
/// Without overflowing the rgb boundaries 0-255
function translate(cur, sim, end) {
  if (cur === sim) {
    return end;
  } else if (cur > sim) {
    // sim is guaranteed to not be equal to 255 because one of the other two conditions would have been triggered instead!
    // const diff_ratio = (cur - sim) / (255 - sim)
    return end + Math.round(((255 - end) * (cur - sim)) / (255 - sim));
  } else {
    // sim is guaranteed to not be equal to zero because one of the above conditions would have been triggered instead!
    // const diff = (sim - cur) / sim;
    return end - Math.round((end * (sim - cur)) / sim);
  }
}

export class Chalk {
  constructor(design, color) {
    this.design = design;
    this.original = DEFAULT_CHALK_COLOR;
    this.newcolor = color;
  }

  name() {
    return "Chalk";
  }

  changeDesign(newdesign) {
    this.design = newdesign;
  }

  changeColor(newcolor) {
    this.newcolor = newcolor;
  }

  idx(x, y) {
    const [curR, curG, curB, a] = this.design[x][y];
    const [simR, simG, simB] = this.original;
    const [endR, endG, endB] = this.newcolor;

    return [
      translate(curR, simR, endR),
      translate(curG, simG, endG),
      translate(curB, simB, endB),
      a,
    ];
  }

  idx_ptr(x, y) {
    const [r, g, b, a] = this.idx(x, y);
    return [r, g, b, Math.floor(0.8 * a)];
  }

  sizeX() {
    return this.design.length;
  }

  sizeY() {
    return this.design[0].length;
  }
}

export const COLORS = [
  [255, 127, 64],
  [255, 255, 255],
  [65, 72, 205],
  [240, 25, 100],
  [0, 64, 64],
  [165, 75, 165],
  [0, 0, 0],
];

export const BACKGROUNDS = [
  [50, 50, 50, 255],
  [255, 255, 255, 255],
  [120, 190, 120, 255],
  [120, 120, 190, 255],
  [190, 120, 120, 255],
];

export const DESIGNS = [
  MIDLINE_CHALK_TRACE,
  SOLID_CHALK_TRACE,
  GRID_CHALK_TRACE,
  DOUBLE_LINE_CHALK_TRACE,
];

export const DefaultChalk = new Chalk(DESIGNS[0], COLORS[0]);

class Duster {
  constructor(background) {
    this.background = background;
  }

  changeBackground(newbackground) {
    this.background = newbackground;
  }

  name() {
    return "Duster";
  }

  color() {
    return this.background;
  }

  idx_ptr(x, y) {
    if (x < 3 || x >= this.sizeY() - 3 || y < 3 || y >= this.sizeX() - 3) {
      return complement(this.color());
    } else {
      return this.color();
    }
  }

  sizeY() {
    return 30;
  }

  sizeX() {
    return 60;
  }
}

export function complement(color) {
  const [r, g, b, a] = color;
  const nr = r + 127 <= 255 ? r + 127 : r - 128;
  const ng = g + 127 <= 255 ? g + 127 : g - 128;
  const nb = b + 127 <= 255 ? b + 127 : b - 128;
  return [nr, ng, nb, a];
}

export const DefaultDuster = new Duster(DEFAULT_BACKGROUND);
