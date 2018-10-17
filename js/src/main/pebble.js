var drawModule = require('./draw.js')
var utilityModule = require('./utility.js')
var constants = require('./constants.js')

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

function addToPebbles (character) {
  pebbles.push(createPebble(character))
}

function removeFromPebbles (pebble) {
  var index = pebbles.map(p => p.id).indexOf(pebble.id)
  pebbles.splice(index, 1)
}

function createPebble (character) {
  return {id: utilityModule.newId(pebbles), x: character.x, y: character.y, w: WIDTH, h: HEIGHT, direction: character.facing, hitBoxColor: '#00bfff'}
}

function moveOnScreenPebbles () {
  pebbles.map(pebble => movePebble(pebble))
}

function movePebble (pebble) {
  switch (pebble.direction) {
    case constants.RIGHT:
      pebble.x += 10
      break
    case constants.LEFT:
      pebble.x -= 10
      break
    case constants.DOWN:
      pebble.y += 10
      break
    case constants.UP:
      pebble.y -= 10
      break
  }
  if (pebble.x > constants.CANVAS_WIDTH + pebbleSprite.width || pebble.x < 0 || pebble.y > constants.CANVAS_HEIGHT || pebble.y < 0) {
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
