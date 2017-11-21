var draw_module = require('./draw.js');
var debug_module = require('./debugControls.js')

const WIDTH = 34, HEIGHT = 36, SPEED = 3;

enemy_sprite = new Image();
enemy_sprite.src = 'images/enemy_sprite.png';

var enemies = [];

function addEnemy(x,y){
  enemies.push(createEnemy(x,y));
}

function createEnemy(x1, y1) {
  return {x:x1, y:y1, w:WIDTH, h:HEIGHT, speed:SPEED, hitBoxColor: '#ff0000', health: 100,
        player_detection_box : {x:x1-60, y:y1-60, w:WIDTH+120, h:HEIGHT+120, hitBoxColor: '#ff8c00'},
        player_aggro_box : {x:x1-80, y:y1-80, w:WIDTH+160, h:HEIGHT+160, hitBoxColor: '#ffff00'},
        aggro : false
      };
}

function getAggro(enemy) {
  return enemy.aggro;
}

function setAggro(enemy, aggroBool){
  enemy.aggro = aggroBool;
}

function drawEnemies(ctx) {
  for (var i = 0; i < enemies.length; i++) {
    draw_module.drawSprite(enemy_sprite, enemies[i], ctx);
    if(window.drawHitboxes){
      draw_module.drawHitbox(enemies[i].player_detection_box, ctx);
      draw_module.drawHitbox(enemies[i].player_aggro_box, ctx);
    }
  }
}

function moveEnemy(enemy, target) {
  if (enemy.x < target.x) {
    enemy.x += enemy.speed;
    enemy.player_detection_box.x += enemy.speed;
    enemy.player_aggro_box.x += enemy.speed;
  }
  if (enemy.x > target.x) {
    enemy.x -= enemy.speed;
    enemy.player_detection_box.x -= enemy.speed;
    enemy.player_aggro_box.x -= enemy.speed;
  }
  if (enemy.y < target.y) {
    enemy.y += enemy.speed;
    enemy.player_detection_box.y += enemy.speed;
    enemy.player_aggro_box.y += enemy.speed;
  }
  if (enemy.y > target.y) {
    enemy.y -= enemy.speed;
    enemy.player_detection_box.y -= enemy.speed;
    enemy.player_aggro_box.y -= enemy.speed;
  }
}

function removeAndReplaceEnemy(enemies, i){
  enemies.splice(i, 1);
  enemies.push(createEnemy(Math.random() * 600, Math.random() * 600));
}

function hitEnemy(i, damage){
  enemies[i].health -= damage;
  if(debug_module.debug){
    debug_module.writeOutDebug('enemy health: ' + enemies[i].health);
  }
  if(enemies[i].health <= 0) {
    removeAndReplaceEnemy(enemies, i)
  }
}

module.exports = {
  enemies : enemies,
  addEnemy : addEnemy,
  moveEnemy : moveEnemy,
  drawEnemies : drawEnemies,
  removeAndReplaceEnemy : removeAndReplaceEnemy,
  getAggro : getAggro,
  setAggro : setAggro,
  hitEnemy : hitEnemy
}
