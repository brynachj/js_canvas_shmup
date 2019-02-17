var drawModule = require('../draw.js')
var utilityModule = require('../shared/utility.js')

const WIDTH = 10
const HEIGHT = 13

const BULLET_PICKUP_COLOUR = '#FFFFFF'

var bulletPickups = []

function addToBulletPickups (x, y) {
  bulletPickups.push(createBulletPickup(x, y))
}

function removeFromBulletPickups (pickup) {
  var index = bulletPickups.map(p => p.id).indexOf(pickup.id)
  bulletPickups.splice(index, 1)
}

function createBulletPickup (x1, y1) {
  return {id: utilityModule.newId(bulletPickups), x: x1, y: y1 + 13, w: WIDTH, h: HEIGHT, hitBoxColor: '#00bfff'}
}

function drawBulletPickup (ctx) {
  for (var i = 0; i < bulletPickups.length; i++) {
    drawModule.drawCircle(bulletPickups[i], BULLET_PICKUP_COLOUR, ctx)
  }
}

module.exports = {
  createBulletPickup,
  drawBulletPickup,
  addToBulletPickups,
  bulletPickups,
  removeFromBulletPickups
}
