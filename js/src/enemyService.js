var enemyManager = require('./enemyManager.js')
var playerModule = require('./player.js')
var enemyDrawer = require('./enemyDrawer.js')
var collisionDetectionModule = require('./collisionDetection.js')

function updateEnemies() {
  playerEnemyDetectionBoxCollision();
  playerEnemyAttackBoxCollision();
  playerEnemyDeaggroBoxCollision();
  moveEnemies();
  enemyManager.enemies.filter(e => !e.attacking).map(enemy => enemyDrawer.drawIdle(enemy));
  enemyManager.enemies.filter(e => e.attacking).map(enemy => attack(enemy, playerModule.getPlayer()));
}

function addEnemy (x, y) {
  enemyManager.addEnemy(x, y)
}

function hitEnemy (enemy, damage) {
  enemyManager.hitEnemy(enemy, damage)
}

function attack(enemy, player) {
  let animationFrame = enemy.attackAnimationFrame;
  switch(true) {
    case animationFrame < 10:
      windingUp(enemy);
      break;
    case animationFrame < 20:
      attacking(enemy);
      break;
    case animationFrame < 29:
      windingDown(enemy);
      break;
    case animationFrame === 29:
      windingDown(enemy);
      enemy.attacking = false;
      enemy.hitPlayer = false;
      break;
  }
  animationFrame += 1;
  enemy.attackAnimationFrame = animationFrame % 30;
}

function windingUp(enemy) {
  enemyDrawer.drawWindUpAttack(enemy);
}

function windingDown(enemy) {
  enemyDrawer.drawWindDownAttack(enemy);
}

function attacking(enemy) {
  enemyDrawer.drawAttacking(enemy);
  if (collisionDetectionModule.collisionDetection(playerModule.getPlayer(), enemy.player_attack_box) && !enemy.hitPlayer){
    playerModule.updateHealth(-40);
    enemy.hitPlayer = true;
  }
}

function moveEnemies() {
  let aggroEnemies = enemyManager.enemies.filter(e => e.aggro);
  aggroEnemies.filter(e => !e.attacking).map(enemy => enemyManager.moveEnemyToward(enemy, playerModule.getPlayer()));
}

function playerEnemyDetectionBoxCollision() {
  enemyManager.enemies.filter(enemy => collisionDetectionModule.collisionDetection(playerModule.getPlayer(), enemy.player_detection_box)).map(enemy => enemy.aggro = true);
}

function playerEnemyDeaggroBoxCollision() {
  enemyManager.enemies.filter(enemy => !collisionDetectionModule.collisionDetection(playerModule.getPlayer(), enemy.player_aggro_box)).map(enemy => enemy.aggro = false);
}

function playerEnemyAttackBoxCollision() {
  enemyManager.enemies.filter(enemy => collisionDetectionModule.collisionDetection(playerModule.getPlayer(), enemy.player_attack_box)).map(enemy => enemy.attacking = true);
}

module.exports = {
  addEnemy,
  updateEnemies,
  hitEnemy
}
