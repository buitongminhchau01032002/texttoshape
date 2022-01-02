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
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello world!')
})
app.get('/circle', (req, res) => {
    res.send(makeCircleImage(req.query.textinput))
})
app.get('/heart', (req, res) => {
    res.send(makeHeartImage(req.query.textinput))
})

function makeHeartImage (stringInput) {
    console.log(stringInput)
    registerFont(path.join(__dirname+'/public/DancingScript-Regular.ttf'), { family: 'DancingScript' })

    const canvas = createCanvas(600, 600)
    let ctx = canvas.getContext('2d')
    ctx.font = '24px "DancingScript"'

    const arrText = stringInput.split(' ')
    let arr1 = []
    let arr2 = []
    const h = 20
    let n = 12
    let nDiv3 = Math.floor(n/3)
    let R = nDiv3*h

    let l = 6 // Toi thieu 6 dong
    let r = 30 // Toi da 30 dong

    // tìm kiếm nhị phân số dòng
    do {
        n = Math.floor((l+r)/2)
        nDiv3 = Math.floor(n/3)
        R = nDiv3*h
        createData()
        if (isFull()) {
            l = n+1
        } else {
            r = n
        }
    } while(l < r)
    n = r
    nDiv3 = Math.floor(n/3)
    R = nDiv3*h
    createData()
    // Tìm kiếm nhị phân độ co nhỏ
    let l_ = 0
    let r_ = 4*h
    let mid = 2*h
    let arr1Temp = arr1
    let arr2Temp = arr2
    do {
        mid = Math.floor((l_+r_)/2)
        arr1 = arr1Temp.map(arr => (
            arr.map(x => x-x/(2*R)*mid)
        ))
        arr2 = arr2Temp.map(arr => (
            arr.map(x => x-x/(2*R)*mid)
        ))
        if (!isFull()) {
            l_ = mid+1
        } else {
            r_ = mid
        }
    } while(l_ < r_)
    mid = r_-1
    arr1 = arr1Temp.map(arr => (
        arr.map(x => x-x/(2*R)*mid)
    ))
    arr2 = arr2Temp.map(arr => (
        arr.map(x => x-x/(2*R)*mid)
    ))

    ctx.translate(300, 300 - n*h/2 + R)
    draw()

    function createData () {
        arr1 = []
        arr2 = []
        // Them vao mang cac vi tri
        for (let i = 0; i < nDiv3; i++) {
            let y = -R+i*h;
            let x1 = -Math.sqrt(R*R-y*y)-R
            let x2 = Math.sqrt(R*R-y*y)-R
            let x3 = -Math.sqrt(R*R-y*y)+R
            let x4 = Math.sqrt(R*R-y*y)+R
            arr1.push([x1, x2, x3, x4])
        }

        let a = 2*R/((n-nDiv3)*h)**2
        for (let i = 0; i < n-nDiv3; i++) {
            let y = i*h
            let x1 = a*y**2 - 2*R
            let x2 = -a*y**2 + 2*R
            arr2.push([x1, x2])
        }
    }

    function draw() {
        let indexWord = 0;

        // Ve phan tren
        for (let row = 0; row < nDiv3; row++) {
            const [x1, x2, x3, x4] = arr1[row]
            let y = -R + row*h
            let lengthOfRow = x2 - x1
            let tempString = ''
            while (ctx.measureText(tempString + arrText[indexWord]).width <= lengthOfRow) {
                tempString += ((tempString != ''?' ':'') + arrText[indexWord])
                indexWord++;
            }
            drawText(tempString, x1, x2, y)

            tempString = ''
            while (ctx.measureText(tempString + arrText[indexWord]).width <= lengthOfRow) {
                tempString += ((tempString != ''?' ':'') + arrText[indexWord])
                indexWord++;
            }
            drawText(tempString, x3, x4, y)
        }

        // // Ve phan duoi
        // for (let row = 0; row < n-nDiv3; row++) {
        //     const [x1, x2] = arr2[row]
        //     let y = row*h
        //     let lengthOfRow = x2 - x1
        //     let tempString = ''
        //     while (indexWord < arrText.length && 
        //         ctx.measureText(tempString + arrText[indexWord]).width <= lengthOfRow
        //     ) {
        //         tempString += ((tempString != ''?' ':'') + arrText[indexWord])
        //         indexWord++;
        //     }
        //     drawText(tempString, x1, x2, y)
        //     if (indexWord >= arrText.length) {
        //         return
        //     }
        // }
    }

    function isFull () {
        let indexWord = 0;

        // Cho phan tren
        for (let row = 0; row < nDiv3; row++) {
            let lengthOfRow = arr1[row][1] - arr1[row][0]
            let tempString = ''
            while (indexWord < arrText.length && 
                ctx.measureText(tempString + arrText[indexWord]).width <= lengthOfRow
            ) {
                tempString += ((tempString != ''?' ':'') + arrText[indexWord])
                indexWord++;
            }
            if (indexWord >= arrText.length) {
                return false
            }

            tempString = ''
            while (indexWord < arrText.length && 
                ctx.measureText(tempString + arrText[indexWord]).width <= lengthOfRow
            ) {
                tempString += ((tempString != ''?' ':'') + arrText[indexWord])
                indexWord++;
            }
            if (indexWord >= arrText.length) {
                return false
            }

        }

        // Cho phan duoi
        for (let row = 0; row < n-nDiv3; row++) {
            let lengthOfRow = arr2[row][1] - arr2[row][0]
            let tempString = ''
            while (indexWord < arrText.length && 
                ctx.measureText(tempString + arrText[indexWord]).width <= lengthOfRow
            ) {
                tempString += ((tempString != ''?' ':'') + arrText[indexWord])
                indexWord++;
            }
            if (indexWord >= arrText.length) {
                return false
            }
        }
        return true
    }

    // Ve mot hang can deu 2 ben
    function drawText (stringDraw, x1, x2, y) {
        const arrWord = stringDraw.split(' ')
        if (arrWord.length === 0) {
            return
        }
        if (arrWord.length === 1) {
            let x = (x2+x1)/2 - ctx.measureText(stringDraw).width/2
            ctx.fillText(stringDraw, x, y)
            return
        }
        let spaceWidth = ((x2-x1) - ctx.measureText(stringDraw.replaceAll(' ', '')).width)/(arrWord.length-1)
        let xCurrent = x1
        arrWord.forEach(word => {
            ctx.fillText(word, xCurrent, y)
            xCurrent += (ctx.measureText(word).width + spaceWidth)
        })
    }
    return canvas.toDataURL()
}

function makeCircleImage (stringInput) {
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
