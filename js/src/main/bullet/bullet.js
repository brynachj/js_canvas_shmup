var drawModule = require('../draw.js')
var utilityModule = require('../shared/utility.js')
var constants = require('../shared/constants.js')

const WIDTH = 4
const HEIGHT = 4

const BULLET_COLOUR = '#FFFFFF'

var bullets = []
var ammo = 10

function getAmmo () {
  return ammo
}

function takeOneFromAmmo () {
  ammo--
}

function resetBulletAmmo () {
  ammo = 10
}

function addToAmmo (i) {
  ammo += i
}

function addToBullets (character) {
  bullets.push(createBullet(character))
}

function removeFromBullets (bullet) {
  var index = bullets.map(p => p.id).indexOf(bullet.id)
  bullets.splice(index, 1)
}

function createBullet (character) {
  return {id: utilityModule.newId(bullets), x: character.x + (character.w / 2) - 2, y: character.y + (character.h / 2) - 2, w: WIDTH, h: HEIGHT, direction: character.facing, hitBoxColor: '#00bfff'}
}

function moveOnScreenBullets () {
  bullets.map(bullet => moveBullet(bullet))
}

function moveBullet (bullet) {
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
    removeFromBullets(bullet)
  }
}

function drawOnScreenBullet (ctx) {
  if (bullets.length) {
    bullets.map(bullet => drawModule.drawRectangle(bullet, BULLET_COLOUR, ctx))
  }
}

module.exports = {
  bullets,
  createBullet,
  moveOnScreenBullets,
  drawOnScreenBullet,
  addToBullets,
  removeFromBullets,
  resetBulletAmmo,
  takeOneFromAmmo,
  addToAmmo,
  getAmmo
}
