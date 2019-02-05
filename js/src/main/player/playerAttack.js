var playerDrawer = require('./playerDrawer.js')
var enemyManager = require('../enemy/enemyManager.js')
var collisionDetection = require('../shared/collisionDetection.js')
var constants = require('../shared/constants.js')

let hitEnemyList = []

function attack (player) {
  let animationFrame = player.attackAnimationFrame
  switch (true) {
    case animationFrame < 5:
      windingUp(player)
      break
    case animationFrame < 10:
      attacking(player)
      break
    case animationFrame < 19:
      windingDown(player)
      break
    case animationFrame === 19:
      windingDown(player)
      hitEnemyList = []
      player.state = constants.IDLE
      break
  }
  animationFrame += 1
  player.attackAnimationFrame = animationFrame % 20
}

function windingUp (player) {
  playerDrawer.drawWindUpAttack(player)
  player.state = constants.ATTACKING
}

function attacking (player) {
  playerDrawer.drawAttacking(player)
  player.state = constants.ATTACKING
  enemyManager.enemies.filter(e => collisionDetection.collisionDetection(player.attack_box, e))
    .filter(e => hitEnemyList.indexOf(e) < 0).map(e => hitEnemy(e))
}

function hitEnemy (enemy) {
  enemyManager.hitEnemy(enemy, 50)
  hitEnemyList.push(enemy)
}

function windingDown (player) {
  player.state = constants.WINDING_DOWN
}

module.exports = {
  attack
}
