var utilityModule = require('./utility.js')
var constants = require('./constants.js')

let walls = []

function addWall (xArg, yArg) {
  walls.push({
    id: utilityModule.newId(walls),
    x: xArg,
    y: yArg,
    w: constants.WALL_WIDTH,
    h: constants.WALL_HEIGHT
  })
}

function getWalls () {
  return walls
}

module.exports = {
  addWall,
  getWalls
}
