var drawModule = require('./draw.js')
var utilityModule = require('./utility.js')

const WIDTH = 4
const HEIGHT = 5

/* global Image */

let pebbleSprite = new Image()
pebbleSprite.src = 'images/pebble.png'

var pebbles = []
var ammo = 10

function getAmmo () {
  return ammo
}

function takeOneFromAmmo () {
  ammo--
}

function resetPebbleAmmo () {
  ammo = 10
}

function addToAmmo (i) {
  ammo += i
}

function addToPebbles (x, y) {
  pebbles.push(createPebble(x, y))
}

function removeFromPebbles (pebble) {
  var index = pebbles.map(p => p.id).indexOf(pebble.id)
  pebbles.splice(index, 1)
}

function createPebble (x1, y1) {
  return {id: utilityModule.newId(pebbles), x: x1, y: y1, w: WIDTH, h: HEIGHT, hitBoxColor: '#00bfff'}
}

function moveOnScreenPebbles () {
  pebbles.map(pebble => movePebble(pebble))
}

function movePebble (pebble) {
  if (pebble.x < 600 + pebbleSprite.width) {
    pebble.x += 10
  } else {
    removeFromPebbles(pebble)
  }
}

function drawOnScreenPebble (ctx) {
  if (pebbles.length) {
    pebbles.map(pebble => drawModule.drawSprite(pebbleSprite, pebble, ctx))
  }
}

module.exports = {
  pebbles,
  createPebble,
  moveOnScreenPebbles,
  drawOnScreenPebble,
  addToPebbles,
  removeFromPebbles,
  resetPebbleAmmo,
  takeOneFromAmmo,
  addToAmmo,
  getAmmo
}
