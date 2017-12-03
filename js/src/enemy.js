var draw_module = require('./draw.js');
var debug_module = require('./debugControls.js')
var player_module = require('./player.js');
var utility_module = require('./utility.js');

const WIDTH = 34, HEIGHT = 36, SPEED = 3;

const UP = "up", DOWN = "down", LEFT = "left", RIGHT = "right";

enemy_sprite = new Image();
enemy_sprite.src = 'images/enemy_sprite.png';

enemy_sprite_left = new Image();
enemy_sprite_left.src = 'images/enemy_sprite_left.png';
enemy_sprite_right = new Image();
enemy_sprite_right.src = 'images/enemy_sprite_right.png';
enemy_sprite_up = new Image();
enemy_sprite_up.src = 'images/enemy_sprite_up.png';
enemy_sprite_down = new Image();
enemy_sprite_down.src = 'images/enemy_sprite_down.png';

attack_sprite_left = new Image();
attack_sprite_left.src = 'images/enemy_sword_left.png';
attack_sprite_right = new Image();
attack_sprite_right.src = 'images/enemy_sword_right.png';
attack_sprite_up = new Image();
attack_sprite_up.src = 'images/enemy_sword_up.png';
attack_sprite_down = new Image();
attack_sprite_down.src = 'images/enemy_sword_down.png';

let enemies = [];

function addEnemy(x,y){
  enemies.push(createEnemy(x,y));
}

function createEnemy(x1, y1) {
  return {id: utility_module.newId(enemies), x:x1, y:y1, w:WIDTH, h:HEIGHT, speed:SPEED, hitBoxColor: '#ff0000', health: 100,
        player_detection_box : {x:x1-60, y:y1-60, w:WIDTH+120, h:HEIGHT+120, hitBoxColor: '#ff8c00'},
        player_aggro_box : {x:x1-80, y:y1-80, w:WIDTH+160, h:HEIGHT+160, hitBoxColor: '#ffff00'},
        player_attack_box: {x:x1-10, y:y1-5, w:10, h:HEIGHT+10, hitBoxColor: '#ff6961'},
        aggro : false, attacking: false, facing: LEFT, attackAnimationFrame : 0, hitPlayer : false
      };
}

function getAggro(enemy) {
  return enemy.aggro;
}

function setAggro(enemy, aggroBool){
  enemy.aggro = aggroBool;
}

function getAttacking(enemy) {
  return enemy.attacking;
}

function setAttacking(enemy, attackBool) {
  enemy.attacking = attackBool;
  console.log("attacking " + enemy.attacking);
}

function drawEnemy(enemy_sprite, enemy) {
  if(enemy.facing === LEFT){draw_module.drawSprite(enemy_sprite_left, enemy, draw_module.ctx);}
  if(enemy.facing === RIGHT){draw_module.drawSprite(enemy_sprite_right, enemy, draw_module.ctx);}
  if(enemy.facing === UP){draw_module.drawSprite(enemy_sprite_up, enemy, draw_module.ctx);}
  if(enemy.facing === DOWN){draw_module.drawSprite(enemy_sprite_down, enemy, draw_module.ctx);}
}

function drawEnemies(ctx) {
    enemies.map(enemy => {
        drawEnemy(enemy_sprite, enemy)
        if (window.drawHitboxes) {
            draw_module.drawHitbox(enemy.player_detection_box, draw_module.ctx);
            draw_module.drawHitbox(enemy.player_aggro_box, draw_module.ctx);
            draw_module.drawHitbox(enemy.player_attack_box, draw_module.ctx);
        }
    });
}

function moveEnemyToward(enemy, target) {
  updateEnemyDirection(enemy, target);
  if (enemy.x < target.x) {
    move(enemy, enemy.speed, 0);
  }
  if (enemy.x > target.x) {
    move(enemy, -enemy.speed, 0);
  }
  if (enemy.y < target.y) {
    move(enemy, 0, enemy.speed);
  }
  if (enemy.y > target.y) {
    move(enemy, 0, -enemy.speed);
  }
}

