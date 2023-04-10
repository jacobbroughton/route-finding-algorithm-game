const canv = document.querySelector("canvas")
const canvCtx = canv.getContext("2d")

const unit = 25
const numSquaresX = 8
const numSquaresY = 8
const square = {
  w: 25,
  h: 25
};

let squareNumber = 1

const walls = [
  1, 2, 3, 4, 5, 7, 8, 9, 16, 17, 19, 20, 21, 22, 24, 25, 27, 29, 32, 33, 35, 37, 38,
  40, 41, 43, 45, 48, 49, 56, 57, 58, 59, 60, 61, 62, 63, 64
]

// Draw grid
for (let i = 0; i < numSquaresY; i++) {
  for (let j = 0; j < numSquaresX; j++) {

    // Draw empty squares
    canvCtx.rect(unit * j, unit * i, square.w, square.h)
    canvCtx.strokeStyle = 'grey'
    canvCtx.stroke()

    // Draw walls
    if (walls.includes(squareNumber)) {
      canvCtx.fillStyle = 'lightgrey'
      canvCtx.fillRect(unit * j, unit * i, square.w, square.h)
    }

    // Write unit number
    canvCtx.fillStyle = 'black'
    canvCtx.font = '12px Arial'
    canvCtx.fillText(`${squareNumber}`, unit * j, unit + unit * i)


    squareNumber += 1;
  }
}
