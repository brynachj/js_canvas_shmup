var drawModule = require('../draw.js')
var constants = require('../shared/constants.js')

var playerColor = 'rgb(255, 255, 255)'

/* global Image */

let attackSpriteHorizontal = new Image()
attackSpriteHorizontal.src = 'images/player_attack_horizontal.png'
let attackSpriteVertical = new Image()
attackSpriteVertical.src = 'images/player_attack_vertical.png'

function drawAttacking (player) {
  if (player.facing === constants.RIGHT) { drawModule.drawSprite(attackSpriteHorizontal, { x: player.x + 15, y: player.y - 5 }, drawModule.ctx) }
  if (player.facing === constants.LEFT) { drawModule.drawSprite(attackSpriteHorizontal, { x: player.x - 15, y: player.y - 5 }, drawModule.ctx) }
  if (player.facing === constants.UP) { drawModule.drawSprite(attackSpriteVertical, { x: player.x - 10, y: player.y - 15 }, drawModule.ctx) }
  if (player.facing === constants.DOWN) { drawModule.drawSprite(attackSpriteVertical, { x: player.x - 10, y: player.y + 25 }, drawModule.ctx) }
}

function drawWindUpAttack (player) {
  if (player.facing === constants.RIGHT) { drawModule.drawSprite(attackSpriteHorizontal, { x: player.x, y: player.y - 5 }, drawModule.ctx) }
  if (player.facing === constants.LEFT) { drawModule.drawSprite(attackSpriteHorizontal, { x: player.x, y: player.y - 5 }, drawModule.ctx) }
  if (player.facing === constants.UP) { drawModule.drawSprite(attackSpriteHorizontal, { x: player.x, y: player.y - 5 }, drawModule.ctx) }
  if (player.facing === constants.DOWN) { drawModule.drawSprite(attackSpriteHorizontal, { x: player.x, y: player.y - 5 }, drawModule.ctx) }
}

function drawPlayer (player) {
  // drawModule.drawSprite(playerSprite, player, drawModule.ctx)
  drawModule.drawRectangle(player, getPlayerColor(), drawModule.ctx)
  if (window.drawHitboxes) {
    drawModule.drawHitbox(player.attack_box, drawModule.ctx)
  }
}

function getPlayerColor () {
  return playerColor
}

function setPlayerColor () {
  return playerColor
}

module.exports = {
  drawPlayer,
  drawAttacking,
  drawWindUpAttack,
  setPlayerColor
}
