var debugModule = require('./debugControls.js')
var playerModule = require('./player/player.js')
var enemyService = require('./enemy/enemyService.js')
var drawModule = require('./draw.js')
var pebbleModule = require('./pebble.js')
var pebblePickupModule = require('./pebblePickup.js')
var hudModule = require('./hud.js')
var collisionDetectionModule = require('./collisionDetection.js')
var keyHandler = require('./keyHandler.js')
var constants = require('./constants.js')
var wallService = require('./wallService.js')

var canvas
var width = 600
var height = 600

function enemyHitTest () { // should be in enemy classes
  pebbleModule.pebbles.map(pebble => {
    enemyService.getEnemies().filter(enemy => collisionDetectionModule.collisionDetection(pebble, enemy)).map(enemy => {
      enemyService.damageEnemy(enemy, 15)
      pebbleModule.removeFromPebbles(pebble)
      playerModule.addExperience(10) // Should be tied to damaging the enemy - 1/5 of damage done
    })
  })
}

function updateEnemies () {
  enemyHitTest()
  enemyService.updateEnemies()
}

function pebblePickupCollision () {
  pebblePickupModule.pebblePickups.filter(p => collisionDetectionModule.collisionDetection(playerModule.getPlayer(), p)).map(p => pickUpPebbles(p))
}

function pickUpPebbles (pebble) {
  pebbleModule.addToAmmo(3)
  pebblePickupModule.removeFromPebblePickups(pebble)
}

function updateText () {
  if (!keyHandler.getGameStarted()) {
    hudModule.startScreen(drawModule.ctx)
  }
  hudModule.updateHud(drawModule.ctx)
  if (!playerModule.getAlive()) {
    hudModule.deathScreen(drawModule.ctx)
  }
}

// Initialisations
enemyService.addEnemy(Math.random() * 600, Math.random() * 600)

wallService.addWall(Math.random() * 600, Math.random() * 600)

function clearCanvas () {
  drawModule.ctx.clearRect(0, 0, width, height)
}

function init () {
  canvas = document.getElementById(constants.CANVAS)
  drawModule.ctx = canvas.getContext('2d')
  document.addEventListener(constants.KEY_DOWN_EVENT, keyHandler.keyDown, false)
  document.addEventListener(constants.KEY_UP_EVENT, keyHandler.keyUp, false)
  if (debugModule.debug) {
    debugModule.addDebugControls()
    debugModule.addCheckBoxEventListeners()
  }
  gameLoop()
}

function gameLoop () {
  clearCanvas()
  if (playerModule.getAlive() && keyHandler.getGameStarted()) {
    updateEnemies()
    pebblePickupCollision()
    keyHandler.updateGameWorld()
    pebbleModule.moveOnScreenPebbles()
    pebblePickupModule.drawPebblePickup(drawModule.ctx)
    pebbleModule.drawOnScreenPebble(drawModule.ctx)
  }
  updateText()
  setTimeout(gameLoop, 1000 / 40)
}

window.onload = init
