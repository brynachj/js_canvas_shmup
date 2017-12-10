var draw_module = require('./draw.js');
var enemy_manager = require('./enemyManager.js');
var collision_detection_module = require('./collisionDetection.js');

const WIDTH = 20, HEIGHT = 26, SPEED = 10;

var player, health, alive = true, experience = 0;

player_sprite = new Image();
player_sprite.src = 'images/player_sprite.png';

function createPlayer(x1, y1) {
  return {x : x1, y : y1, w : WIDTH, h : HEIGHT, hitBoxColor : '#7cfc00', isMoving : false};
}

function getPlayer(){
  if(player === undefined) {
    resetPlayer();
  }
  return player;
}

function resetPlayer() {
  experience = 0;
  health = 100;
  player = createPlayer(10, 287);
}

function getHealth() {
  return health;
}

function getAlive() {
  return alive;
}

function setAlive(isAlive) {
  return alive = isAlive;
}

function getExperience() {
  return experience;
}

function addExperience(value) {
  experience += value;
}

function moveOnScreenPebbles() {
  for (var i = 0; i < pebbles.length; i++) {
    if (pebbles[i].x < 600 + pebble_sprite.width) {
      pebbles[i].x += 10;
    } else {
      pebbles.splice(i, 1);
    }
  }
}

function drawPlayer(ctx) {
  draw_module.drawSprite(player_sprite, player, ctx);
}

function updateHealth(value) {
  health += value;
  if (health > 0) {
    // TODO: iframes and such
  } else {
    alive = false;
  }
}

function movePlayer(rightKey, leftKey, upKey, downKey) {
  player.isMoving = false;
  if (rightKey) {
    colliding_right = enemy_manager.enemies.filter(e => collision_detection_module.collisionDetection({x:player.x + 5, y:player.y, w: 20, h: 26}, e));
    if(colliding_right.length === 0){
      player.x += 5;
      player.isMoving = true;
    }
  }
  else if (leftKey) {
    colliding_left = enemy_manager.enemies.filter(e => collision_detection_module.collisionDetection({x:player.x - 5, y:player.y, w: 20, h: 26}, e));
    if(colliding_left.length === 0){
      player.x -= 5;
      player.isMoving = true;
    }
  }
  if (upKey) {
    colliding_up = enemy_manager.enemies.filter(e => collision_detection_module.collisionDetection({x:player.x, y:player.y - 5, w: 20, h: 26}, e));
    if(colliding_up.length === 0){
      player.y -= 5;
      player.isMoving = true;
    }
  }
  else if (downKey) {
    colliding_down = enemy_manager.enemies.filter(e => collision_detection_module.collisionDetection({x:player.x, y:player.y + 5, w: 20, h: 26}, e));
    if(colliding_down.length === 0){
      player.y += 5;
      player.isMoving = true;
    }
  }
  if (player.x <= 0) player.x = 0;
  if ((player.x + player.w) >= 600) player.x = 600 - player.w;
  if (player.y <= 0) player.y = 0;
  if ((player.y + player.h) >= 600) player.y = 600 - player.h;
}

module.exports = {
  getPlayer : getPlayer,
  createPlayer : createPlayer,
  resetPlayer : resetPlayer,
  moveOnScreenPebbles : moveOnScreenPebbles,
  drawPlayer : drawPlayer,
  updateHealth : updateHealth,
  getHealth : getHealth,
  getAlive : getAlive,
  setAlive : setAlive,
  getExperience : getExperience,
  addExperience : addExperience,
  movePlayer : movePlayer
}
