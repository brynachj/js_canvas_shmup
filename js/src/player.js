var enemy_manager = require('./enemyManager.js');
var collision_detection_module = require('./collisionDetection.js');
var player_drawer = require('./playerDrawer.js');

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

function moveOnScreenPebbles() {
  for (var i = 0; i < pebbles.length; i++) {
    if (pebbles[i].x < 600 + pebble_sprite.width) {
      pebbles[i].x += 10;
    } else {
      pebbles.splice(i, 1);
    }
  }
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
  movePlayer(rightKey, leftKey, upKey, downKey);
  facePlayer(rightKey, leftKey, upKey, downKey);
  player_drawer.drawPlayer(player);
}

function facePlayer(rightKey, leftKey, upKey, downKey) {
  if(upKey) {
    player.facing =  UP;
    player.attack_box = {x:player.x-5, y:player.y-10, w:WIDTH+10, h:ATTACK_WIDTH, hitBoxColor: '#ff6961'};
  }
  if(downKey) {
    player.facing =  DOWN;
    player.attack_box = {x:player.x-5, y:player.y+player.h, w:WIDTH+10, h:ATTACK_WIDTH, hitBoxColor: '#ff6961'};
  }
  if(rightKey) {
    player.facing =  RIGHT;
    player.attack_box = {x:player.x+player.w, y:player.y-5, w:ATTACK_WIDTH, h:HEIGHT+10, hitBoxColor: '#ff6961'};
  }
  if(leftKey) {
    player.facing =  LEFT;
    player.attack_box = {x:player.x-10, y:player.y-5, w:ATTACK_WIDTH, h:HEIGHT+10, hitBoxColor: '#ff6961'};
  }
}

function movePlayer(rightKey, leftKey, upKey, downKey) {
  if(player.state === ATTACKING){
    attack();
  } else {
    if(player.state === WINDING_DOWN){
      attack();
    }
    if (rightKey && (player.x + player.w) < 600) {
      colliding_right = enemy_manager.enemies.filter(e => collision_detection_module.collisionDetection({x:player.x + 5, y:player.y, w: WIDTH, h: HEIGHT}, e));
      if(colliding_right.length === 0){
        player.x += 5;
        player.attack_box.x += 5;
      }
    }
    else if (leftKey && player.x > 0) {
      colliding_left = enemy_manager.enemies.filter(e => collision_detection_module.collisionDetection({x:player.x - 5, y:player.y, w: WIDTH, h: HEIGHT}, e));
      if(colliding_left.length === 0){
        player.x -= 5;
        player.attack_box.x -= 5;
      }
    }
    if (upKey && player.y > 0) {
      colliding_up = enemy_manager.enemies.filter(e => collision_detection_module.collisionDetection({x:player.x, y:player.y - 5, w: WIDTH, h: HEIGHT}, e));
      if(colliding_up.length === 0){
        player.y -= 5;
        player.attack_box.y -= 5;
      }
    }
    else if (downKey && (player.y + player.h) < 600) {
      colliding_down = enemy_manager.enemies.filter(e => collision_detection_module.collisionDetection({x:player.x, y:player.y + 5, w: WIDTH, h: HEIGHT}, e));
      if(colliding_down.length === 0){
        player.y += 5;
        player.attack_box.y += 5;
      }
    }
  }
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
  createPlayer : createPlayer,
  resetPlayer : resetPlayer,
  moveOnScreenPebbles : moveOnScreenPebbles,
  updateHealth : updateHealth,
  getHealth : getHealth,
  getAlive : getAlive,
  setAlive : setAlive,
  getExperience : getExperience,
  addExperience : addExperience,
  updatePlayer : updatePlayer,
  attack : attack
}
