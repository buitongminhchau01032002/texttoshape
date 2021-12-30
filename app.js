const express = require('express')
const app = express()
const path = require('path')
const { createCanvas, registerFont } = require('canvas')
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
app.get('/', (req, res) => {
    res.send('Hello world!')
})
app.get('/circle', (req, res) => {
    res.send(makeImage(req.query.textinput))
})



function makeImage (stringInput) {
    registerFont(path.join(__dirname+'/public/DancingScript-Regular.ttf'), { family: 'DancingScript' })

    const canvas = createCanvas(600, 600)
    const ctx = canvas.getContext('2d')
    ctx.font = '24px "DancingScript"'

    let ORIGIN = [300, 300]
    let H_LETTER = 24
    let R = 150

    ctx.translate(ORIGIN[0], ORIGIN[1])

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
    
    return canvas.toDataURL()
}


app.listen(port, () => console.log(`Application listening on port ${port}!`))
