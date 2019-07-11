
// METAA
// see 'METAA_Identity-Proposal.pdf'
// convention :
// index     >  grid points array index : integer
// coords    >  grid coordinates : [integer, integer]
// point     >  normalized position (0-100) : [float, float]
// position  >  world position : Vec2

// DATAS

export const Composition = ([rows, columns]) => ({
  rows: rows,
  columns: columns,
  origins: gridPoints(rows, columns),
  points: gridPoints(rows, columns),
})

export const Body = ([rows, columns, lines]) => ({
  lines: lines,
  rows: rows,
  columns: columns,
  offsets: {
    rows: [...Array(rows-1)].map(() => 1),
    columns: [...Array(columns-1)].map(() => 1),
  },
  coords: [0, 0],
})

export const Junction = ([pointA, pointB]) => ({
  pointA: pointA,
  pointB: pointB,
  weight: 5,
  color: '#000000',
})

export const Anchor = ([point, size]) => ({
  point: point,
  size: size,
  color: '#000000',
  type: 'round_fill',
})

const Vec2 = ([x, y]) => ({
  x: x,
  y: y,
})

// 0 – 1 – 2
// |   |   |
// 3 – 4 – 5
// |   |   |
// 6 – 7 – 8
export const symbol3x3 = {
  M: [ [6,0], [0,4], [4,2], [2,8] ]
}

// get comp points from body parameters
export const bodyToComp = (body, comp) => {
  const coordWithOffsets = (coord, offsets) => [...Array(coord)].reduce((a, c, i) => a + (i > offsets.length-1 ? 0 : Math.max(1, offsets[i])), 0)
  const indexToComp = (index) => {
    // map body index to comp index
    let i = mapIndex(index, body.rows, comp.rows)
    // turn it into grid coordinates
    i = indexToCoords(i, comp.rows)
    // add offsets
    i = [coordWithOffsets(i[0], body.offsets.rows), coordWithOffsets(i[1], body.offsets.columns)]
    // add body position
    i = coordsAdd(i, body.coords)
    // clamp coordinates on comp limits
    i = [clampValue(i[0], 0, comp.columns-1), clampValue(i[1], 0, comp.rows-1)]
    // get the comp grid index
    i = coordsToIndex(i, comp.rows)
    return i
  }
  // return comp points
  return body.lines.map(l => [
    comp.points[indexToComp(l[0])],
    comp.points[indexToComp(l[1])]
  ])
}

// map point to position on a given size
export const pointToPosition = (point, width, height) => Vec2([mapValue(point[0], 0, 100, 0, width), mapValue(point[1], 0, 100, 0, height)])

// comp setters
export const column = (comp, coord, value) => {
  //
  let r = columnIndexes(coord, comp.rows)
  for (let i of r) comp.points[i] = [value, comp.points[i][1]]
}
export const row = (comp, coord, value) => {
  let c = rowIndexes(coord, comp.rows, comp.columns)
  for (let i of c) comp.points[i] = [comp.points[i][0], value]
}
export const jiggle = (comp) => { for (let [i] of comp.points.entries()) comp.points[i] = [comp.points[i][0]+(Math.random()-.5), comp.points[i][1]+(Math.random()-.5)] }
export const reset = (comp) => { comp.points = [...comp.origins] }

// body setters
export const offset = (body, axis, pos, val) => { body.offsets[axis][pos] = val }
export const move = (body, coords) => { body.coords = coords }

// HELPERS

const clampValue = (val, min, max) => Math.max(min, Math.min(max, val))
const mapValue = (val, minIn, maxIn, minOut, maxOut) => (val - minIn) * (maxOut - minOut) / (maxIn - minIn) + minOut
const mapIndex = (index, rows1, rows2) => coordsToIndex(indexToCoords(index, rows1), rows2)

const indexToCoords = (index, rows) => [index%rows, Math.floor(index/rows)]
const coordsToIndex = (coords, rows) => coords[0] + coords[1] * rows
const coordsAdd = (coords1, coords2) => [coords1[0] + coords2[0], coords1[1] + coords2[1]]

// const indexToPoint = (index, rows, columns) => coordsToPoint(indexToCoords(index, rows), rows, columns)
const coordsToPoint = (coords, rows, columns) => [coords[0]/(columns-1)*100, coords[1]/(rows-1)*100] // points values normalized from 0 to 100
const gridPoints = (rows, columns) => [...Array(rows*columns)].map((o, i) => coordsToPoint(indexToCoords(i, rows), rows, columns))

const columnIndexes = (coord, rows) => [...Array(rows)].map((o, i) => coordsToIndex([coord, i], rows))
const rowIndexes = (coord, rows, columns) => [...Array(columns)].map((o, i) => coordsToIndex([i, coord], rows))
