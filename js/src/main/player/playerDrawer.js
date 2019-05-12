var drawModule = require('../draw.js')
var constants = require('../shared/constants.js')

var playerColor = 'rgb(255, 255, 255)'
var playerAttackColor = 'rgb(20, 180, 20)'

let attackSpriteWidth = 15
let attackSpriteHeight = 35

function drawAttacking (player) {
  if (player.facing === constants.RIGHT) { drawModule.drawRectangle({ x: player.x + 15, y: player.y - 5, w: attackSpriteWidth, h: attackSpriteHeight }, playerAttackColor, drawModule.ctx) }
  if (player.facing === constants.LEFT) { drawModule.drawRectangle({ x: player.x - 15, y: player.y - 5, w: attackSpriteWidth, h: attackSpriteHeight }, playerAttackColor, drawModule.ctx) }
  if (player.facing === constants.UP) { drawModule.drawRectangle({ x: player.x - 10, y: player.y - 15, w: attackSpriteHeight, h: attackSpriteWidth }, playerAttackColor, drawModule.ctx) }
  if (player.facing === constants.DOWN) { drawModule.drawRectangle({ x: player.x - 10, y: player.y + 25, w: attackSpriteHeight, h: attackSpriteWidth }, playerAttackColor, drawModule.ctx) }
}

function drawWindUpAttack (player) {
  drawModule.drawRectangle({ x: player.x, y: player.y - 5, w: attackSpriteWidth, h: attackSpriteHeight }, playerAttackColor, drawModule.ctx)
}

function drawPlayer (player) {
  drawModule.drawRectangle(player, getPlayerColor(), drawModule.ctx)
  if (window.drawHitboxes) {
    drawModule.drawHitbox(player.attack_box, drawModule.ctx)
  }
}

function getPlayerColor () {
  return playerColor
}

function setPlayerColor (newColor) {
  playerColor = newColor
}

module.exports = {
  drawPlayer,
  drawAttacking,
  drawWindUpAttack,
  setPlayerColor
}
