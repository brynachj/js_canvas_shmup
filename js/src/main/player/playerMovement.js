var enemy_manager = require('../enemy/enemyManager.js');
var collision_detection_module = require('../collisionDetection.js');

// player directions
const UP = 'up', DOWN = 'down', LEFT = 'left', RIGHT = 'right';

// player states
const IDLE = 'idle', ATTACKING = 'attacking', WINDING_DOWN = 'winding_down', ATTACK_WIDTH = 15;

function facePlayer(player, rightKey, leftKey, upKey, downKey) {
  if(upKey) {
    player.facing =  UP;
    player.attack_box = {x:player.x-5, y:player.y-10, w:player.w+10, h:ATTACK_WIDTH, hitBoxColor: '#ff6961'};
  }
  if(downKey) {
    player.facing =  DOWN;
    player.attack_box = {x:player.x-5, y:player.y+player.h, w:player.w+10, h:ATTACK_WIDTH, hitBoxColor: '#ff6961'};
  }
  if(rightKey) {
    player.facing =  RIGHT;
    player.attack_box = {x:player.x+player.w, y:player.y-5, w:ATTACK_WIDTH, h:player.h+10, hitBoxColor: '#ff6961'};
  }
  if(leftKey) {
    player.facing =  LEFT;
    player.attack_box = {x:player.x-10, y:player.y-5, w:ATTACK_WIDTH, h:player.h+10, hitBoxColor: '#ff6961'};
  }
}

function movePlayer(player, rightKey, leftKey, upKey, downKey) {
  if(player.state !== ATTACKING){
    if (rightKey && (player.x + player.w) < 600) {
      colliding_right = enemy_manager.enemies.filter(e => collision_detection_module.collisionDetection({x:player.x + 5, y:player.y, w: player.w, h: player.h}, e));
      if(colliding_right.length === 0){
        player.x += 5;
        player.attack_box.x += 5;
      }
    }
    else if (leftKey && player.x > 0) {
      colliding_left = enemy_manager.enemies.filter(e => collision_detection_module.collisionDetection({x:player.x - 5, y:player.y, w: player.w, h: player.h}, e));
      if(colliding_left.length === 0){
        player.x -= 5;
        player.attack_box.x -= 5;
      }
    }
    if (upKey && player.y > 0) {
      colliding_up = enemy_manager.enemies.filter(e => collision_detection_module.collisionDetection({x:player.x, y:player.y - 5, w: player.w, h: player.h}, e));
      if(colliding_up.length === 0){
        player.y -= 5;
        player.attack_box.y -= 5;
      }
    }
    else if (downKey && (player.y + player.h) < 600) {
      colliding_down = enemy_manager.enemies.filter(e => collision_detection_module.collisionDetection({x:player.x, y:player.y + 5, w: player.w, h: player.h}, e));
      if(colliding_down.length === 0){
        player.y += 5;
        player.attack_box.y += 5;
      }
    }
  }
}

function dash (player, rightKey, leftKey, upKey, downKey) {
  console.log('dashing')
  player.state = IDLE
}

module.exports = {
    facePlayer,
    movePlayer,
    dash
}