var drawModule = require('../draw.js')
var constants = require('../shared/constants.js')

const ENEMY_ATTACK_COLOUR = '#FF0000'

function drawIdle (enemy) {
  drawModule.drawRectangle(enemy, '#141414', drawModule.ctx)
  if (window.drawHitboxes) {
    drawModule.drawHitbox(enemy.player_detection_box, drawModule.ctx)
    drawModule.drawHitbox(enemy.player_aggro_box, drawModule.ctx)
    drawModule.drawHitbox(enemy.player_attack_box, drawModule.ctx)
  }
}

function drawWindUpAttack (enemy) {
  drawIdle(enemy)
  if (enemy.facing === constants.LEFT) {
    drawModule.drawRectangle({x: enemy.x, y: enemy.y + enemy.h / 2 - 5, w: 30, h: 10}, ENEMY_ATTACK_COLOUR, drawModule.ctx)
  }
  if (enemy.facing === constants.RIGHT) {
    drawModule.drawRectangle({x: enemy.x, y: enemy.y + enemy.h / 2 - 5, w: 30, h: 10}, ENEMY_ATTACK_COLOUR, drawModule.ctx)
  }
  if (enemy.facing === constants.UP) {
    drawModule.drawRectangle({x: enemy.x + enemy.w / 2 - 5, y: enemy.y, w: 10, h: 30}, ENEMY_ATTACK_COLOUR, drawModule.ctx)
  }
  if (enemy.facing === constants.DOWN) {
    drawModule.drawRectangle({x: enemy.x + enemy.w / 2 - 5, y: enemy.y, w: 10, h: 30}, ENEMY_ATTACK_COLOUR, drawModule.ctx)
  }
}

function drawAttacking (enemy) {
  drawIdle(enemy)
  if (enemy.facing === constants.LEFT) {
    drawModule.drawRectangle({x: enemy.x - 30, y: enemy.y + enemy.h / 2 - 5, w: 30, h: 10}, ENEMY_ATTACK_COLOUR, drawModule.ctx)
  }
  if (enemy.facing === constants.RIGHT) {
    drawModule.drawRectangle({x: enemy.x + 30, y: enemy.y + enemy.h / 2 - 5, w: 30, h: 10}, ENEMY_ATTACK_COLOUR, drawModule.ctx)
  }
  if (enemy.facing === constants.UP) {
    drawModule.drawRectangle({x: enemy.x + enemy.w / 2 - 5, y: enemy.y - 30, w: 10, h: 30}, ENEMY_ATTACK_COLOUR, drawModule.ctx)
  }
  if (enemy.facing === constants.DOWN) {
    drawModule.drawRectangle({x: enemy.x + enemy.w / 2 - 5, y: enemy.y + 30, w: 10, h: 30}, ENEMY_ATTACK_COLOUR, drawModule.ctx)
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
