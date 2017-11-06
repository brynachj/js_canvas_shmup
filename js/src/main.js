// TODO: Create player module
// TODO: Create eventlistner module

var debug_module = require('./debugControls.js');
var enemy_module = require('./enemy.js');
var draw_module = require('./draw.js');
var pebble_module = require('./pebble.js');
var pebble_pickup_module = require('./pebble_pickup.js');

const CANVAS = 'canvas', KEY_DOWN_EVENT = 'keydown', KEY_UP_EVENT = 'keyup';

var debug = true,
    canvas,
    ctx,
    width = 600,
    height = 600,
    player = {x : 10, y : height/2 - 13, w : 20, h : 26, hitBoxColor: '#7cfc00'},

    player_sprite,
    health = 100,
    experience = 0,

    gameStarted = false,
    alive = true,

    rightKey = false,
    leftKey = false,
    upKey = false,
    downKey = false;

    // Utility functions

    function reset() {
      health = 100;
      pebble_module.resetPebbleAmmo();
      experience = 0;
      player.x = 10, player.y = (height - player.h)/2;
      for (var i = 0; i < enemy_module.enemies.length; i++) {
        enemy_module.removeAndReplaceEnemy(enemy_module.enemies, i);
      }
    }

    function enemyHitTest() { // TODO: refactor to use collisionDetection function
      var remove = false;
      for (var i = 0; i < pebble_module.pebbles.length; i++) {
        for (var j = 0; j < enemy_module.enemies.length; j++) {
          if (pebble_module.pebbles[i].y <= (enemy_module.enemies[j].y + enemy_module.enemies[j].h) && pebble_module.pebbles[i].y >= enemy_module.enemies[j].y && pebble_module.pebbles[i].x >= enemy_module.enemies[j].x && pebble_module.pebbles[i].x <= (enemy_module.enemies[j].x + enemy_module.enemies[j].w)) {
            remove = true;
            enemy_module.removeAndReplaceEnemy(enemy_module.enemies, j);
            pebble_pickup_module.addToPebblePickups((Math.random() * 500) + 50, (Math.random() * 500) + 50);
          }
        }
        if (remove == true) {
          pebble_module.removeFromPebbles(i);
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
      for (var i = 0; i < enemy_module.enemies.length; i++) {
        collisionDetection(player, enemy_module.enemies[i], [[updatePlayerHealth, -40], [enemy_module.removeAndReplaceEnemy, enemy_module.enemies, i]]);
      }
    }

    function pebblePickupCollision() {
      for (var i = 0; i < pebble_pickup_module.pebblePickups.length; i++) {
        collisionDetection(player, pebble_pickup_module.pebblePickups[i], [[pickUpPebbles, i]]);
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
      ctx.fillText(pebble_module.ammo, 260, 30);
      ctx.fillText('Health:', 10, 60); // TODO: Replace with a health bar
      ctx.fillText(health, 68, 60);
    }

    // Initialisations

    enemy_module.addEnemy(Math.random() * 600, Math.random() * 600);

    function clearCanvas() {
      ctx.clearRect(0,0,width,height);
    }

    function init() {
      canvas = document.getElementById(CANVAS);
      ctx = canvas.getContext('2d');
      player_sprite = new Image();
      player_sprite.src = 'images/player_sprite.png';
      document.addEventListener(KEY_DOWN_EVENT, keyDown, false);
      document.addEventListener(KEY_UP_EVENT, keyUp, false);
      if(debug) {
        debug_module.addDebugControls();
      }
      gameLoop();
    }

    // Draw functions

    function drawPlayer() {
      draw_module.drawSprite(player_sprite, player, ctx);
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
      for (var i = 0; i < enemy_module.enemies.length; i++) {
        enemy_module.moveEnemy(enemy_module.enemies[i], player);
      }
    }

    // Event Listeners/Input handling

    function keyDown(e) {
      if (e.keyCode == 39) rightKey = true;
      else if (e.keyCode == 37) leftKey = true;
      if (e.keyCode == 38) upKey = true;
      else if (e.keyCode == 40) downKey = true;
      if (e.keyCode == 88 && pebble_module.ammo > 0){
        pebble_module.addToPebbles(player.x + 2, player.y + 13);
        pebble_module.takeOneFromAmmo();
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
        pebble_module.moveOnScreenPebbles();
        pebble_pickup_module.drawPebblePickup(ctx);
        enemy_module.drawEnemies(ctx);
        drawPlayer();
        pebble_module.drawOnScreenPebble(ctx);
      }
      updateText();
      game = setTimeout(gameLoop, 1000 / 40);
    }

    window.onload = init;
