
import {
  Body
} from './metaa'

export const sketch = (p5) => {

  // https://github.com/processing/p5.js/wiki/Optimizing-p5.js-Code-for-Performance#disable-the-friendly-error-system-fes
  p5.disableFriendlyErrors = true

  // used to demonstrate interpolation between states
  let current = new Body(0, 0, 0)
  let target = new Body(0, 0, 0)

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

    p5.translate(p5.width/2, p5.height/2)

    //

    // animate transition
    current.target(target)

    // render stuff
    let b = current.get()
    render('anchors', b.anchors)
  }

  p5.keyTyped = (e) => {
    if (e.key === ' ') {
      // change target state
      let s1 = p5.random(50, 600)
      let s2 = p5.random(0, 100)
      // let s2 = s1/10
      target = new Body(s1, s1, s2)
    }
  }

  p5.windowResized = () => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight)
  }

  // custom render function
  const render = (type, arr) => {
    if (type === 'anchors') {
      for (let elm of arr) {
        let a = elm.get()
        if (a.type === 'round_fill') {
          p5.noStroke()
          p5.fill(p5.color(a.color))
          p5.ellipse(a.x, a.y, a.size, a.size)
        }
      }
    }
  }

}
