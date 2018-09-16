var debug_module = require('./debugControls.js');
var player_module = require('./player.js');
var enemy_service = require('./enemy/enemyService.js');
var draw_module = require('./draw.js');
var pebble_module = require('./pebble.js');
var pebble_pickup_module = require('./pebblePickup.js');
var hud_module = require('./hud.js');
var collision_detection_module = require('./collisionDetection.js');
var eventListener = require('./eventListener.js')

const CANVAS = 'canvas'

var canvas
var width = 600
var height = 600

function enemyHitTest () { // should be in enemy classes
  pebble_module.pebbles.map(pebble => {
    enemy_service.getEnemies().filter(enemy => collision_detection_module.collisionDetection(pebble, enemy)).map(enemy => {
      enemy_service.damageEnemy(enemy, 15)
      pebble_module.removeFromPebbles(pebble)
      player_module.addExperience(10) // Should be tied to damaging the enemy - 1/5 of damage done
    })
  })
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
      if (!eventListener.getGameStarted()) {
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
      eventListener.initialiseEventListeners()
      if(debug_module.debug) {
        debug_module.addDebugControls();
        debug_module.addCheckBoxEventListeners();
      }
      gameLoop();
    }

    function gameLoop() {
      clearCanvas();
      if(player_module.getAlive() && eventListener.getGameStarted()){
        updateEnemies();
        pebblePickupCollision();
        eventListener.updateGameWorld()
        pebble_module.moveOnScreenPebbles();
        pebble_pickup_module.drawPebblePickup(draw_module.ctx);
        pebble_module.drawOnScreenPebble(draw_module.ctx);
      }
      updateText();
      game = setTimeout(gameLoop, 1000 / 40);
    }

    window.onload = init;
