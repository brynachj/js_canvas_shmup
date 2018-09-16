var playerModule = require('../player.js')
var enemyDrawer = require('./enemyDrawer.js')
var collisionDetectionModule = require('../collisionDetection.js')

function attack (enemy) {
  let animationFrame = enemy.attackAnimationFrame
  switch (true) {
    case animationFrame < 10:
      windingUp(enemy)
      break
    case animationFrame < 20:
      attacking(enemy)
      break
    case animationFrame < 29:
      windingDown(enemy)
      break
    case animationFrame === 29:
      windingDown(enemy)
      enemy.attacking = false
      enemy.hitPlayer = false
      break
  }
  animationFrame += 1
  enemy.attackAnimationFrame = animationFrame % 30
}

function windingUp (enemy) {
  enemyDrawer.drawWindUpAttack(enemy)
}

function windingDown (enemy) {
  enemyDrawer.drawWindDownAttack(enemy)
}

function attacking (enemy) {
  enemyDrawer.drawAttacking(enemy)
  if (collisionDetectionModule.collisionDetection(playerModule.getPlayer(), enemy.player_attack_box) && !enemy.hitPlayer) {
    playerModule.updateHealth(-40)
    enemy.hitPlayer = true
  }
}

module.exports = {
  attack
}
