var draw_module = require('./draw.js');

const WIDTH = 20, HEIGHT = 26, SPEED = 10;

var player, health, alive = true, experience = 0;

player_sprite = new Image();
player_sprite.src = 'images/player_sprite.png';

function createPlayer(x1, y1) {
  return {x : x1, y : y1, w : WIDTH, h : HEIGHT, hitBoxColor: '#7cfc00'};
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
  addExperience : addExperience
}
