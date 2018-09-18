var player_drawer = require('./playerDrawer.js');
var player_movement = require('./playerMovement.js');
var player_attack = require('./playerAttack.js');

const WIDTH = 20, HEIGHT = 26, SPEED = 10, ATTACK_WIDTH = 15;

var player, health, alive = true, experience = 0;

hitEnemyList = [];

// player directions
const UP = 'up', DOWN = 'down', LEFT = 'left', RIGHT = 'right';

// player states
const IDLE = 'idle', ATTACKING = 'attacking', WINDING_DOWN = 'winding_down';

function createPlayer(x1, y1) {
  return {x : x1, y : y1, w : WIDTH, h : HEIGHT, hitBoxColor : '#7cfc00',
  state: IDLE, attackAnimationFrame : 0, attack_box: {x:x1+WIDTH, y:y1-5, w:ATTACK_WIDTH, h:HEIGHT+10, hitBoxColor: '#ff6961'},
  facing: RIGHT};
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

function updateHealth(value) {
  health += value;
  if (health > 0) {
    // TODO: iframes and such
  } else {
    alive = false;
  }
}

function updatePlayer(rightKey, leftKey, upKey, downKey) {
  if(player.state === ATTACKING || player.state === WINDING_DOWN){
    console.log("fighting");
    player_attack.attack(player);
  }
  player_movement.movePlayer(player, rightKey, leftKey, upKey, downKey);
  player_movement.facePlayer(player, rightKey, leftKey, upKey, downKey);
  player_drawer.drawPlayer(player);
}

function attack() {
  player.state = ATTACKING;
}

function dash () {
  console.log('dash')
}

module.exports = {
  getPlayer,
  resetPlayer,
  updateHealth,
  getHealth,
  getAlive,
  setAlive,
  getExperience,
  addExperience,
  updatePlayer,
  attack,
  dash
}
