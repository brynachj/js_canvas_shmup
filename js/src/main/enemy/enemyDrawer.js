var drawModule = require('../draw.js')
var constants = require('../shared/constants.js')

/* global Image */

let enemySprite = new Image()
enemySprite.src = 'images/wall_and_enemy.png'

let attackSpriteLeft = new Image()
attackSpriteLeft.src = 'images/enemy_sword_left.png'
let attackSpriteRight = new Image()
attackSpriteRight.src = 'images/enemy_sword_right.png'
let attackSpriteUp = new Image()
attackSpriteUp.src = 'images/enemy_sword_up.png'
let attackSpriteDown = new Image()
attackSpriteDown.src = 'images/enemy_sword_down.png'

function drawIdle (enemy) {
  drawModule.drawRectangle(enemy, '#708090', drawModule.ctx)
  if (window.drawHitboxes) {
    drawModule.drawHitbox(enemy.player_detection_box, drawModule.ctx)
    drawModule.drawHitbox(enemy.player_aggro_box, drawModule.ctx)
    drawModule.drawHitbox(enemy.player_attack_box, drawModule.ctx)
  }
}

function drawWindUpAttack (enemy) {
  drawIdle(enemy)
  if (enemy.facing === constants.LEFT) {
    drawModule.drawSprite(attackSpriteLeft, {x: enemy.x, y: enemy.y + enemy.h / 2}, drawModule.ctx)
  }
  if (enemy.facing === constants.RIGHT) {
    drawModule.drawSprite(attackSpriteRight, {x: enemy.x, y: enemy.y + enemy.h / 2}, drawModule.ctx)
  }
  if (enemy.facing === constants.UP) {
    drawModule.drawSprite(attackSpriteUp, {x: enemy.x + enemy.w / 2, y: enemy.y}, drawModule.ctx)
  }
  if (enemy.facing === constants.DOWN) {
    drawModule.drawSprite(attackSpriteDown, {x: enemy.x + enemy.w / 2, y: enemy.y}, drawModule.ctx)
  }
}

function drawAttacking (enemy) {
  drawIdle(enemy)
  if (enemy.facing === constants.LEFT) {
    drawModule.drawSprite(attackSpriteLeft, {x: enemy.x - 30, y: enemy.y + enemy.h / 2}, drawModule.ctx)
  }
  if (enemy.facing === constants.RIGHT) {
    drawModule.drawSprite(attackSpriteRight, {x: enemy.x + 30, y: enemy.y + enemy.h / 2}, drawModule.ctx)
  }
  if (enemy.facing === constants.UP) {
    drawModule.drawSprite(attackSpriteUp, {x: enemy.x + enemy.w / 2, y: enemy.y - 30}, drawModule.ctx)
  }
  if (enemy.facing === constants.DOWN) {
    drawModule.drawSprite(attackSpriteDown, {x: enemy.x + enemy.w / 2, y: enemy.y + 30}, drawModule.ctx)
  }
}

function drawWindDownAttack (enemy) {
  drawIdle(enemy)
}

module.exports = {
  drawIdle,
  drawWindUpAttack,
  drawAttacking,
  drawWindDownAttack
}
