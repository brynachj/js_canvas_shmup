var drawModule = require('./draw.js')

const UP = 'up'
const DOWN = 'down'
const LEFT = 'left'
const RIGHT = 'right'

/* global Image */

let enemySpriteLeft = new Image()
enemySpriteLeft.src = 'images/enemy_sprite_left.png'
let enemySpriteRight = new Image()
enemySpriteRight.src = 'images/enemy_sprite_right.png'
let enemySpriteUp = new Image()
enemySpriteUp.src = 'images/enemy_sprite_up.png'
let enemySpriteDown = new Image()
enemySpriteDown.src = 'images/enemy_sprite_down.png'

let attackSpriteLeft = new Image()
attackSpriteLeft.src = 'images/enemy_sword_left.png'
let attackSpriteRight = new Image()
attackSpriteRight.src = 'images/enemy_sword_right.png'
let attackSpriteUp = new Image()
attackSpriteUp.src = 'images/enemy_sword_up.png'
let attackSpriteDown = new Image()
attackSpriteDown.src = 'images/enemy_sword_down.png'

function drawIdle (enemy) {
  if (enemy.facing === LEFT) {
    drawModule.drawSprite(enemySpriteLeft, enemy, drawModule.ctx)
  }
  if (enemy.facing === RIGHT) {
    drawModule.drawSprite(enemySpriteRight, enemy, drawModule.ctx)
  }
  if (enemy.facing === UP) {
    drawModule.drawSprite(enemySpriteUp, enemy, drawModule.ctx)
  }
  if (enemy.facing === DOWN) {
    drawModule.drawSprite(enemySpriteDown, enemy, drawModule.ctx)
  }
  if (window.drawHitboxes) {
    drawModule.drawHitbox(enemy.player_detection_box, drawModule.ctx)
    drawModule.drawHitbox(enemy.player_aggro_box, drawModule.ctx)
    drawModule.drawHitbox(enemy.player_attack_box, drawModule.ctx)
  }
}

function drawWindUpAttack (enemy) {
  drawIdle(enemy)
  if (enemy.facing === LEFT) {
    drawModule.drawSprite(attackSpriteLeft, {x: enemy.x, y: enemy.y + enemy.h / 2}, drawModule.ctx)
  }
  if (enemy.facing === RIGHT) {
    drawModule.drawSprite(attackSpriteRight, {x: enemy.x, y: enemy.y + enemy.h / 2}, drawModule.ctx)
  }
  if (enemy.facing === UP) {
    drawModule.drawSprite(attackSpriteUp, {x: enemy.x + enemy.w / 2, y: enemy.y}, drawModule.ctx)
  }
  if (enemy.facing === DOWN) {
    drawModule.drawSprite(attackSpriteDown, {x: enemy.x + enemy.w / 2, y: enemy.y}, drawModule.ctx)
  }
}

function drawAttacking (enemy) {
  drawIdle(enemy)
  if (enemy.facing === LEFT) {
    drawModule.drawSprite(attackSpriteLeft, {x: enemy.x - 30, y: enemy.y + enemy.h / 2}, drawModule.ctx)
  }
  if (enemy.facing === RIGHT) {
    drawModule.drawSprite(attackSpriteRight, {x: enemy.x + 30, y: enemy.y + enemy.h / 2}, drawModule.ctx)
  }
  if (enemy.facing === UP) {
    drawModule.drawSprite(attackSpriteUp, {x: enemy.x + enemy.w / 2, y: enemy.y - 30}, drawModule.ctx)
  }
  if (enemy.facing === DOWN) {
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
