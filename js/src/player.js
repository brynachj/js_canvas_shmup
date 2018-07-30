var enemy_manager = require('./enemyManager.js');
var collision_detection_module = require('./collisionDetection.js');
var player_drawer = require('./playerDrawer.js');
var player_movement = require('./playerMovement.js');

const WIDTH = 20, HEIGHT = 26, SPEED = 10, ATTACK_WIDTH = 15;

var player, health, alive = true, experience = 0;

hitEnemyList = [];

attack_sprite_left = new Image();
attack_sprite_left.src = 'images/enemy_sword_left.png';
attack_sprite_right = new Image();
attack_sprite_right.src = 'images/enemy_sword_right.png';
attack_sprite_up = new Image();
attack_sprite_up.src = 'images/enemy_sword_up.png';
attack_sprite_down = new Image();
attack_sprite_down.src = 'images/enemy_sword_down.png';

// player directions
const UP = 'up', DOWN = 'down', LEFT = 'left', RIGHT = 'right';

// player states
const IDLE = 'idle', ATTACKING = 'attacking', WINDING_DOWN = 'winding_down';

player_sprite_right = new Image();
player_sprite_right.src = 'images/player_sprite_right.png';
player_sprite_left = new Image();
player_sprite_left.src = 'images/player_sprite_left.png';
player_sprite_up = new Image();
player_sprite_up.src = 'images/player_sprite_up.png';
player_sprite_down = new Image();
player_sprite_down.src = 'images/player_sprite_down.png';

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
    attack();
  }
  player_movement.movePlayer(player, rightKey, leftKey, upKey, downKey);
  player_movement.facePlayer(player, rightKey, leftKey, upKey, downKey);
  player_drawer.drawPlayer(player);
}

function attack() {
  let animationFrame = player.attackAnimationFrame;
  switch(true) {
    case animationFrame < 5:
      windingUp();
      break;
    case animationFrame < 10:
      attacking();
      break;
    case animationFrame < 19:
      windingDown();
      break;
    case animationFrame === 19:
      windingDown();
      hitEnemyList = [];
      player.state = IDLE;
      break;
  }
  animationFrame += 1;
  player.attackAnimationFrame = animationFrame % 20;
}

function windingUp(){
  player_drawer.drawWindUpAttack(player);
  player.state = ATTACKING;
}

function attacking() {
  player_drawer.drawAttacking(player);
  player.state = ATTACKING;
  enemy_manager.enemies.filter(e => collision_detection_module.collisionDetection(player.attack_box, e))
                        .filter(e => hitEnemyList.indexOf(e) < 0).map(e => hitEnemy(e));
}

function hitEnemy(enemy) {
  enemy_manager.hitEnemy(enemy, 50);
  hitEnemyList.push(enemy);
}

function windingDown() {
  player.state = WINDING_DOWN;
}

module.exports = {
  getPlayer : getPlayer,
  resetPlayer : resetPlayer,
  updateHealth : updateHealth,
  getHealth : getHealth,
  getAlive : getAlive,
  setAlive : setAlive,
  getExperience : getExperience,
  addExperience : addExperience,
  updatePlayer : updatePlayer,
  attack : attack
}
