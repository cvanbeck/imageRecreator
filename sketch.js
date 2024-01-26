let img
let recreatedImg
let backgroundToggle
let saveList = []
let differenceList


function preload() {
    img = loadImage('exampleImg.png')
}

function setup() {
    createCanvas(img.width, img.height)
    noStroke()
    image(img, 0, 0)
    img.loadPixels()
    clear()
    // Saves image pixel data for comparison later

    // Sets up button to toggle the image we are recreating to be visibile or not
    backgroundToggle = createButton('Toggle BG', 1)
    backgroundToggle.mousePressed(() => {
        let currentValue = parseInt(backgroundToggle.value())
        backgroundToggle.value(currentValue ? 0 : 1)
    })
}

function draw() {


    let shapeInfo = saveLowest(50)
    fill(shapeInfo[0])
    rect(shapeInfo[1], shapeInfo[2], shapeInfo[3], shapeInfo[4])

    loadPixels()

}

const compareDifference = () => {
    // Loops through both the current image and the image we are recreating
    // to compare the differences.
    let difference = 0
    let comparisonPixels = img.pixels
/*    for(i = 0; i < 800*800 ; i += 4){
        let compareRed = abs(comparisonPixels[i] - pixels[i])
        let compareGreen = abs(comparisonPixels[i] - pixels[i])
        let compareBlue = abs(comparisonPixels[i] - pixels[i])

            //console.log('TARGET', comparisonPixels[i], 'CURRENT', pixels[i], 'DIFFERENCE', compareRed)
         difference += compareRed + compareBlue + compareGreen
        }
        
        return difference
*/
    for(x = 0; x < width; x++){
        for(y = 0; y < height; y++){
            let colourAtCurrent = img.get(x, y)

            let greyscale = (colourAtCurrent[0] + colourAtCurrent[1] + colourAtCurrent[2]) / 3
            let colour = get(x, y)

            let colourGreyscale = (colour[0] + colour[1] + colour[2]) / 3
            difference += abs(greyscale - colourGreyscale)
        }
    }
    return difference
    }

const drawRandomSquare = () => {
    let fillRed = random(1, 255)
    let xPos = random(1, width)
    let yPos = random(1, height)
    let widthSize = random(1, width)
    let heightSize = random(1, height)
    fill(fillRed)
    rect(xPos, yPos, widthSize, heightSize)
    return [fillRed, xPos, yPos, widthSize, heightSize]
}

const saveLowest = (times) => {
    let lowest = 9999999999
    let savedShape
    loadPixels()
    for(let i = 0; i < times; i++){
        let currentShape = drawRandomSquare()
        let difference = compareDifference()
        if (difference < lowest){
            lowest = difference
            savedShape = currentShape

        }
        updatePixels()

    }
    return savedShape
}