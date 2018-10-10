var enemy_manager = require('../enemy/enemyManager.js');
var collision_detection_module = require('../collisionDetection.js');

// player directions
const UP = 'up', DOWN = 'down', LEFT = 'left', RIGHT = 'right';

// player states
const IDLE = 'idle', ATTACKING = 'attacking', WINDING_DOWN = 'winding_down', ATTACK_WIDTH = 15;
const MOVEMENT_SPEED = 5
const DASH_PER_FRAME_LENGTH = 17

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

function movePlayer (player, rightKey, leftKey, upKey, downKey) {
  let colliding = enemy_manager.enemies.filter(e => collision_detection_module.collisionDetection({x:player.x - 5, y:player.y - 5, w: player.w + 5, h: player.h + 5}, e))
  let movementSpeed = (colliding.length > 0) ? 1 : MOVEMENT_SPEED
  if (player.state !== ATTACKING) {
    if (rightKey && (player.x + player.w) < 600) {
      player.x += movementSpeed
      player.attack_box.x += movementSpeed
    } else if (leftKey && player.x > 0) {
      player.x -= movementSpeed
      player.attack_box.x -= movementSpeed
    } if (upKey && player.y > 0) {
      player.y -= movementSpeed
      player.attack_box.y -= movementSpeed
    } else if (downKey && (player.y + player.h) < 600) {
      player.y += movementSpeed
      player.attack_box.y += movementSpeed
    }
  }
}

function dash (player, rightKey, leftKey, upKey, downKey) {
  let animationFrame = player.dashAnimationFrame
  if (rightKey && (player.x + player.w) < (600 - DASH_PER_FRAME_LENGTH)) {
    player.x += DASH_PER_FRAME_LENGTH
    player.attack_box.x += DASH_PER_FRAME_LENGTH
  } else if (leftKey && player.x > DASH_PER_FRAME_LENGTH) {
    player.x -= DASH_PER_FRAME_LENGTH
    player.attack_box.x -= DASH_PER_FRAME_LENGTH
  }
  if (upKey && player.y > DASH_PER_FRAME_LENGTH) {
    player.y -= DASH_PER_FRAME_LENGTH
    player.attack_box.y -= DASH_PER_FRAME_LENGTH
  } else if (downKey && (player.y + player.h) < (500 - DASH_PER_FRAME_LENGTH)) {
    player.y += DASH_PER_FRAME_LENGTH
    player.attack_box.y += DASH_PER_FRAME_LENGTH
  }
  if (animationFrame === 3) {
    player.state = IDLE
    player.dashAnimationFrame = 0
  }
  animationFrame += 1
  player.dashAnimationFrame = animationFrame % 4
}

module.exports = {
  facePlayer,
  movePlayer,
  dash
}
