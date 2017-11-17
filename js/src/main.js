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
      if(debug) {
        debug_module.addDebugControls();
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

    function moveEnemies() {
      for (var i = 0; i < enemy_module.enemies.length; i++) {
        if(enemy_module.getAggro(enemy_module.enemies[i])){
          enemy_module.moveEnemy(enemy_module.enemies[i], player_module.getPlayer());
        }
      }
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
