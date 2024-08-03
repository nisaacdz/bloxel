class Duster {
  constructor(background) {
    this.background = background;
  }

  name() {
    return "Duster";
  }

  idx(x, y) {
    return this.background;
  }

  idx_ptr(x, y) {
    if (x < 2 || x >= this.sizeY() - 2 || y < 2 || y >= this.sizeX() - 2) {
      return complement(this.idx(x, y));
    } else {
      return this.idx(x, y);
    }
  }

  sizeY() {
    return 30;
  }

  sizeX() {
    return 60;
  }
}

function complement(color) {
  const [r, g, b, a] = color;
  return [255 - r, 255 - g, 255 - b, a];
}

export const DefaultDuster = new Duster([50, 50, 50, 255]);
