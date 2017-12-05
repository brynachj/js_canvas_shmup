var enemy_manager = require('./enemyManager.js');
var debug_module = require('./debugControls.js')
var player_module = require('./player.js');
var enemy_drawer = require('./enemyDrawer.js');
var collision_detection_module = require('./collisionDetection.js');

const WIDTH = 34, HEIGHT = 36, SPEED = 3;

const UP = "up", DOWN = "down", LEFT = "left", RIGHT = "right";

function updateEnemies() {
  playerEnemyCollision();
  playerEnemyDetectionBoxCollision();
  playerEnemyAttackBoxCollision();
  playerEnemyDeaggroBoxCollision();
  moveEnemies();
  enemy_drawer.drawEnemies();
}

function moveEnemyToward(enemy, target) {
  updateEnemyDirection(enemy, target);
  if (enemy.x < target.x) {
    move(enemy, enemy.speed, 0);
  }
  if (enemy.x > target.x) {
    move(enemy, -enemy.speed, 0);
  }
  if (enemy.y < target.y) {
    move(enemy, 0, enemy.speed);
  }
  if (enemy.y > target.y) {
    move(enemy, 0, -enemy.speed);
  }
}

function updateEnemyDirection(enemy, target) {
  x_difference = (enemy.x + enemy.w/2) - (target.x + target.w/2);
  y_difference = (enemy.y + enemy.h/2) - (target.y + target.h/2);
  if(x_difference*x_difference > y_difference*y_difference) {
    if(x_difference > 0){
      enemy.facing = LEFT;
      enemy.player_attack_box = {x:enemy.x-10, y:enemy.y-5, w:10, h:HEIGHT+10, hitBoxColor: '#ff6961'};
    } else {
      enemy.facing = RIGHT;
      enemy.player_attack_box = {x:enemy.x+enemy.w, y:enemy.y-5, w:10, h:HEIGHT+10, hitBoxColor: '#ff6961'};
    }
  } else {
    if(y_difference > 0){
      enemy.facing = UP;
      enemy.player_attack_box = {x:enemy.x-5, y:enemy.y-10, w:WIDTH+10, h:10, hitBoxColor: '#ff6961'};
    } else {
      enemy.facing = DOWN;
      enemy.player_attack_box = {x:enemy.x-5, y:enemy.y+enemy.h, w:WIDTH+10, h:10, hitBoxColor: '#ff6961'};
    }
  }
}

function move(enemy, move_x, move_y) {
  enemy.x += move_x;
  enemy.player_detection_box.x += move_x;
  enemy.player_aggro_box.x += move_x;
  enemy.player_attack_box.x += move_x;
  enemy.y += move_y;
  enemy.player_detection_box.y += move_y;
  enemy.player_aggro_box.y += move_y;
  enemy.player_attack_box.y += move_y;
}

function hitEnemy(enemy, damage) {
  enemy.health -= damage;
  if(debug_module.debug){
    debug_module.writeOutDebug('enemy health: ' + enemy.health);
  }
  if(enemy.health <= 0) {
    enemy_manager.removeAndReplaceEnemy(enemy)
  }
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
  aggroEnemies.filter(e => !e.attacking).map(enemy => moveEnemyToward(enemy, player_module.getPlayer()));
  enemy_manager.enemies.filter(e => e.attacking).map(enemy => attack(enemy, player_module.getPlayer()));
}

function playerEnemyCollision() {
  enemy_manager.enemies.filter(e => collision_detection_module.collisionDetection(player_module.getPlayer(), e)).map(enemy => {
      player_module.updateHealth(-40);
      enemy_manager.removeAndReplaceEnemy(enemy);
  });
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
