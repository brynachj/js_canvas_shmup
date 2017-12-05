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

function drawWindUpAttack(enemy) {
  if(enemy.facing === LEFT){draw_module.drawSprite(attack_sprite_left, {x: enemy.x, y: enemy.y+enemy.h/2}, draw_module.ctx);}
  if(enemy.facing === RIGHT){draw_module.drawSprite(attack_sprite_right, {x: enemy.x, y: enemy.y+enemy.h/2}, draw_module.ctx);}
  if(enemy.facing === UP){draw_module.drawSprite(attack_sprite_up, {x: enemy.x + enemy.w/2, y: enemy.y}, draw_module.ctx);}
  if(enemy.facing === DOWN){draw_module.drawSprite(attack_sprite_down, {x: enemy.x + enemy.w/2, y: enemy.y}, draw_module.ctx);}
}

function drawAttacking(enemy) {
  if(enemy.facing === LEFT){draw_module.drawSprite(attack_sprite_left, {x: enemy.x-30, y: enemy.y+enemy.h/2}, draw_module.ctx);}
  if(enemy.facing === RIGHT){draw_module.drawSprite(attack_sprite_right, {x: enemy.x+30, y: enemy.y+enemy.h/2}, draw_module.ctx);}
  if(enemy.facing === UP){draw_module.drawSprite(attack_sprite_up, {x: enemy.x + enemy.w/2, y: enemy.y-30}, draw_module.ctx);}
  if(enemy.facing === DOWN){draw_module.drawSprite(attack_sprite_down, {x: enemy.x + enemy.w/2, y: enemy.y+30}, draw_module.ctx);}
}

module.exports = {
  drawEnemies : drawEnemies,
  drawWindUpAttack : drawWindUpAttack,
  drawAttacking : drawAttacking
}
