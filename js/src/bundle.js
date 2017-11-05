(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

const DEBUG_DIV = 'debug-controls';

window.drawHitboxes = false;

module.exports = {
  addDebugControls : function() {
    debugDiv = document.getElementById(DEBUG_DIV);
    debugDiv.innerHTML = '<h1>Debug</h1>';
    debugDiv.innerHTML += '<input type="checkbox" id="hitbox_toggle" >Show HitBoxes</input>';
    var checkbox = document.getElementById('hitbox_toggle');

    checkbox.addEventListener( 'change', function() {
      alert(this.checked);
      window.drawHitboxes = this.checked;
    });
  }
}

},{}],2:[function(require,module,exports){
// TODO: change pebble_sprite to sling ammo

var debugControls = require('./debugControls.js');

const CANVAS = 'canvas', KEY_DOWN_EVENT = 'keydown', KEY_UP_EVENT = 'keyup';

var debug = true,
    canvas,
    ctx,
    width = 600,
    height = 600,
    player = {x : 10, y : height/2 - 13, w : 20, h : 26, hitBoxColor: '#7cfc00'},

    player_sprite, pebble_sprite, enemy_sprite,

    gameStarted = false,
    alive = true,

    enemyTotal = 1,
    enemies = [],
    enemy_x = width + 45,
    enemy_y = 50,
    enemy_w = 34,
    enemy_h = 36,
    enemy_speed = 3,

    pebble_w = 4;
    pebble_h = 5;

    pebble_pickup_w = 10;
    pebble_pickup_h = 13;

    rightKey = false,
    leftKey = false,
    upKey = false,
    downKey = false,

    pebbleAmmo = 10, on_screen_pebbles = [], pebblePickups = [],

    health = 100,
    experience = 0;

    // Utility functions

    function reset() {
      health = 100;
      pebbleAmmo = 10;
      experience = 0;
      var enemy_reset_y = 50;
      player.x = 10, player.y = (height - player.h)/2;
      for (var i = 0; i < enemies.length; i++) {
        enemies[i].x = enemy_x;
        enemies[i].y = enemy_reset_y;
        enemy_reset_y = enemy_reset_y + enemy_w + 60;
      }
    }

    function removeAndReplaceEnemy(i){
      enemies.splice(i, 1);
      enemies.push(createEnemy(enemy_x, (Math.random() * 500) + 50, enemy_w, enemy_h, enemy_speed));
      placePebblePickup((Math.random() * 500) + 50, (Math.random() * 500) + 50);
    }

    function enemyHitTest() { // TODO: refactor to use collisionDetection function
      var remove = false;
      for (var i = 0; i < on_screen_pebbles.length; i++) {
        for (var j = 0; j < enemies.length; j++) {
          if (on_screen_pebbles[i].y <= (enemies[j].y + enemies[j].h) && on_screen_pebbles[i].y >= enemies[j].y && on_screen_pebbles[i].x >= enemies[j].x && on_screen_pebbles[i].x <= (enemies[j].x + enemies[j].w)) {
            remove = true;
            removeAndReplaceEnemy(j);
          }
        }
        if (remove == true) {
          on_screen_pebbles.splice(i, 1);
          remove = false;
          experience += 10;
        }
      }
    }

    function updatePlayerHealth(value) {
      health += value;
      if (health > 0) {
        // TODO: iframes and such
      } else {
        alive = false;
      }
    }

    function playerEnemyCollision() {
      for (var i = 0; i < enemies.length; i++) {
        collisionDetection(player, enemies[i], [[updatePlayerHealth, -40],[removeAndReplaceEnemy, i]]);
      }
    }

    function pebblePickupCollision() {
      for (var i = 0; i < pebblePickups.length; i++) {
        collisionDetection(player, pebblePickups[i], [[pickUpPebbles, i]]);
      }
    }

    function pickUpPebbles(i) {
      pebbleAmmo += 3;
      pebblePickups.splice(i,1);
    }

    function collisionDetection(firstThing, secondThing, callbackList){
      if(firstThing.x < secondThing.x + secondThing.w &&
        firstThing.x + firstThing.w > secondThing.x &&
        firstThing.y < secondThing.y + secondThing.h &&
        firstThing.h + firstThing.y > secondThing.y) {
        for(var i = 0; i < callbackList.length; i++){
          callbackList[i][0](callbackList[i][1]);
        }
      }
    }

    function updateText() {
      if (!gameStarted) {
        startScreen();
      }
        updateHud();
      if (!alive) {
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

    function updateHud() {
      ctx.font = 'bold 18px Arial';
      ctx.fillStyle = '#fff';
      ctx.fillText('Experience: ', 10, 30);
      ctx.fillText(experience, 120, 30);
      ctx.fillText('Pebbles: ', 160, 30);
      ctx.fillText(pebbleAmmo, 260, 30);
      ctx.fillText('Health:', 10, 60); // TODO: Replace with a health bar
      ctx.fillText(health, 68, 60);
    }

    // Initialisations

    function createEnemy(x1, y1, w1, h1, speed1) {
      return {x:x1, y:y1, w:w1, h:h1, speed:speed1, hitBoxColor: '#ff0000',
            player_detection_box : {x:x1-60, y:y1-60, w:w1+120, h:h1+120, hitBoxColor: '#ff8c00'},
            player_aggro_box : {x:x1-80, y:y1-80, w:w1+160, h:h1+160, hitBoxColor: '#ffff00'}
          };
    }

    for (var i = 0; i < enemyTotal; i++) {
      enemies.push(createEnemy(enemy_x, enemy_y, enemy_w, enemy_h, enemy_speed));
      // enemy_y += enemy_h + 60;
    }

    function clearCanvas() {
      ctx.clearRect(0,0,width,height);
    }

    function init() {
      canvas = document.getElementById(CANVAS);
      ctx = canvas.getContext('2d');
      enemy_sprite = new Image();
      enemy_sprite.src = 'images/enemy_sprite.png';
      player_sprite = new Image();
      player_sprite.src = 'images/player_sprite.png';
      pebble_sprite = new Image();
      pebble_sprite.src = 'images/pebble.png';
      pebblePickup = new Image();
      pebblePickup.src = 'images/pebble_pickup.png';
      // setInterval(gameLoop, 25); //40 fps
      document.addEventListener(KEY_DOWN_EVENT, keyDown, false);
      document.addEventListener(KEY_UP_EVENT, keyUp, false);
      if(debug) {
        debugControls.addDebugControls();
      }
      gameLoop();
    }

    function placePebblePickup(x_arg, y_arg) {
      pebblePickups.push({x:x_arg, y:y_arg, w:pebble_pickup_w, h:pebble_pickup_h, hitBoxColor: '#000000'});
    }

    // Draw functions

    function drawPlayer() {
      drawHelper(player_sprite, player);
    }

    function drawEnemies() {
      for (var i = 0; i < enemies.length; i++) {
        drawHelper(enemy_sprite, enemies[i]);
        if(window.drawHitboxes){
          drawHitbox(enemies[i].player_detection_box);
          drawHitbox(enemies[i].player_aggro_box);
          debug;
        }
      }
    }

    function drawOnScreenPebble() {
      if (on_screen_pebbles.length)
        for (var i = 0; i < on_screen_pebbles.length; i++) {
          drawHelper(pebble_sprite, on_screen_pebbles[i]);
        }
    }

    function drawPebblePickup() {
      for(var i = 0; i < pebblePickups.length; i ++){
        drawHelper(pebblePickup, pebblePickups[i]);
      }
    }

    function drawHelper(sprite, object) {
      ctx.drawImage(sprite, object.x, object.y);
      if(window.drawHitboxes){
        drawHitbox(object);
      }
    }

    function drawHitbox(object) {
      ctx.strokeStyle=object.hitBoxColor;
      ctx.strokeRect(object.x,object.y,object.w, object.h);
    }

    // Move functions

    function movePlayer() {
      if (rightKey) player.x += 5;
      else if (leftKey) player.x -= 5;
      if (upKey) player.y -= 5;
      else if (downKey) player.y += 5;
      if (player.x <= 0) player.x = 0;
      if ((player.x + player.w) >= width) player.x = width - player.w;
      if (player.y <= 0) player.y = 0;
      if ((player.y + player.h) >= height) player.y = height - player.h;
    }

    function moveEnemies() {
      for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].x < player.x) {
          enemies[i].x += enemies[i].speed;
          enemies[i].player_detection_box.x += enemies[i].speed;
          enemies[i].player_aggro_box.x += enemies[i].speed;
        }
        if (enemies[i].x > player.x) {
          enemies[i].x -= enemies[i].speed;
          enemies[i].player_detection_box.x -= enemies[i].speed;
          enemies[i].player_aggro_box.x -= enemies[i].speed;
        }
        if (enemies[i].y < player.y) {
          enemies[i].y += enemies[i].speed;
          enemies[i].player_detection_box.y += enemies[i].speed;
          enemies[i].player_aggro_box.y += enemies[i].speed;
        }
        if (enemies[i].y > player.y) {
          enemies[i].y -= enemies[i].speed;
          enemies[i].player_detection_box.y -= enemies[i].speed;
          enemies[i].player_aggro_box.y -= enemies[i].speed;
        }
      }
    }

    function moveOnScreenPebble() {
      for (var i = 0; i < on_screen_pebbles.length; i++) {
        if (on_screen_pebbles[i].x < width + pebble_sprite.width) {
          on_screen_pebbles[i].x += 10;
        } else {
          on_screen_pebbles.splice(i, 1);
        }
      }
    }

    // Event Listeners/Input handling

    function keyDown(e) {
      if (e.keyCode == 39) rightKey = true;
      else if (e.keyCode == 37) leftKey = true;
      if (e.keyCode == 38) upKey = true;
      else if (e.keyCode == 40) downKey = true;
      if (e.keyCode == 88 && pebbleAmmo > 0){
        on_screen_pebbles.push({x:player.x + 2, y:player.y + 13, w:pebble_w, h:pebble_h, hitBoxColor: '#00bfff'});
        pebbleAmmo--;
      }
      if(e.keyCode == 32){
        if(!gameStarted){
          gameStarted = true;
        }
        if(!alive) {
          alive = true;
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
      if(alive && gameStarted){
        enemyHitTest();
        playerEnemyCollision();
        pebblePickupCollision();
        moveEnemies();
        movePlayer();
        moveOnScreenPebble();
        drawPebblePickup();
        drawEnemies();
        drawPlayer();
        drawOnScreenPebble();
      }
      updateText();
      game = setTimeout(gameLoop, 1000 / 40);
    }

    window.onload = init;

},{"./debugControls.js":1}]},{},[2]);
