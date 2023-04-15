const canv = document.querySelector("canvas")
const canvCtx = canv.getContext("2d")

const canvasWidth = 200
const canvasHeight = 200

canvCtx.canvas.width = canvasWidth
canvCtx.canvas.height = canvasHeight

const unit = 25
const numSquaresX = 8
const numSquaresY = 8
const square = {
  w: 25,
  h: 25
};

let squareNumber = 0

let grid = []

const walls = [
  0, 1, 2, 3, 4, 6, 7, 8, 15, 16, 18, 19, 20, 21, 23, 24, 26, 28, 31, 32, 34, 36, 37,
  39, 40, 42, 44, 47, 48, 55, 56, 57, 58, 59, 60, 61, 62, 63
]

drawGrid()

canv.addEventListener('click', handleGridClick)

function drawGrid() {

  // Reset canvas
  grid = []
  squareNumber = 0
  canvCtx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Draw grid
  for (let i = 0; i < numSquaresY; i++) {
    for (let j = 0; j < numSquaresX; j++) {

      // Draw empty squares
      canvCtx.beginPath()
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

      grid.push({
        squareNumber,
        tlCoord: {
          x: unit * j,
          y: unit * i
        },
        trCoord: {
          x: unit * j + unit,
          y: unit * i
        },
        blCoord: {
          x: unit * j,
          y: unit * i + unit
        },
        brCoord: {
          x: unit * j + unit,
          y: unit * i + unit,
        }
      })
      squareNumber += 1;
    }
  }
}

function handleGridClick(e) {


  let x = e.offsetX
  let y = e.offsetY

  const clickedSquare = grid.find(({ blCoord, brCoord, tlCoord, trCoord }) => {
    return tlCoord.x <= x
      && blCoord.x <= x
      && tlCoord.y <= y
      && trCoord.y <= y
      && trCoord.x >= x
      && brCoord.x >= x
      && blCoord.y >= y
      && brCoord.y >= y
  })

  if (walls.includes(clickedSquare.squareNumber)) return
  drawGrid()

  // Fill clicked square
  canvCtx.beginPath()
  canvCtx.fillStyle = 'black'
  canvCtx.arc(clickedSquare.blCoord.x + square.w / 2, clickedSquare.blCoord.y - square.h / 2, square.w / 2, 0, 2 * Math.PI)
  canvCtx.fill()

}