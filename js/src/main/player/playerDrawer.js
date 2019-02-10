var drawModule = require('../draw.js')
var constants = require('../shared/constants.js')

/* global Image */

let playerSprite = new Image()
playerSprite.src = 'images/player.png'

let attackSprite = new Image()
attackSprite.src = 'images/player_attack.png'

function drawAttacking (player) {
  if (player.facing === constants.RIGHT) { drawModule.drawSprite(attackSprite, { x: player.x + 15, y: player.y - 5 }, drawModule.ctx) }
  if (player.facing === constants.LEFT) { drawModule.drawSprite(attackSprite, { x: player.x - 15, y: player.y - 5 }, drawModule.ctx) }
  if (player.facing === constants.UP) { drawModule.drawSprite(attackSprite, { x: player.x, y: player.y - 15 }, drawModule.ctx) }
  if (player.facing === constants.DOWN) { drawModule.drawSprite(attackSprite, { x: player.x, y: player.y + 5 }, drawModule.ctx) }
}

function drawWindUpAttack (player) {
  if (player.facing === constants.RIGHT) { drawModule.drawSprite(attackSprite, { x: player.x, y: player.y - 5 }, drawModule.ctx) }
  if (player.facing === constants.LEFT) { drawModule.drawSprite(attackSprite, { x: player.x, y: player.y - 5 }, drawModule.ctx) }
  if (player.facing === constants.UP) { drawModule.drawSprite(attackSprite, { x: player.x, y: player.y - 5 }, drawModule.ctx) }
  if (player.facing === constants.DOWN) { drawModule.drawSprite(attackSprite, { x: player.x, y: player.y - 5 }, drawModule.ctx) }
}

function drawPlayer (player) {
  drawModule.drawSprite(playerSprite, player, drawModule.ctx)
  if (window.drawHitboxes) {
    drawModule.drawHitbox(player.attack_box, drawModule.ctx)
  }
}

module.exports = {
  drawPlayer,
  drawAttacking,
  drawWindUpAttack
}
