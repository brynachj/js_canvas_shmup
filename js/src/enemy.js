var draw_module = require('./draw.js');
var debug_module = require('./debugControls.js')
var player_module = require('./player.js');
var utility_module = require('./utility.js');

const WIDTH = 34, HEIGHT = 36, SPEED = 3;

enemy_sprite = new Image();
enemy_sprite.src = 'images/enemy_sprite.png';

let enemies = [];

function addEnemy(x,y){
  enemies.push(createEnemy(x,y));
}

function createEnemy(x1, y1) {
  return {id: utility_module.newId(enemies), x:x1, y:y1, w:WIDTH, h:HEIGHT, speed:SPEED, hitBoxColor: '#ff0000', health: 100,
        player_detection_box : {x:x1-60, y:y1-60, w:WIDTH+120, h:HEIGHT+120, hitBoxColor: '#ff8c00'},
        player_aggro_box : {x:x1-80, y:y1-80, w:WIDTH+160, h:HEIGHT+160, hitBoxColor: '#ffff00'},
        player_attack_box: {x:x1-5, y:y1-5, w:WIDTH+10, h:HEIGHT+10, hitBoxColor: '#ff6961'},
        aggro : false, attacking: false
      };
}

function getAggro(enemy) {
  return enemy.aggro;
}

function setAggro(enemy, aggroBool){
  enemy.aggro = aggroBool;
}

function getAttacking(enemy) {
  return enemy.attacking;
}

function setAttacking(enemy, attackBool) {
  enemy.attacking = attackBool;
}

function drawEnemies(ctx) {
    enemies.map(enemy => {
        draw_module.drawSprite(enemy_sprite, enemy, ctx)
        if (window.drawHitboxes) {
            draw_module.drawHitbox(enemy.player_detection_box, ctx);
            draw_module.drawHitbox(enemy.player_aggro_box, ctx);
            draw_module.drawHitbox(enemy.player_attack_box, ctx);
        }
    });
}

function moveEnemyToward(enemy, target) {
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

function removeAndReplaceEnemy(enemyToRemove){
  var index = enemies.map(enemy => enemy.id).indexOf(enemyToRemove.id);
  enemies.splice(index, 1);
  enemies.push(createEnemy(Math.random() * 600, Math.random() * 600));
}

function hitEnemy(enemy, damage) {
  enemy.health -= damage;
  if(debug_module.debug){
    debug_module.writeOutDebug('enemy health: ' + enemy.health);
  }
  if(enemy.health <= 0) {
    removeAndReplaceEnemy(enemy)
  }
}

function moveEnemies() {
  enemies.filter(getAggro && !getAttack).map(enemy => moveEnemyToward(enemy, player_module.getPlayer()));
}

module.exports = {
  enemies : enemies,
  addEnemy : addEnemy,
  drawEnemies : drawEnemies,
  removeAndReplaceEnemy : removeAndReplaceEnemy,
  setAggro : setAggro,
  hitEnemy : hitEnemy,
  moveEnemies: moveEnemies
}
