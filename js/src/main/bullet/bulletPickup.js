var drawModule = require('../draw.js')
var utilityModule = require('../shared/utility.js')

const WIDTH = 10
const HEIGHT = 13

const BULLET_PICKUP_COLOUR = '#FFFFFF'

var bulletPickups = []

function addToPebblePickups (x, y) {
  bulletPickups.push(createPebblePickup(x, y))
}

function removeFromPebblePickups (pickup) {
  var index = bulletPickups.map(p => p.id).indexOf(pickup.id)
  bulletPickups.splice(index, 1)
}

function createPebblePickup (x1, y1) {
  return {id: utilityModule.newId(bulletPickups), x: x1, y: y1 + 13, w: WIDTH, h: HEIGHT, hitBoxColor: '#00bfff'}
}

function drawPebblePickup (ctx) {
  for (var i = 0; i < bulletPickups.length; i++) {
    drawModule.drawCircle(bulletPickups[i], BULLET_PICKUP_COLOUR, ctx)
  }
}

module.exports = {
  createPebblePickup,
  drawPebblePickup,
  addToPebblePickups,
  bulletPickups,
  removeFromPebblePickups
}
