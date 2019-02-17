var drawModule = require('../draw.js')
var utilityModule = require('../shared/utility.js')
var constants = require('../shared/constants.js')

const WIDTH = 4
const HEIGHT = 4

const PEBBLE_COLOUR = '#FFFFFF'

var bullets = []
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
  bullets.push(createPebble(character))
}

function removeFromPebbles (bullet) {
  var index = bullets.map(p => p.id).indexOf(bullet.id)
  bullets.splice(index, 1)
}

function createPebble (character) {
  return {id: utilityModule.newId(bullets), x: character.x, y: character.y, w: WIDTH, h: HEIGHT, direction: character.facing, hitBoxColor: '#00bfff'}
}

function moveOnScreenPebbles () {
  bullets.map(bullet => movePebble(bullet))
}

function movePebble (bullet) {
  switch (bullet.direction) {
    case constants.RIGHT:
      bullet.x += 10
      break
    case constants.LEFT:
      bullet.x -= 10
      break
    case constants.DOWN:
      bullet.y += 10
      break
    case constants.UP:
      bullet.y -= 10
      break
  }
  if (bullet.x > constants.CANVAS_WIDTH + WIDTH || bullet.x < 0 || bullet.y > constants.CANVAS_HEIGHT || bullet.y < 0) {
    removeFromPebbles(bullet)
  }
}

function drawOnScreenPebble (ctx) {
  if (bullets.length) {
    bullets.map(bullet => drawModule.drawRectangle(bullet, PEBBLE_COLOUR, ctx))
  }
}

module.exports = {
  bullets,
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
