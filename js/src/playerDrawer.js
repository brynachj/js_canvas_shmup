var draw_module = require('./draw.js');

const UP = "up", DOWN = "down", LEFT = "left", RIGHT = "right";

function drawAttacking(player) {
    if(player.facing === RIGHT){draw_module.drawSprite(attack_sprite_right, {x: player.x+30, y: player.y+player.h/2}, draw_module.ctx);}
    if(player.facing === LEFT){draw_module.drawSprite(attack_sprite_left, {x: player.x-30, y: player.y+player.h/2}, draw_module.ctx);}
    if(player.facing === UP){draw_module.drawSprite(attack_sprite_up, {x: player.x + player.w/2, y: player.y-30}, draw_module.ctx);}
    if(player.facing === DOWN){draw_module.drawSprite(attack_sprite_down, {x: player.x + player.w/2, y: player.y+30}, draw_module.ctx);}
  }

  function drawWindUpAttack(player) {
    if(player.facing === RIGHT){draw_module.drawSprite(attack_sprite_right, {x: player.x, y: player.y+player.h/2}, draw_module.ctx);}
    if(player.facing === LEFT){draw_module.drawSprite(attack_sprite_left, {x: player.x, y: player.y+player.h/2}, draw_module.ctx);}
    if(player.facing === UP){draw_module.drawSprite(attack_sprite_up, {x: player.x + player.w/2, y: player.y}, draw_module.ctx);}
    if(player.facing === DOWN){draw_module.drawSprite(attack_sprite_down, {x: player.x + player.w/2, y: player.y}, draw_module.ctx);}
  }

  function drawPlayer(player) {
    if(player.facing === RIGHT){
      draw_module.drawSprite(player_sprite_right, player, draw_module.ctx);
    }
    if(player.facing === LEFT){
      draw_module.drawSprite(player_sprite_left, player, draw_module.ctx);
    }
    if(player.facing === DOWN){
      draw_module.drawSprite(player_sprite_down, player, draw_module.ctx);
    }
    if(player.facing === UP){
      draw_module.drawSprite(player_sprite_up, player, draw_module.ctx);
    }
    if (window.drawHitboxes) {
      draw_module.drawHitbox(player.attack_box, draw_module.ctx);
    }
  }

  module.exports = {
      drawPlayer,
      drawAttacking,
      drawWindUpAttack
  }