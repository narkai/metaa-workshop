
import {
  Composition,
  Body,
  Junction,
  Anchor,
  toWorld,
} from './metaa'

//

export const sketch = (p5) => {

  // https://github.com/processing/p5.js/wiki/Optimizing-p5.js-Code-for-Performance#disable-the-friendly-error-system-fes
  p5.disableFriendlyErrors = true

  //

  let current = Composition([11, 11])
  window.c = current // dev tools access
  let target = Composition([11, 11])

  //

  p5.setup = () => {
    p5.frameRate(60);
    p5.createCanvas(window.innerWidth, window.innerHeight)
    p5.background(255)
  }

  p5.draw = () => {
    p5.background(255)

    // show fps
    let fps = p5.frameRate()
    p5.fill(0, 155, 0)
    p5.noStroke()
    p5.text(fps.toFixed(2), 15, 15)
    // console.log(fps.toFixed(2))

    p5.translate(p5.width/2, p5.height/2)

    //

    current.width += (target.width - current.width) * .05
    current.height += (target.height - current.height) * .05

    const body = Body({
      segments: [ [[0,0],[1,1]], [[3,3],[4,4]] ]
    })
    const junctions = body.segments.map(s =>
      Junction([s[0], s[1]])
    )
    const anchors = current.points.map(p =>
      Anchor([p, 5])
    )

    renderJunctions(current, junctions)
    renderAnchors(current, anchors)
  }

  p5.keyTyped = (e) => {
    if (e.key === ' ') {
      // change target state
      let s1 = p5.random(50, 600)
      target.width = s1
      target.height = s1
    }
  }

  p5.windowResized = () => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight)
  }

  // custom render functions
  const renderJunctions = (comp, arr) => {
    for (let j of arr) {
      const a = toWorld(comp, j.a)
      const b = toWorld(comp, j.b)
      p5.stroke(j.color)
      p5.strokeWeight(j.weight)
      p5.line(a.x, a.y, b.x, b.y)
    }
  }
  const renderAnchors = (comp, arr) => {
    for (let a of arr) {
      const pos = toWorld(comp, a.pos)
      if (a.type === 'round_fill') {
        p5.noStroke()
        p5.fill(p5.color(a.color))
        p5.ellipse(pos.x, pos.y, a.size, a.size)
      }
    }
  }

}
