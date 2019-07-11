
import {
  symbol3x3,
  bodyToComp,
  pointToPosition,
  Composition,
  Body,
  Junction,
  Anchor,
  row,
  column,
  jiggle,
  reset,
  offset,
  move,
} from './metaa'

// metaa identity tools
// TODO: improve and build upon :D

export const sketch = (p5) => {

  // https://github.com/processing/p5.js/wiki/Optimizing-p5.js-Code-for-Performance#disable-the-friendly-error-system-fes
  p5.disableFriendlyErrors = true

  const maxSize = () => Math.min(window.innerWidth/8*6, window.innerHeight/8*6)

  // metaa objects
  let comp = Composition([11, 11])
  let body = Body([3, 3, symbol3x3["M"]])

  // utility variables
  let lines = bodyToComp(body, comp)
  let size = 0
  let sizeDes = maxSize()
  let i = 0
  let s = 0
  let j = false

  // to interact from the dev tools
  window.row = (r, p) => { row(comp, r, p) }
  window.column = (c, p) => { column(comp, c, p) }
  window.jiggle = () => { jiggle(comp) }
  window.reset = () => { reset(comp) }
  window.offset = (axis, pos, val) => { offset(body, axis, pos, val) }

  //

  p5.setup = () => {
    p5.frameRate(60);
    p5.createCanvas(window.innerWidth, window.innerHeight)
    p5.background(255)
  }

  p5.windowResized = () => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight)
    sizeDes = maxSize()
  }

  p5.keyPressed = (e) => {
    // set comp size
    if (e.key === ' ') sizeDes = p5.random(50, maxSize())
    // set body coords
    if (e.keyCode === p5.LEFT_ARROW) move(body, [body.coords[0]-1, body.coords[1]])
    if (e.keyCode === p5.RIGHT_ARROW) move(body, [body.coords[0]+1, body.coords[1]])
    if (e.keyCode === p5.UP_ARROW) move(body, [body.coords[0], body.coords[1]-1])
    if (e.keyCode === p5.DOWN_ARROW) move(body, [body.coords[0], body.coords[1]+1])
    // set body offsets
    if (e.key === 'c') offset(body, 'columns', i++ % 2, s++ % 5)
    if (e.key === 'r') offset(body, 'rows', i++ % 2, s++ % 5)
    // toggle jiggle effect
    if (e.key === 'j') j = !j
    if (e.key === '0') reset(comp)
  }

  p5.draw = () => {
    p5.background(255)

    // show fps
    let fps = p5.frameRate()
    p5.fill(0, 155, 0)
    p5.noStroke()
    p5.text(fps.toFixed(2), 15, 25)
    // console.log(fps.toFixed(2))

    // get in the middle
    p5.translate(p5.width/2, p5.height/2)

    // interpolate comp size
    size = interpolate(size, sizeDes)

    // jiggle
    if (j) jiggle(comp)

    // render anchors
    const anchors = comp.points.map(p => Anchor([p, 5]))
    renderAnchors(anchors)

    // render junctions
    const linesDes = bodyToComp(body, comp)
    for (let [i, l] of linesDes.entries()) {
      let x1 = interpolate(lines[i][0][0], l[0][0])
      let y1 = interpolate(lines[i][0][1], l[0][1])
      let x2 = interpolate(lines[i][1][0], l[1][0])
      let y2 = interpolate(lines[i][1][1], l[1][1])
      lines[i] = [[x1, y1], [x2, y2]]
    }
    const junctions = lines.map(p => Junction(p))
    renderJunctions(junctions)
  }

  // basic interpolation
  const interpolate = (c, d) => c + (d - c) * .1

  // custom render functions
  const renderAnchors = (arr) => {
    for (let a of arr) {
      const pos = pointToPosition(a.point, size, size)
      if (a.type === 'round_fill') {
        p5.noStroke()
        p5.fill(p5.color(a.color))
        p5.ellipse(pos.x-size/2, pos.y-size/2, a.size, a.size)
      }
    }
  }
  const renderJunctions = (arr) => {
    for (let j of arr) {
      const a = pointToPosition(j.pointA, size, size)
      const b = pointToPosition(j.pointB, size, size)
      p5.stroke(j.color)
      p5.strokeWeight(j.weight)
      p5.line(a.x-size/2, a.y-size/2, b.x-size/2, b.y-size/2)
    }
  }
}
