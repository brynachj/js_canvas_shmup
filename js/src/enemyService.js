var enemyManager = require('./enemyManager.js')
var playerModule = require('./player.js')
var enemyDrawer = require('./enemyDrawer.js')
var collisionDetectionModule = require('./collisionDetection.js')
var enemyAttack = require('./enemyAttack.js')

function getEnemies () {
  return enemyManager.getEnemies()
}

function addEnemy (x, y) {
  enemyManager.addEnemy(x, y)
}

function damageEnemy (enemy, damage) {
  enemyManager.hitEnemy(enemy, damage)
}

function updateEnemies () {
  playerEnemyDetectionBoxCollision()
  playerEnemyAttackBoxCollision()
  playerEnemyDeaggroBoxCollision()
  moveEnemies()
  getEnemies().filter(e => !e.attacking).map(enemy => enemyDrawer.drawIdle(enemy))
  getEnemies().filter(e => e.attacking).map(enemy => enemyAttack.attack(enemy, playerModule.getPlayer()))
}

function playerEnemyDetectionBoxCollision () {
  getEnemies().filter(enemy => collisionDetectionModule.collisionDetection(playerModule.getPlayer(), enemy.player_detection_box)).map(enemy => (enemy.aggro = true))
}

function playerEnemyAttackBoxCollision () {
  getEnemies().filter(enemy => collisionDetectionModule.collisionDetection(playerModule.getPlayer(), enemy.player_attack_box)).map(enemy => (enemy.attacking = true))
}

function playerEnemyDeaggroBoxCollision () {
  getEnemies().filter(enemy => !collisionDetectionModule.collisionDetection(playerModule.getPlayer(), enemy.player_aggro_box)).map(enemy => (enemy.aggro = false))
}

function moveEnemies () {
  let aggroEnemies = getEnemies().filter(e => e.aggro)
  aggroEnemies.filter(e => !e.attacking).map(enemy => enemyManager.moveEnemyToward(enemy, playerModule.getPlayer()))
}

module.exports = {
  getEnemies,
  addEnemy,
  damageEnemy,
  updateEnemies
}