function updateEnemyDirection(enemy, target) {
  x_difference = (enemy.x + enemy.w/2) - (target.x + target.w/2);
  y_difference = (enemy.y + enemy.h/2) - (target.y + target.h/2);
  if(x_difference*x_difference > y_difference*y_difference) {
    if(x_difference > 0){
      enemy.facing = LEFT;
      enemy.player_attack_box = {x:enemy.x-10, y:enemy.y-5, w:10, h:HEIGHT+10, hitBoxColor: '#ff6961'};
    } else {
      enemy.facing = RIGHT;
      enemy.player_attack_box = {x:enemy.x+enemy.w, y:enemy.y-5, w:10, h:HEIGHT+10, hitBoxColor: '#ff6961'};
    }
  } else {
    if(y_difference > 0){
      enemy.facing = UP;
      enemy.player_attack_box = {x:enemy.x-5, y:enemy.y-10, w:WIDTH+10, h:10, hitBoxColor: '#ff6961'};
    } else {
      enemy.facing = DOWN;
enemy.player_attack_box = {x:enemy.x-5, y:enemy.y+enemy.h, w:WIDTH+10, h:10, hitBoxColor: '#ff6961'};    }
  }
}

function move(enemy, move_x, move_y) {
  enemy.x += move_x;
  enemy.player_detection_box.x += move_x;
  enemy.player_aggro_box.x += move_x;
  enemy.player_attack_box.x += move_x;
  enemy.y += move_y;
  enemy.player_detection_box.y += move_y;
  enemy.player_aggro_box.y += move_y;
  enemy.player_attack_box.y += move_y;
}

function removeAndReplaceEnemy(enemyToRemove){
  var index = enemies.map(enemy => enemy.id).indexOf(enemyToRemove.id);
  enemies.splice(index, 1);
  enemies.push(createEnemy(Math.random() * 600, Math.random() * 600));
}

function hitEnemy(enemy, damage) {
  enemy.health -= damage;
  if(debug_module.debug){
    debug_module.writeOutDebug('enemy health: ' + enemy.health);
  }
  if(enemy.health <= 0) {
    removeAndReplaceEnemy(enemy)
  }
}

function attack(enemy, player) {
  let animationFrame = enemy.attackAnimationFrame
  switch(true) {
    case animationFrame < 10:
      windingUp(enemy);
      break;
    case animationFrame < 20:
      attacking(enemy);
      break;
    case animationFrame < 29:
      windingDown(enemy);
      break;
    case animationFrame === 29:
      setAttacking(enemy, false);
      enemy.hitPlayer = false;
      break;
  }
  animationFrame += 1
  enemy.attackAnimationFrame = animationFrame % 30
}

function windingUp(enemy) {
  drawWindUpAttack();
}

function drawWindUpAttack() {

}

function windingDown(enemy) {
}

function attacking(enemy) {
  if (collisionDetection(player_module.getPlayer(), enemy.player_attack_box) && !enemy.hitPlayer){
    player_module.updateHealth(-40);
    enemy.hitPlayer = true;
  }
}

function moveEnemies() {
  let aggroEnemies = enemies.filter(getAggro);
  aggroEnemies.filter(e => !getAttacking(e)).map(enemy => moveEnemyToward(enemy, player_module.getPlayer()));
  enemies.filter(e => getAttacking(e)).map(enemy => attack(enemy, player_module.getPlayer()));
}

function playerEnemyCollision() {
  enemies.filter(e => collisionDetection(player_module.getPlayer(), e)).map(enemy => {
      player_module.updateHealth(-40);
      removeAndReplaceEnemy(enemy);
  });
}

function playerEnemyDetectionBoxCollision() {
  enemies.filter(enemy => collisionDetection(player_module.getPlayer(), enemy.player_detection_box)).map(enemy => setAggro(enemy, true));
}

function playerEnemyDeaggroBoxCollision() {
  enemies.filter(enemy => !collisionDetection(player_module.getPlayer(), enemy.player_aggro_box)).map(enemy => setAggro(enemy, false));
}

function playerEnemyAttackBoxCollision() {
  enemies.filter(enemy => collisionDetection(player_module.getPlayer(), enemy.player_attack_box)).map(enemy => setAttacking(enemy, true));
}

function collisionDetection(firstThing, secondThing){
  return firstThing.x < secondThing.x + secondThing.w && firstThing.x + firstThing.w > secondThing.x &&
  firstThing.y < secondThing.y + secondThing.h && firstThing.h + firstThing.y > secondThing.y;
}

module.exports = {
  enemies : enemies,
  addEnemy : addEnemy,
  drawEnemies : drawEnemies,
  removeAndReplaceEnemy : removeAndReplaceEnemy,
  setAggro : setAggro,
  setAttacking : setAttacking,
  hitEnemy : hitEnemy,
  moveEnemies : moveEnemies,
  playerEnemyCollision : playerEnemyCollision,
  playerEnemyDetectionBoxCollision : playerEnemyDetectionBoxCollision,
  playerEnemyDeaggroBoxCollision : playerEnemyDeaggroBoxCollision,
  playerEnemyAttackBoxCollision : playerEnemyAttackBoxCollision
}
