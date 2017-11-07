(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// TODO: Find a way around having drawHitboxes at window scope
const DEBUG_DIV = 'debug-controls';

window.drawHitboxes = false;

module.exports = {
  addDebugControls : function() {
    debugDiv = document.getElementById(DEBUG_DIV);
    debugDiv.innerHTML = '<h1>Debug</h1>';
    debugDiv.innerHTML += '<input type="checkbox" id="hitbox_toggle" >Show HitBoxes</input>';
    var checkbox = document.getElementById('hitbox_toggle');

    checkbox.addEventListener( 'change', function() {
      window.drawHitboxes = this.checked;
    });
  }
}

},{}],2:[function(require,module,exports){

 function drawHitbox(object, ctx) {
  ctx.strokeStyle=object.hitBoxColor;
  ctx.strokeRect(object.x,object.y,object.w, object.h);
}

 function drawSprite(sprite, object, ctx) {
  ctx.drawImage(sprite, object.x, object.y);
  if(window.drawHitboxes){
    drawHitbox(object, ctx);
  }
}

module.exports = {
  drawSprite: drawSprite,
  drawHitbox: drawHitbox
}

},{}],3:[function(require,module,exports){
var draw_module = require('./draw.js');

const WIDTH = 34, HEIGHT = 36, SPEED = 3;

enemy_sprite = new Image();
enemy_sprite.src = 'images/enemy_sprite.png';

var enemies = [];

function addEnemy(x,y){
  enemies.push(createEnemy(x,y));
}

function createEnemy(x1, y1) {
  return {x:x1, y:y1, w:WIDTH, h:HEIGHT, speed:SPEED, hitBoxColor: '#ff0000',
        player_detection_box : {x:x1-60, y:y1-60, w:WIDTH+120, h:HEIGHT+120, hitBoxColor: '#ff8c00'},
        player_aggro_box : {x:x1-80, y:y1-80, w:WIDTH+160, h:HEIGHT+160, hitBoxColor: '#ffff00'}
      };
}

function drawEnemies(ctx) {
  for (var i = 0; i < enemies.length; i++) {
    draw_module.drawSprite(enemy_sprite, enemies[i], ctx);
    if(window.drawHitboxes){
      draw_module.drawHitbox(enemies[i].player_detection_box, ctx);
      draw_module.drawHitbox(enemies[i].player_aggro_box, ctx);
    }
  }
}

function moveEnemy(enemy, target) {
  if (enemy.x < target.x) {
    enemy.x += enemy.speed;
    enemy.player_detection_box.x += enemy.speed;
    enemy.player_aggro_box.x += enemy.speed;
  }
  if (enemy.x > target.x) {
    enemy.x -= enemy.speed;
    enemy.player_detection_box.x -= enemy.speed;
    enemy.player_aggro_box.x -= enemy.speed;
  }
  if (enemy.y < target.y) {
    enemy.y += enemy.speed;
    enemy.player_detection_box.y += enemy.speed;
    enemy.player_aggro_box.y += enemy.speed;
  }
  if (enemy.y > target.y) {
    enemy.y -= enemy.speed;
    enemy.player_detection_box.y -= enemy.speed;
    enemy.player_aggro_box.y -= enemy.speed;
  }
}

function removeAndReplaceEnemy(enemies, i){
  enemies.splice(i, 1);
  enemies.push(createEnemy(Math.random() * 600, Math.random() * 600));
}

module.exports = {
  enemies : enemies,
  addEnemy : addEnemy,
  moveEnemy : moveEnemy,
  drawEnemies : drawEnemies,
  removeAndReplaceEnemy : removeAndReplaceEnemy
}

},{"./draw.js":2}],4:[function(require,module,exports){
var player_module = require('./player.js');
var pebble_module = require('./pebble.js');

function updateHud(ctx) {
  ctx.font = 'bold 18px Arial';
  ctx.fillStyle = '#fff';
  ctx.fillText('Experience: ', 10, 30);
  ctx.fillText(player_module.getExperience(), 120, 30);
  ctx.fillText('Pebbles: ', 160, 30);
  ctx.fillText(pebble_module.ammo, 260, 30);
  ctx.fillText('Health:', 10, 60); // TODO: Replace with a health bar
  ctx.fillText(player_module.getHealth(), 68, 60);
}

module.exports = {
  updateHud : updateHud
}

},{"./pebble.js":6,"./player.js":8}],5:[function(require,module,exports){
// TODO: Create eventlistner module

var debug_module = require('./debugControls.js');
var player_module = require('./player.js');
var enemy_module = require('./enemy.js');
var draw_module = require('./draw.js');
var pebble_module = require('./pebble.js');
var pebble_pickup_module = require('./pebble_pickup.js');
var hud_module = require('./hud.js');

const CANVAS = 'canvas', KEY_DOWN_EVENT = 'keydown', KEY_UP_EVENT = 'keyup';

var debug = true,
    canvas,
    ctx,
    width = 600,
    height = 600,

    gameStarted = false,

    rightKey = false,
    leftKey = false,
    upKey = false,
    downKey = false;

    // Utility functions

    function reset() {
      pebble_module.resetPebbleAmmo();
      player_module.resetPlayer();
      for (var i = 0; i < enemy_module.enemies.length; i++) {
        enemy_module.removeAndReplaceEnemy(enemy_module.enemies, i);
      }
    }

    function enemyHitTest() {
      var remove = false;
      for (var i = 0; i < pebble_module.pebbles.length; i++) {
        for (var j = 0; j < enemy_module.enemies.length; j++) {
          if(collisionDetection(pebble_module.pebbles[i], enemy_module.enemies[j],
          [[enemy_module.removeAndReplaceEnemy, enemy_module.enemies, j],
          [pebble_pickup_module.addToPebblePickups, (Math.random() * 500) + 50, (Math.random() * 500) + 50],
          [pebble_module.removeFromPebbles, i],
          [player_module.addExperience, 10]])){
            return;
          }
        }
      }
    }

    function playerEnemyCollision() {
      for (var i = 0; i < enemy_module.enemies.length; i++) {
        collisionDetection(player_module.getPlayer(), enemy_module.enemies[i], [[player_module.updateHealth, -40], [enemy_module.removeAndReplaceEnemy, enemy_module.enemies, i]]);
      }
    }

    function pebblePickupCollision() {
      for (var i = 0; i < pebble_pickup_module.pebblePickups.length; i++) {
        collisionDetection(player_module.getPlayer(), pebble_pickup_module.pebblePickups[i], [[pickUpPebbles, i]]);
      }
    }

    function pickUpPebbles(i) {
      pebble_module.addToAmmo(3);
      pebble_pickup_module.removeFromPebblePickups(i);
    }

    function collisionDetection(firstThing, secondThing, callbackList){
      if(firstThing.x < secondThing.x + secondThing.w &&
        firstThing.x + firstThing.w > secondThing.x &&
        firstThing.y < secondThing.y + secondThing.h &&
        firstThing.h + firstThing.y > secondThing.y) {
        for(var i = 0; i < callbackList.length; i++){
          callbackList[i][0].apply(this, callbackList[i].slice(1));
        }
        return true;
      }
      return false;
    }

    function updateText() {
      if (!gameStarted) {
        startScreen();
      }
        hud_module.updateHud(ctx);
      if (!player_module.getAlive()) {
        deathScreen();
      }
    }

    function startScreen() {
      ctx.font = 'bold 50px VT323';
      ctx.fillText('Canvas Shooter', width / 2 - 150, height / 2);
      ctx.font = 'bold 20px VT323';
      ctx.fillText('Hit SPACE to Play', width / 2 - 56, height / 2 + 30);
      ctx.fillText('Use arrow keys to move', width / 2 - 100, height / 2 + 60);
      ctx.fillText('Use the x key to shoot', width / 2 - 100, height / 2 + 90);
    }

    function deathScreen() {
      ctx.fillText('Game Over!', width/2 - 50, height / 2);
      ctx.fillText('Press SPACE to continue', 252, (height / 2) + 35);
    }

    // Initialisations

    enemy_module.addEnemy(Math.random() * 600, Math.random() * 600);

    function clearCanvas() {
      ctx.clearRect(0,0,width,height);
    }

    function init() {
      canvas = document.getElementById(CANVAS);
      ctx = canvas.getContext('2d');
      document.addEventListener(KEY_DOWN_EVENT, keyDown, false);
      document.addEventListener(KEY_UP_EVENT, keyUp, false);
      if(debug) {
        debug_module.addDebugControls();
      }
      gameLoop();
    }

    // Move functions

    function movePlayer() {
      if (rightKey) player_module.getPlayer().x += 5;
      else if (leftKey) player_module.getPlayer().x -= 5;
      if (upKey) player_module.getPlayer().y -= 5;
      else if (downKey) player_module.getPlayer().y += 5;
      if (player_module.getPlayer().x <= 0) player_module.getPlayer().x = 0;
      if ((player_module.getPlayer().x + player_module.getPlayer().w) >= width) player_module.getPlayer().x = width - player_module.getPlayer().w;
      if (player_module.getPlayer().y <= 0) player_module.getPlayer().y = 0;
      if ((player_module.getPlayer().y + player_module.getPlayer().h) >= height) player_module.getPlayer().y = height - player_module.getPlayer().h;
    }

    function moveEnemies() {
      for (var i = 0; i < enemy_module.enemies.length; i++) {
        enemy_module.moveEnemy(enemy_module.enemies[i], player_module.getPlayer());
      }
    }

    // Event Listeners/Input handling

    function keyDown(e) {
      if (e.keyCode == 39) rightKey = true;
      else if (e.keyCode == 37) leftKey = true;
      if (e.keyCode == 38) upKey = true;
      else if (e.keyCode == 40) downKey = true;
      if (e.keyCode == 88 && pebble_module.ammo > 0){
        pebble_module.addToPebbles(player_module.getPlayer().x + 2, player_module.getPlayer().y + 13);
        pebble_module.takeOneFromAmmo();
      }
      if(e.keyCode == 32){
        if(!gameStarted){
          gameStarted = true;
        }
        if(!player_module.getAlive()) {
          player_module.setAlive(true);
          reset();
        }
      }
    }

    function keyUp(e) {
      if (e.keyCode == 39) rightKey = false;
      else if (e.keyCode == 37) leftKey = false;
      if (e.keyCode == 38) upKey = false;
      else if (e.keyCode == 40) downKey = false;
    }

    function gameLoop() {
      clearCanvas();
      if(player_module.getAlive() && gameStarted){
        enemyHitTest();
        playerEnemyCollision();
        pebblePickupCollision();
        moveEnemies();
        movePlayer();
        pebble_module.moveOnScreenPebbles();
        pebble_pickup_module.drawPebblePickup(ctx);
        enemy_module.drawEnemies(ctx);
        player_module.drawPlayer(ctx);
        pebble_module.drawOnScreenPebble(ctx);
      }
      updateText();
      game = setTimeout(gameLoop, 1000 / 40);
    }

    window.onload = init;

},{"./debugControls.js":1,"./draw.js":2,"./enemy.js":3,"./hud.js":4,"./pebble.js":6,"./pebble_pickup.js":7,"./player.js":8}],6:[function(require,module,exports){
var draw_module = require('./draw.js');

const WIDTH = 4, HEIGHT = 5, SPEED = 10;

pebble_sprite = new Image();
pebble_sprite.src = 'images/pebble.png';

var pebbles = [];
var ammo = 10;

function resetPebbleAmmo() {
  ammo = 10;
}

function takeOneFromAmmo() {
  ammo--;
}

function addToAmmo(i) {
  ammo += i;
}

function addToPebbles(x, y) {
  pebbles.push(createPebble(x,y));
}

function removeFromPebbles(i) {
  pebbles.splice(i,1);
}

function createPebble(x1, y1) {
  return {x:x1, y:y1, w:WIDTH, h:HEIGHT, hitBoxColor: '#00bfff'};
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

function drawOnScreenPebble(ctx) {
  if (pebbles.length)
    for (var i = 0; i < pebbles.length; i++) {
      draw_module.drawSprite(pebble_sprite, pebbles[i], ctx);
    }
}

module.exports = {
  pebbles : pebbles,
  createPebble : createPebble,
  moveOnScreenPebbles : moveOnScreenPebbles,
  drawOnScreenPebble : drawOnScreenPebble,
  addToPebbles : addToPebbles,
  removeFromPebbles : removeFromPebbles,

  resetPebbleAmmo : resetPebbleAmmo,
  takeOneFromAmmo : takeOneFromAmmo,
  addToAmmo : addToAmmo,
  ammo : ammo
}

},{"./draw.js":2}],7:[function(require,module,exports){
var draw_module = require('./draw.js');

const WIDTH = 10, HEIGHT = 13;

pebble_pickup_sprite = new Image();
pebble_pickup_sprite.src = 'images/pebble_pickup.png';

var pebblePickups = [];

function addToPebblePickups(x, y) {
  pebblePickups.push(createPebblePickup(x,y));
}

function removeFromPebblePickups(i) {
  pebblePickups.splice(i,1);
}

function createPebblePickup(x1, y1) {
  return {x:x1, y:y1 + 13, w:WIDTH, h:HEIGHT, hitBoxColor: '#00bfff'};
}

function drawPebblePickup(ctx) {
  for(var i = 0; i < pebblePickups.length; i ++){
    draw_module.drawSprite(pebble_pickup_sprite, pebblePickups[i], ctx);
  }
}

module.exports = {
  createPebblePickup : createPebblePickup,
  drawPebblePickup : drawPebblePickup,
  addToPebblePickups : addToPebblePickups,
  pebblePickups : pebblePickups,
  removeFromPebblePickups : removeFromPebblePickups
}

},{"./draw.js":2}],8:[function(require,module,exports){
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

},{"./draw.js":2}]},{},[5]);
