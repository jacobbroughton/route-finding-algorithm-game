const canv = document.querySelector("canvas")
const canvCtx = canv.getContext("2d")

const canvasWidth = 200
const canvasHeight = 200

canvCtx.canvas.width = canvasWidth
canvCtx.canvas.height = canvasHeight

const startingPositionId = 25
const unit = 25
const numSquaresX = 8
const numSquaresY = 8
const square = {
  w: 25,
  h: 25
};

let squareId = 0

let grid = []

const walls = [
  0, 1, 2, 3, 4, 6, 7, 8, 15, 16, 18, 19, 20, 21, 23, 24, 26, 28, 31, 32, 34, 36, 37,
  39, 40, 42, 44, 47, 48, 55, 56, 57, 58, 59, 60, 61, 62, 63
]

drawGrid()

drawCharacterStartPosition()

canv.addEventListener('click', handleGridClick)

function drawGrid() {
  // Reset canvas
  grid = []
  squareId = 0
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
      if (walls.includes(squareId)) {
        canvCtx.fillStyle = 'lightgrey'
        canvCtx.fillRect(unit * j, unit * i, square.w, square.h)
      }

      // Write unit number
      canvCtx.fillStyle = 'black'
      canvCtx.font = '12px Arial'
      canvCtx.fillText(`${squareId}`, unit * j, unit + unit * i)

      grid.push({
        squareId,
        coords: {
          tl: {
            x: unit * j,
            y: unit * i
          },
          tr: {
            x: unit * j + unit,
            y: unit * i
          },
          bl: {
            x: unit * j,
            y: unit * i + unit
          },
          br: {
            x: unit * j + unit,
            y: unit * i + unit,
          }
        }
      })
      squareId += 1;
    }
  }
}

function drawCharacterStartPosition() {
  // Draw character
  const startingPosition = grid.find(gridItem => gridItem.squareId === startingPositionId)
  canvCtx.beginPath()
  canvCtx.arc(startingPosition.coords.bl.x + square.w / 2, startingPosition.coords.bl.y - square.h / 2, square.w / 2, 0, 2 * Math.PI)
  canvCtx.fill()

}

function handleGridClick(e) {
  let x = e.offsetX
  let y = e.offsetY

  const clickedSquare = grid.find(({ coords }) => {
    return coords.tl.x <= x
      && coords.bl.x <= x
      && coords.tl.y <= y
      && coords.tr.y <= y
      && coords.tr.x >= x
      && coords.br.x >= x
      && coords.bl.y >= y
      && coords.br.y >= y
  })

  if (walls.includes(clickedSquare.squareId)) return

  drawGrid()

  // Draw goal
  canvCtx.beginPath()
  canvCtx.fillStyle = '#FFC8C8'
  canvCtx.fillRect(clickedSquare.coords.bl.x, clickedSquare.coords.bl.y - square.h, square.w, square.h)
  canvCtx.fillStyle = '#181818'
  canvCtx.fillText('Goal', clickedSquare.coords.bl.x + 3, clickedSquare.coords.bl.y - square.h + 12, square.w - 6)
}