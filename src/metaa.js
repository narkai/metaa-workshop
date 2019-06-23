
export class Body {
  constructor(w, h, s) {
    this.x = 3
    this.y = 3
    this.w = w
    this.h = h
    let g = grid(this.x, this.y, this.w, this.h)
    this.anchors = g.map((v) => new Anchor(v, s))
  }
  target(b) {
    this.w += (b.w - this.w) * .05
    this.h += (b.h - this.h) * .05
    // https://stackoverflow.com/a/34349073/7662622
    for (let [i, a] of b.anchors.entries()) {
      let anchor = this.anchors[i]
      if (anchor) anchor.target(a)
    }
  }
  get() {
    return {
      anchors: this.anchors
    }
  }
}

export class Anchor {
  constructor(v, s) {
    this.p = v
    this.s = s
    this.c = '#000000'
    this.t = 'round_fill'
  }
  target(a) {
    this.p.target(a.p)
    this.s += (a.s - this.s) * .05
  }
  get() {
    return {
      x: this.p.x,
      y: this.p.y,
      size: this.s,
      color: this.c,
      type: this.t
    }
  }
}

//

// grid(num x, num y, size x, size y) : returns an array of points
const grid = (nx, ny, sx, sy) => {
  let n = nx * ny
  let ox = sx / (nx-1)
  let oy = sy / (ny-1)
  let arr = []
  for (let k = 0; k < n; k++) {
    let px = (k % nx) * ox - sx/2
    let py = Math.floor(k / nx) * oy - sy/2
    arr.push(new Vec2(px, py))
  }
  return arr
}

class Vec2 {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  target(v) {
    this.x += (v.x - this.x) * .05
    this.y += (v.y - this.y) * .05
  }
}
