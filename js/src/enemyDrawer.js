var draw_module = require('./draw.js');
var enemy_manager = require('./enemyManager.js');

const UP = "up", DOWN = "down", LEFT = "left", RIGHT = "right";

function drawEnemy(enemy_sprite, enemy) {
  if(enemy.facing === LEFT){draw_module.drawSprite(enemy_sprite_left, enemy, draw_module.ctx);}
  if(enemy.facing === RIGHT){draw_module.drawSprite(enemy_sprite_right, enemy, draw_module.ctx);}
  if(enemy.facing === UP){draw_module.drawSprite(enemy_sprite_up, enemy, draw_module.ctx);}
  if(enemy.facing === DOWN){draw_module.drawSprite(enemy_sprite_down, enemy, draw_module.ctx);}
}

function drawEnemies(ctx) {
    enemy_manager.enemies.map(enemy => {
        drawEnemy(enemy_sprite, enemy)
        if (window.drawHitboxes) {
            draw_module.drawHitbox(enemy.player_detection_box, draw_module.ctx);
            draw_module.drawHitbox(enemy.player_aggro_box, draw_module.ctx);
            draw_module.drawHitbox(enemy.player_attack_box, draw_module.ctx);
        }
    });
}


module.exports = {
  drawEnemies : drawEnemies
}
