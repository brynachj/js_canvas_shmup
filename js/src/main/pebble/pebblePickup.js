var drawModule = require('../draw.js')
var utilityModule = require('../shared/utility.js')

const WIDTH = 10
const HEIGHT = 13

/* global Image */

let pebblePickupSprite = new Image()
pebblePickupSprite.src = 'images/pebble_pickup.png'

var pebblePickups = []

function addToPebblePickups (x, y) {
  pebblePickups.push(createPebblePickup(x, y))
}

function removeFromPebblePickups (pickup) {
  var index = pebblePickups.map(p => p.id).indexOf(pickup.id)
  pebblePickups.splice(index, 1)
}

function createPebblePickup (x1, y1) {
  return {id: utilityModule.newId(pebblePickups), x: x1, y: y1 + 13, w: WIDTH, h: HEIGHT, hitBoxColor: '#00bfff'}
}

function drawPebblePickup (ctx) {
  for (var i = 0; i < pebblePickups.length; i++) {
    drawModule.drawSprite(pebblePickupSprite, pebblePickups[i], ctx)
  }
}

module.exports = {
  createPebblePickup,
  drawPebblePickup,
  addToPebblePickups,
  pebblePickups,
  removeFromPebblePickups
}
