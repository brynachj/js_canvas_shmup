(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// TODO: Find a way around having drawHitboxes at window scope
const DEBUG_DIV = 'debug-controls';

window.drawHitboxes = false;

function addDebugControls() {
  debugDiv = document.getElementById(DEBUG_DIV);
  debugDiv.innerHTML = '<h1>Debug</h1>';
  debugDiv.innerHTML += '<input type="checkbox" id="hitbox_toggle">Show HitBoxes</input>';
}

function addCheckBoxEventListeners() {
  var checkbox = document.getElementById('hitbox_toggle');
  console.log("setting up debug controls");

  checkbox.addEventListener( 'change', function() {
    window.drawHitboxes = this.checked;
    console.log("added hitbox event listener");
  });
}

function writeOutDebug(debugInfo) {
  debugDiv = document.getElementById(DEBUG_DIV);
  debugDiv.innerHTML += '<p>' + debugInfo + '</p>'
}

module.exports = {
  debug : true,
  addDebugControls : addDebugControls,
  addCheckBoxEventListeners :addCheckBoxEventListeners,
  writeOutDebug : writeOutDebug
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
var debug_module = require('./debugControls.js')
var player_module = require('./player.js');

const WIDTH = 34, HEIGHT = 36, SPEED = 3;

enemy_sprite = new Image();
enemy_sprite.src = 'images/enemy_sprite.png';

var enemies = [];

function addEnemy(x,y){
  enemies.push(createEnemy(x,y));
}

function createEnemy(x1, y1) {
  return {x:x1, y:y1, w:WIDTH, h:HEIGHT, speed:SPEED, hitBoxColor: '#ff0000', health: 100,
        player_detection_box : {x:x1-60, y:y1-60, w:WIDTH+120, h:HEIGHT+120, hitBoxColor: '#ff8c00'},
        player_aggro_box : {x:x1-80, y:y1-80, w:WIDTH+160, h:HEIGHT+160, hitBoxColor: '#ffff00'},
        aggro : false
      };
}

function getAggro(enemy) {
  return enemy.aggro;
}

function setAggro(enemy, aggroBool){
  enemy.aggro = aggroBool;
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

function hitEnemy(i, damage){
  enemies[i].health -= damage;
  if(debug_module.debug){
    debug_module.writeOutDebug('enemy health: ' + enemies[i].health);
  }
  if(enemies[i].health <= 0) {
    removeAndReplaceEnemy(enemies, i)
  }
}

function moveEnemies() {
  enemies.filter(getAggro).map(function(enemy){
    moveEnemy(enemy, player_module.getPlayer());
  });
  // for (var i = 0; i < enemies.length; i++) {
  //   if(getAggro(enemies[i])){
  //     moveEnemy(enemies[i], player_module.getPlayer());
  //   }
  // }
}

module.exports = {
  enemies : enemies,
  addEnemy : addEnemy,
  drawEnemies : drawEnemies,
  removeAndReplaceEnemy : removeAndReplaceEnemy,
  getAggro : getAggro,
  setAggro : setAggro,
  hitEnemy : hitEnemy,
  moveEnemies: moveEnemies
}

},{"./debugControls.js":1,"./draw.js":2,"./player.js":8}],4:[function(require,module,exports){
var player_module = require('./player.js');
var pebble_module = require('./pebble.js');

const WIDTH = 600, HEIGHT = 600;

function updateHud(ctx) {
  ctx.font = 'bold 18px Arial';
  ctx.fillStyle = '#fff';
  ctx.fillText('Experience: ', 10, 30);
  ctx.fillText(player_module.getExperience(), 120, 30);
  ctx.fillText('Pebbles: ', 160, 30);
  ctx.fillText(pebble_module.getAmmo(), 260, 30);
  ctx.fillText('Health:', 10, 60); // TODO: Replace with a health bar
  ctx.fillText(player_module.getHealth(), 68, 60);
}

function startScreen(ctx) {
  ctx.font = 'bold 50px VT323';
  ctx.fillText('Canvas Shooter', WIDTH / 2 - 150, HEIGHT / 2);
  ctx.font = 'bold 20px VT323';
  ctx.fillText('Hit SPACE to Play', WIDTH / 2 - 56, HEIGHT / 2 + 30);
  ctx.fillText('Use arrow keys to move', WIDTH / 2 - 100, HEIGHT / 2 + 60);
  ctx.fillText('Use the x key to shoot', WIDTH / 2 - 100, HEIGHT / 2 + 90);
}

function deathScreen(ctx) {
  ctx.fillText('Game Over!', WIDTH/2 - 50, HEIGHT / 2);
  ctx.fillText('Press SPACE to continue', 252, (HEIGHT / 2) + 35);
}

module.exports = {
  updateHud : updateHud,
  startScreen : startScreen,
  deathScreen : deathScreen
}

},{"./pebble.js":6,"./player.js":8}],5:[function(require,module,exports){
var debug_module = require('./debugControls.js');
var player_module = require('./player.js');
var enemy_module = require('./enemy.js');
var draw_module = require('./draw.js');
var pebble_module = require('./pebble.js');
var pebble_pickup_module = require('./pebble_pickup.js');
var hud_module = require('./hud.js');

const CANVAS = 'canvas', KEY_DOWN_EVENT = 'keydown', KEY_UP_EVENT = 'keyup';

var canvas,
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
          [[enemy_module.hitEnemy, j, 50],
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


    function playerEnemyDetectionBoxCollision() {
      for (var i = 0; i < enemy_module.enemies.length; i++) {
        if(collisionDetection(player_module.getPlayer(), enemy_module.enemies[i].player_detection_box, [])
        && player_module.getPlayer().isMoving){
          enemy_module.setAggro(enemy_module.enemies[i],true);
        }
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
        hud_module.startScreen(ctx);
      }
        hud_module.updateHud(ctx);
      if (!player_module.getAlive()) {
        hud_module.deathScreen(ctx);
      }
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
      if(debug_module.debug) {
        debug_module.addDebugControls();
        debug_module.addCheckBoxEventListeners();
      }
      gameLoop();
    }

    // Move functions

    function movePlayer() {
      player_module.getPlayer().isMoving = false;
      if (rightKey) {
        player_module.getPlayer().x += 5;
        player_module.getPlayer().isMoving = true;
      }
      else if (leftKey) {
        player_module.getPlayer().x -= 5;
        player_module.getPlayer().isMoving = true;
      }
      if (upKey) {
        player_module.getPlayer().y -= 5;
        player_module.getPlayer().isMoving = true;
      }
      else if (downKey) {
        player_module.getPlayer().y += 5;
        player_module.getPlayer().isMoving = true;
      }
      if (player_module.getPlayer().x <= 0) player_module.getPlayer().x = 0;
      if ((player_module.getPlayer().x + player_module.getPlayer().w) >= width) player_module.getPlayer().x = width - player_module.getPlayer().w;
      if (player_module.getPlayer().y <= 0) player_module.getPlayer().y = 0;
      if ((player_module.getPlayer().y + player_module.getPlayer().h) >= height) player_module.getPlayer().y = height - player_module.getPlayer().h;
    }

    // Event Listeners/Input handling

    function keyDown(e) {
      if (e.keyCode == 39) rightKey = true;
      else if (e.keyCode == 37) leftKey = true;
      if (e.keyCode == 38) upKey = true;
      else if (e.keyCode == 40) downKey = true;
      if (e.keyCode == 88 && pebble_module.getAmmo() > 0){
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
        playerEnemyDetectionBoxCollision();
        pebblePickupCollision();
        enemy_module.moveEnemies();
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

function getAmmo() {
  return ammo;
}

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
  getAmmo : getAmmo
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
