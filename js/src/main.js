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
      enemy_module.enemies.map(enemy => enemy_module.removeAndReplaceEnemy(enemy));
    }

    function enemyHitTest() {
      var remove = false;
      pebble_module.pebbles.map(pebble => {
        enemy_module.enemies.filter(enemy => collisionDetection(pebble, enemy)).map(enemy => {
            enemy_module.hitEnemy(enemy, 50);
            pebble_pickup_module.addToPebblePickups((Math.random() * 500) + 50, (Math.random() * 500) + 50);
            pebble_module.removeFromPebbles(pebble);
            player_module.addExperience(10);
            return;
        });
      });
    }

    function playerEnemyCollision() {
      enemy_module.enemies.filter(e => collisionDetection(player_module.getPlayer(), e)).map(enemy => {
          player_module.updateHealth(-40);
          enemy_module.removeAndReplaceEnemy(enemy);
      });
    }

    function playerEnemyDetectionBoxCollision() {
      enemy_module.enemies.filter(enemy => collisionDetection(player_module.getPlayer(), enemy.player_detection_box)).map(enemy => enemy_module.setAggro(enemy, true));
    }

    function playerEnemyAttackBoxCollision() {
      enemy_module.enemies.filter(enemy => collisionDetection(player_module.getPlayer(), enemy.player_attack_box)).map(enemy => enemy_module.setAttacking(enemy, true));
      enemy_module.enemies.filter(enemy => !collisionDetection(player_module.getPlayer(), enemy.player_attack_box)).map(enemy => enemy_module.setAttacking(enemy, false));
    }

    function playerEnemyDeaggroBoxCollision() {
      enemy_module.enemies.filter(enemy => !collisionDetection(player_module.getPlayer(), enemy.player_aggro_box)).map(enemy => enemy_module.setAggro(enemy, false));
    }

    function updateEnemies() {
      enemyHitTest();
      playerEnemyCollision();
      playerEnemyDetectionBoxCollision();
      playerEnemyAttackBoxCollision();
      playerEnemyDeaggroBoxCollision();
      enemy_module.moveEnemies();
    }

    function pebblePickupCollision() {
      pebble_pickup_module.pebblePickups.filter(p => collisionDetection(player_module.getPlayer(), p)).map(p => pickUpPebbles(p));
    }

    function pickUpPebbles(pebble) {
      pebble_module.addToAmmo(3);
      pebble_pickup_module.removeFromPebblePickups(pebble);
    }

    function collisionDetection(firstThing, secondThing, callbackList){
      return firstThing.x < secondThing.x + secondThing.w && firstThing.x + firstThing.w > secondThing.x &&
      firstThing.y < secondThing.y + secondThing.h && firstThing.h + firstThing.y > secondThing.y;
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
        updateEnemies();
        pebblePickupCollision();
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
