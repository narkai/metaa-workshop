
# METAA IDENTITY TOOLS

see the *METAA_Identity-Proposal.pdf* document beautifully devised by *EVERYDAY MON –––*

### JS

* web
* easier for menus & tooling
* ...

[thi-ng umbrella](https://github.com/thi-ng/umbrella/tree/master/examples)  
...  

### NODE

* packages (via npm, yarn)

Install Node on macOS with Homebrew:
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install node
```

[Homebrew](https://brew.sh/)  
[Node](https://nodejs.org/en/)  
...  

### CRA

* use react-scripts without using react itself
* autoconfig (webpack, babel, ...)
* modern js (ES6, import, ...)
* server (> http://), production build
* hot reloading, error logging, css autoprefixing
* ...

```
npx create-react-app my-app
cd my-app
// start
npm start
// stop
control+c
```

[Create React App](https://facebook.github.io/create-react-app/docs/getting-started)  
[boilerplate example](https://github.com/woudsma/p5js-es6-boilerplate)  
[ES6](https://exploringjs.com/es6/)
[ES6 import](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking)  
...  

### P5

* we love Processing !
* quick start
* svg export built-in
* use it as a canvas renderer
* ...

```
npm install --save p5
```

[p5js](https://p5js.org/reference/)  
[the coding train](https://www.youtube.com/user/shiffman/videos)  
...  

### API

Declarative architecture : the system api describes final states, animation comes later.

Try to keep state mutation and rendering functions outside of objects in a functional fashion, as much as possible.

* ui = function(state)
* functional programming
* inside object > get but don't set
* factory functions over classes, thanks romain for pointing this out !
* composition over inheritance, compose objects by what they do rather than by what they are

[How to UI in 2018](https://medium.com/@thi.ng/how-to-ui-in-2018-ac2ae02acdf3)  
[Mostly adequate guide to FP (in javascript)](https://github.com/MostlyAdequate/mostly-adequate-guide)  
[Factory Functions in JavaScript](https://www.youtube.com/watch?v=ImwrezYhw4w)  
[JavaScript Factory Functions with ES6+](https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1)  
[Composition over Inheritance](https://www.youtube.com/watch?v=wfMtDGfHWpA)  
...  

### IDEAS

* viewport size responsive
* snapshot/state builder
* spring animation
* movement recorder
* ...
