const WIDTH = 34, HEIGHT = 36, SPEED = 3;

enemy_sprite = new Image();
enemy_sprite.src = 'images/enemy_sprite.png';

module.exports = {

  createEnemy : function(x1, y1) {
    return {x:x1, y:y1, w:WIDTH, h:HEIGHT, speed:SPEED, hitBoxColor: '#ff0000',
          player_detection_box : {x:x1-60, y:y1-60, w:WIDTH+120, h:HEIGHT+120, hitBoxColor: '#ff8c00'},
          player_aggro_box : {x:x1-80, y:y1-80, w:WIDTH+160, h:HEIGHT+160, hitBoxColor: '#ffff00'}
        };
  },

  moveEnemy : function(enemy, target) {
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
  },

  enemy_sprite : enemy_sprite

}
