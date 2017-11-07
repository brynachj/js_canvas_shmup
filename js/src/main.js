// TODO: Create eventlistner module
// TODO: Create HUD module

var debug_module = require('./debugControls.js');
var player_module = require('./player.js');
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
        updateHud();
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

    function updateHud() {
      ctx.font = 'bold 18px Arial';
      ctx.fillStyle = '#fff';
      ctx.fillText('Experience: ', 10, 30);
      ctx.fillText(player_module.getExperience(), 120, 30);
      ctx.fillText('Pebbles: ', 160, 30);
      ctx.fillText(pebble_module.ammo, 260, 30);
      ctx.fillText('Health:', 10, 60); // TODO: Replace with a health bar
      ctx.fillText(player_module.getHealth(), 68, 60);
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
