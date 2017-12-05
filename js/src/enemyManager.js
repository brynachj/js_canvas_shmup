var utility_module = require('./utility.js');

const WIDTH = 34, HEIGHT = 36, SPEED = 3;

const UP = "up", DOWN = "down", LEFT = "left", RIGHT = "right";

enemy_sprite = new Image();
enemy_sprite.src = 'images/enemy_sprite.png';

enemy_sprite_left = new Image();
enemy_sprite_left.src = 'images/enemy_sprite_left.png';
enemy_sprite_right = new Image();
enemy_sprite_right.src = 'images/enemy_sprite_right.png';
enemy_sprite_up = new Image();
enemy_sprite_up.src = 'images/enemy_sprite_up.png';
enemy_sprite_down = new Image();
enemy_sprite_down.src = 'images/enemy_sprite_down.png';

attack_sprite_left = new Image();
attack_sprite_left.src = 'images/enemy_sword_left.png';
attack_sprite_right = new Image();
attack_sprite_right.src = 'images/enemy_sword_right.png';
attack_sprite_up = new Image();
attack_sprite_up.src = 'images/enemy_sword_up.png';
attack_sprite_down = new Image();
attack_sprite_down.src = 'images/enemy_sword_down.png';

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

module.exports = {
  enemies : enemies,
  addEnemy : addEnemy,
  removeAndReplaceEnemy : removeAndReplaceEnemy
}
