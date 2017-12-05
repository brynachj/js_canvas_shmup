var utility_module = require('./utility.js');

const WIDTH = 34, HEIGHT = 36, SPEED = 3;

const UP = "up", DOWN = "down", LEFT = "left", RIGHT = "right";

let enemies = [];

function addEnemy(x,y){
  enemies.push(createEnemy(x,y));
}

function createEnemy(x1, y1) {
  return {id: utility_module.newId(enemies), x:x1, y:y1, w:WIDTH, h:HEIGHT, speed:SPEED, hitBoxColor: '#ff0000', health: 100,
        player_detection_box : {x:x1-60, y:y1-60, w:WIDTH+120, h:HEIGHT+120, hitBoxColor: '#ff8c00'},
        player_aggro_box : {x:x1-80, y:y1-80, w:WIDTH+160, h:HEIGHT+160, hitBoxColor: '#ffff00'},
        player_attack_box: {x:x1-10, y:y1-5, w:10, h:HEIGHT+10, hitBoxColor: '#ff6961'},
        aggro : false, attacking: false, facing: LEFT, attackAnimationFrame : 0, hitPlayer : false
      };
}

function removeAndReplaceEnemy(enemyToRemove){
  var index = enemies.map(enemy => enemy.id).indexOf(enemyToRemove.id);
  enemies.splice(index, 1);
  addEnemy(Math.random() * 600, Math.random() * 600);
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
  if(enemy.health <= 0) {
    removeAndReplaceEnemy(enemy)
  }
}

module.exports = {
  enemies : enemies,
  addEnemy : addEnemy,
  removeAndReplaceEnemy : removeAndReplaceEnemy,
  updateEnemyDirection : updateEnemyDirection,
  moveEnemyToward : moveEnemyToward,
  hitEnemy : hitEnemy
}
