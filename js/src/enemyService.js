var enemy_manager = require('./enemyManager.js');
var debug_module = require('./debugControls.js')
var player_module = require('./player.js');
var enemy_drawer = require('./enemyDrawer.js');
var collision_detection_module = require('./collisionDetection.js');

function updateEnemies() {
  playerEnemyDetectionBoxCollision();
  playerEnemyAttackBoxCollision();
  playerEnemyDeaggroBoxCollision();
  moveEnemies();
  enemy_drawer.drawEnemies(enemy_manager.enemies);
}

function hitEnemy(enemy, damage) {
  enemy_manager.hitEnemy(enemy, damage);
}

function attack(enemy, player) {
  let animationFrame = enemy.attackAnimationFrame
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
      enemy.attacking = false;
      enemy.hitPlayer = false;
      break;
  }
  animationFrame += 1
  enemy.attackAnimationFrame = animationFrame % 30
}

function windingUp(enemy) {
  enemy_drawer.drawWindUpAttack(enemy);
}

function windingDown(enemy) {
}

function attacking(enemy) {
  enemy_drawer.drawAttacking(enemy);
  if (collision_detection_module.collisionDetection(player_module.getPlayer(), enemy.player_attack_box) && !enemy.hitPlayer){
    player_module.updateHealth(-40);
    enemy.hitPlayer = true;
  }
}

function moveEnemies() {
  let aggroEnemies = enemy_manager.enemies.filter(e => e.aggro);
  aggroEnemies.filter(e => !e.attacking).map(enemy => enemy_manager.moveEnemyToward(enemy, player_module.getPlayer()));
  enemy_manager.enemies.filter(e => e.attacking).map(enemy => attack(enemy, player_module.getPlayer()));
}

function playerEnemyDetectionBoxCollision() {
  enemy_manager.enemies.filter(enemy => collision_detection_module.collisionDetection(player_module.getPlayer(), enemy.player_detection_box)).map(enemy => enemy.aggro = true);
}

function playerEnemyDeaggroBoxCollision() {
  enemy_manager.enemies.filter(enemy => !collision_detection_module.collisionDetection(player_module.getPlayer(), enemy.player_aggro_box)).map(enemy => enemy.aggro = false);
}

function playerEnemyAttackBoxCollision() {
  enemy_manager.enemies.filter(enemy => collision_detection_module.collisionDetection(player_module.getPlayer(), enemy.player_attack_box)).map(enemy => enemy.attacking = true);
}

module.exports = {
  updateEnemies : updateEnemies,
  hitEnemy : hitEnemy
}
