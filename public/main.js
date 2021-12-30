let canvasElem = document.querySelector('.thisCanvas')
let stringInput = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

let ORIGIN = [300, 300]
let H_LETTER = 24
let R = 150

let ctx = canvasElem.getContext('2d')
ctx.translate(ORIGIN[0], ORIGIN[1])

var f = new FontFace('FontName', 'url(./DancingScript-Regular.ttf)')
f.load().then(function(font) {
  document.fonts.add(font)
  ctx.font = '24px FontName'
  makeImage ()
})


function makeImage () {
    
    let angle = 0
    let radius = R
    ctx.save()
    for(let i = 0; i < stringInput.length; i++) {
        widthLetter = ctx.measureText(stringInput[i]).width;
        radius = R + angle*H_LETTER/(2*Math.PI)
        ctx.rotate(angle-Math.PI/2)
        ctx.fillText(stringInput[i], 0, -radius)
        ctx.restore()
        ctx.save()
        angle += 2*Math.atan((widthLetter)/(radius*2))
    }
    console.log(canvasElem.toDataURL())
}