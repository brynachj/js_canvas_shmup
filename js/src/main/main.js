var debugModule = require('./debugControls.js')
var playerModule = require('./player/player.js')
var enemyService = require('./enemy/enemyService.js')
var drawModule = require('./draw.js')
var pebbleModule = require('./pebble.js')
var pebblePickupModule = require('./pebblePickup.js')
var hudModule = require('./hud.js')
var collisionDetectionModule = require('./collisionDetection.js')
var eventListener = require('./eventListener.js')

const CANVAS = 'canvas'

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
  if (!eventListener.getGameStarted()) {
    hudModule.startScreen(drawModule.ctx)
  }
  hudModule.updateHud(drawModule.ctx)
  if (!playerModule.getAlive()) {
    hudModule.deathScreen(drawModule.ctx)
  }
}

// Initialisations
enemyService.addEnemy(Math.random() * 600, Math.random() * 600)

function clearCanvas () {
  drawModule.ctx.clearRect(0, 0, width, height)
}

function init () {
  canvas = document.getElementById(CANVAS)
  drawModule.ctx = canvas.getContext('2d')
  eventListener.initialiseEventListeners()
  if (debugModule.debug) {
    debugModule.addDebugControls()
    debugModule.addCheckBoxEventListeners()
  }
  gameLoop()
}

function gameLoop () {
  clearCanvas()
  if (playerModule.getAlive() && eventListener.getGameStarted()) {
    updateEnemies()
    pebblePickupCollision()
    eventListener.updateGameWorld()
    pebbleModule.moveOnScreenPebbles()
    pebblePickupModule.drawPebblePickup(drawModule.ctx)
    pebbleModule.drawOnScreenPebble(drawModule.ctx)
  }
  updateText()
  setTimeout(gameLoop, 1000 / 40)
}

window.onload = init
