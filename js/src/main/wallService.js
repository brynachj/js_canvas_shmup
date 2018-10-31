var utilityModule = require('./utility.js')
var constants = require('./constants.js')
var drawService = require('./draw.js')

let walls = []
let wallSprite = new Image()
wallSprite.src = 'images/wall.png'

function addWall (xArg, yArg) {
  walls.push({
    id: utilityModule.newId(walls),
    x: xArg,
    y: yArg,
    w: constants.WALL_WIDTH,
    h: constants.WALL_HEIGHT
  })
}

function updateWalls () {
  walls.forEach(wall => drawService.drawSprite(wallSprite, wall, drawService.ctx))
}

function getWalls () {
  return walls
}

module.exports = {
  addWall,
  getWalls,
  updateWalls,
  wallSprite
}
