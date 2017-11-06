// TODO: change pebble_sprite to sling ammo

var debug_module = require('./debugControls.js');
var enemy_module = require('./enemy.js');
var draw_module = require('./draw.js');
var pebble_module = require('./pebble.js');

const CANVAS = 'canvas', KEY_DOWN_EVENT = 'keydown', KEY_UP_EVENT = 'keyup';

var debug = true,
    canvas,
    ctx,
    width = 600,
    height = 600,
    player = {x : 10, y : height/2 - 13, w : 20, h : 26, hitBoxColor: '#7cfc00'},

    player_sprite,

    gameStarted = false,
    alive = true,

    enemyTotal = 1,
    enemies = [],

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
      player.x = 10, player.y = (height - player.h)/2;
      for (var i = 0; i < enemies.length; i++) {
        enemy_module.removeAndReplaceEnemy(enemies, i);
      }
    }

    function enemyHitTest() { // TODO: refactor to use collisionDetection function
      var remove = false;
      for (var i = 0; i < on_screen_pebbles.length; i++) {
        for (var j = 0; j < enemies.length; j++) {
          if (on_screen_pebbles[i].y <= (enemies[j].y + enemies[j].h) && on_screen_pebbles[i].y >= enemies[j].y && on_screen_pebbles[i].x >= enemies[j].x && on_screen_pebbles[i].x <= (enemies[j].x + enemies[j].w)) {
            remove = true;
            enemy_module.removeAndReplaceEnemy(enemies, j);
            placePebblePickup((Math.random() * 500) + 50, (Math.random() * 500) + 50);
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
        collisionDetection(player, enemies[i], [[updatePlayerHealth, -40], [enemy_module.removeAndReplaceEnemy, enemies, i]]);
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
      ctx.fillText(pebbleAmmo, 260, 30);
      ctx.fillText('Health:', 10, 60); // TODO: Replace with a health bar
      ctx.fillText(health, 68, 60);
    }

    // Initialisations

    for (var i = 0; i < enemyTotal; i++) {
      enemies.push(enemy_module.createEnemy(Math.random() * 600, Math.random() * 600));
    }

    function clearCanvas() {
      ctx.clearRect(0,0,width,height);
    }

    function init() {
      canvas = document.getElementById(CANVAS);
      ctx = canvas.getContext('2d');
      player_sprite = new Image();
      player_sprite.src = 'images/player_sprite.png';
      pebblePickup = new Image();
      pebblePickup.src = 'images/pebble_pickup.png';
      document.addEventListener(KEY_DOWN_EVENT, keyDown, false);
      document.addEventListener(KEY_UP_EVENT, keyUp, false);
      if(debug) {
        debug_module.addDebugControls();
      }
      gameLoop();
    }

    function placePebblePickup(x_arg, y_arg) {
      pebblePickups.push({x:x_arg, y:y_arg, w:pebble_pickup_w, h:pebble_pickup_h, hitBoxColor: '#000000'});
    }

    // Draw functions

    function drawPlayer() {
      draw_module.drawSprite(player_sprite, player, ctx);
    }

    function drawPebblePickup() {
      for(var i = 0; i < pebblePickups.length; i ++){
        draw_module.drawSprite(pebblePickup, pebblePickups[i], ctx);
      }
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
        enemy_module.moveEnemy(enemies[i], player);
      }
    }

    // Event Listeners/Input handling

    function keyDown(e) {
      if (e.keyCode == 39) rightKey = true;
      else if (e.keyCode == 37) leftKey = true;
      if (e.keyCode == 38) upKey = true;
      else if (e.keyCode == 40) downKey = true;
      if (e.keyCode == 88 && pebbleAmmo > 0){
        on_screen_pebbles.push(pebble_module.createPebble(player.x + 2, player.y));
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
        pebble_module.moveOnScreenPebbles(on_screen_pebbles);
        drawPebblePickup();
        enemy_module.drawEnemies(enemies, ctx);
        drawPlayer();
        pebble_module.drawOnScreenPebble(on_screen_pebbles, ctx);
      }
      updateText();
      game = setTimeout(gameLoop, 1000 / 40);
    }

    window.onload = init;
