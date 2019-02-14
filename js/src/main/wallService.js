var utilityModule = require('./shared/utility.js')
var constants = require('./shared/constants.js')
var drawService = require('./draw.js')

let walls = []

function addWall (xArg, yArg) {
  let xCoord = Math.floor(xArg / 30) * 30
  let yCoord = Math.floor(yArg / 30) * 30
  walls.push({
    id: utilityModule.newId(walls),
    x: xCoord,
    y: yCoord,
    w: constants.WALL_WIDTH,
    h: constants.WALL_HEIGHT
  })
}

function updateWalls () {
  walls.forEach(wall => drawService.drawRectangle(wall, '#141414', drawService.ctx))
}

function getWalls () {
  return walls
}

function removeAllWalls () {
  walls = []
}

module.exports = {
  addWall,
  getWalls,
  updateWalls,
  removeAllWalls
}
