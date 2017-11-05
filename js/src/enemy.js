module.exports = {

  createEnemy : function(x1, y1, w1, h1, speed1) {
    return {x:x1, y:y1, w:w1, h:h1, speed:speed1, hitBoxColor: '#ff0000',
          player_detection_box : {x:x1-60, y:y1-60, w:w1+120, h:h1+120, hitBoxColor: '#ff8c00'},
          player_aggro_box : {x:x1-80, y:y1-80, w:w1+160, h:h1+160, hitBoxColor: '#ffff00'}
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
  }

}
