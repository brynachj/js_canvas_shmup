var debug_module = require('./debugControls.js');
var player_module = require('./player.js');
var enemy_service = require('./enemy/enemyService.js');
var draw_module = require('./draw.js');
var pebble_module = require('./pebble.js');
var pebble_pickup_module = require('./pebblePickup.js');
var hud_module = require('./hud.js');
var collision_detection_module = require('./collisionDetection.js');

const CANVAS = 'canvas', KEY_DOWN_EVENT = 'keydown', KEY_UP_EVENT = 'keyup',
RANGED_ATTACK_KEY_CODE = 88, MELEE_ATTACK_KEY_CODE = 67,
LEFT_KEY_CODE = 37, UP_KEY_CODE = 38, RIGHT_KEY_CODE = 39, DOWN_KEY_CODE = 40;

var canvas,
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
      enemy_service.getEnemies().map(enemy => enemy_service.removeAndReplaceEnemy(enemy));
    }

    function enemyHitTest() { // should be in enemy classes
      var remove = false;
      pebble_module.pebbles.map(pebble => {
        enemy_service.getEnemies().filter(enemy => collision_detection_module.collisionDetection(pebble, enemy)).map(enemy => {
            enemy_service.damageEnemy(enemy, 15);
            pebble_module.removeFromPebbles(pebble); 
            player_module.addExperience(10); // Should be tied to damaging the enemy - 1/5 of damage done
            return;
        });
      });
    }

    function updateEnemies() {
      enemyHitTest();
      enemy_service.updateEnemies();
    }

    function pebblePickupCollision() {
      pebble_pickup_module.pebblePickups.filter(p => collision_detection_module.collisionDetection(player_module.getPlayer(), p)).map(p => pickUpPebbles(p));
    }

    function pickUpPebbles(pebble) {
      pebble_module.addToAmmo(3);
      pebble_pickup_module.removeFromPebblePickups(pebble);
    }

    function updateText() {
      if (!gameStarted) {
        hud_module.startScreen(draw_module.ctx);
      }
        hud_module.updateHud(draw_module.ctx);
      if (!player_module.getAlive()) {
        hud_module.deathScreen(draw_module.ctx);
      }
    }

    // Initialisations
    enemy_service.addEnemy(Math.random() * 600, Math.random() * 600);

    function clearCanvas() {
      draw_module.ctx.clearRect(0,0,width,height);
    }

    function init() {
      canvas = document.getElementById(CANVAS);
      draw_module.ctx = canvas.getContext('2d');
      document.addEventListener(KEY_DOWN_EVENT, keyDown, false);
      document.addEventListener(KEY_UP_EVENT, keyUp, false);
      if(debug_module.debug) {
        debug_module.addDebugControls();
        debug_module.addCheckBoxEventListeners();
      }
      gameLoop();
    }

    // Event Listeners/Input handling

    function keyDown(e) {
      if (e.keyCode === RIGHT_KEY_CODE) rightKey = true;
      else if (e.keyCode === LEFT_KEY_CODE) leftKey = true;
      if (e.keyCode === UP_KEY_CODE) upKey = true;
      else if (e.keyCode === DOWN_KEY_CODE) downKey = true;
      if (e.keyCode === MELEE_ATTACK_KEY_CODE & player_module.getPlayer().state === 'idle') {
        player_module.attack();
      }
      if (e.keyCode === RANGED_ATTACK_KEY_CODE && pebble_module.getAmmo() > 0){
        pebble_module.addToPebbles(player_module.getPlayer().x + 2, player_module.getPlayer().y + 13);
        pebble_module.takeOneFromAmmo();
      }
      if(e.keyCode === 32){
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
      if (e.keyCode === 39) rightKey = false;
      else if (e.keyCode === 37) leftKey = false;
      if (e.keyCode === 38) upKey = false;
      else if (e.keyCode === 40) downKey = false;
    }

    function gameLoop() {
      clearCanvas();
      if(player_module.getAlive() && gameStarted){
        updateEnemies();
        pebblePickupCollision();
        player_module.updatePlayer(rightKey, leftKey, upKey, downKey);
        pebble_module.moveOnScreenPebbles();
        pebble_pickup_module.drawPebblePickup(draw_module.ctx);
        pebble_module.drawOnScreenPebble(draw_module.ctx);
      }
      updateText();
      game = setTimeout(gameLoop, 1000 / 40);
    }

    window.onload = init;
