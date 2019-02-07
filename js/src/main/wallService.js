var utilityModule = require('./shared/utility.js')
var constants = require('./shared/constants.js')
var drawService = require('./draw.js')

/* global Image */

let walls = []
let wallSprite = new Image()
wallSprite.src = 'images/wall_and_enemy.png'

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
  walls.forEach(wall => drawService.drawSprite(wallSprite, wall, drawService.ctx))
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
  wallSprite,
  removeAllWalls
}
