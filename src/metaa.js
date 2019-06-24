
export const Anchor = ([p, s]) => ({
  pos: p,
  size: s,
  color: '#000000',
  type: 'round_fill',
})

export const Junction = ([a, b]) => ({
  a: a,
  b: b,
  weight: 5,
  color: '#000000',
})

export const Body = ({segments}) => ({
  segments: segments,
})

export const Composition = ([x, y, w, h]) => ({
  x: x,
  y: y,
  width: 0,
  height: 0,
  points: [...Array(x*y)].map((o, i) => [i%x, Math.floor(i/x)]),
})

//

// convert grid coords like [1, 1] to position in pixels
export const toWorld = (c, p) => {
  const g = grid(c.x, c.y, c.width, c.height)
  const idx = p[0] + p[1] * c.x
  return Vec2([g[idx].x, g[idx].y])
}

// grid(num x, num y, size x, size y) : returns an array of points
const grid = (nx, ny, sx, sy) => {
  let n = nx * ny
  let ox = sx / (nx-1)
  let oy = sy / (ny-1)
  let arr = []
  for (let k = 0; k < n; k++) {
    let px = (k % nx) * ox - sx/2
    let py = Math.floor(k / nx) * oy - sy/2
    arr.push(Vec2([px, py]))
  }
  return arr
}

const Vec2 = ([x, y]) => ({
  x: x,
  y: y,
})
