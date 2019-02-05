var drawModule = require('../draw.js')
var constants = require('../shared/constants.js')

/* global Image */

let playerSpriteRight = new Image()
playerSpriteRight.src = 'images/player_sprite_right.png'
let playerSpriteLeft = new Image()
playerSpriteLeft.src = 'images/player_sprite_left.png'
let playerSpriteUp = new Image()
playerSpriteUp.src = 'images/player_sprite_up.png'
let playerSpriteDown = new Image()
playerSpriteDown.src = 'images/player_sprite_down.png'

let attackSpriteLeft = new Image()
attackSpriteLeft.src = 'images/enemy_sword_left.png'
let attackSpriteRight = new Image()
attackSpriteRight.src = 'images/enemy_sword_right.png'
let attackSpriteUp = new Image()
attackSpriteUp.src = 'images/enemy_sword_up.png'
let attackSpriteDown = new Image()
attackSpriteDown.src = 'images/enemy_sword_down.png'

function drawAttacking (player) {
  if (player.facing === constants.RIGHT) { drawModule.drawSprite(attackSpriteRight, { x: player.x + 30, y: player.y + player.h / 2 }, drawModule.ctx) }
  if (player.facing === constants.LEFT) { drawModule.drawSprite(attackSpriteLeft, { x: player.x - 30, y: player.y + player.h / 2 }, drawModule.ctx) }
  if (player.facing === constants.UP) { drawModule.drawSprite(attackSpriteUp, { x: player.x + player.w / 2, y: player.y - 30 }, drawModule.ctx) }
  if (player.facing === constants.DOWN) { drawModule.drawSprite(attackSpriteDown, { x: player.x + player.w / 2, y: player.y + 30 }, drawModule.ctx) }
}

function drawWindUpAttack (player) {
  if (player.facing === constants.RIGHT) { drawModule.drawSprite(attackSpriteRight, { x: player.x, y: player.y + player.h / 2 }, drawModule.ctx) }
  if (player.facing === constants.LEFT) { drawModule.drawSprite(attackSpriteLeft, { x: player.x, y: player.y + player.h / 2 }, drawModule.ctx) }
  if (player.facing === constants.UP) { drawModule.drawSprite(attackSpriteUp, { x: player.x + player.w / 2, y: player.y }, drawModule.ctx) }
  if (player.facing === constants.DOWN) { drawModule.drawSprite(attackSpriteDown, { x: player.x + player.w / 2, y: player.y }, drawModule.ctx) }
}

function drawPlayer (player) {
  if (player.facing === constants.RIGHT) {
    drawModule.drawSprite(playerSpriteRight, player, drawModule.ctx)
  }
  if (player.facing === constants.LEFT) {
    drawModule.drawSprite(playerSpriteLeft, player, drawModule.ctx)
  }
  if (player.facing === constants.DOWN) {
    drawModule.drawSprite(playerSpriteDown, player, drawModule.ctx)
  }
  if (player.facing === constants.UP) {
    drawModule.drawSprite(playerSpriteUp, player, drawModule.ctx)
  }
  if (window.drawHitboxes) {
    drawModule.drawHitbox(player.attack_box, drawModule.ctx)
  }
}

module.exports = {
  drawPlayer,
  drawAttacking,
  drawWindUpAttack
}
