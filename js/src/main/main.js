var debugModule = require('./debugControls.js')
var playerModule = require('./player/player.js')
var enemyService = require('./enemy/enemyService.js')
var drawModule = require('./draw.js')
var bulletModule = require('./bullet/bullet.js')
var bulletPickupModule = require('./bullet/bulletPickup.js')
var hudModule = require('./hud.js')
var collisionDetectionModule = require('./shared/collisionDetection.js')
var keyHandler = require('./keyHandler.js')
var constants = require('./shared/constants.js')
var wallService = require('./wallService.js')
var levelService = require('./levels/levelService.js')
var audioModule = require('./audio.js')

var canvas
var width = 600
var height = 600

function enemyHitTest () { // should be in enemy classes
  bulletModule.bullets.map(bullet => {
    enemyService.getEnemies().filter(enemy => collisionDetectionModule.collisionDetection(bullet, enemy)).map(enemy => {
      enemyService.damageEnemy(enemy, 15)
      bulletModule.removeFromPebbles(bullet)
    })
  })
}

function updateEnemies () {
  enemyHitTest()
  enemyService.updateEnemies()
}

function bulletPickupCollision () {
  bulletPickupModule.bulletPickups.filter(p => collisionDetectionModule.collisionDetection(playerModule.getPlayer(), p)).map(p => pickUpPebbles(p))
}

function pickUpPebbles (bullet) {
  bulletModule.addToAmmo(3)
  bulletPickupModule.removeFromPebblePickups(bullet)
}

function updateText () {
  if (!keyHandler.getGameStarted()) {
    hudModule.startScreen(drawModule.ctx)
  } else if (!playerModule.getAlive()) {
    hudModule.deathScreen(drawModule.ctx)
    levelService.setLevelNumber(0)
    levelService.initialiseNextLevel()
  } else if (enemyService.getEnemies().length === 0) {
    if (levelService.getLevelNumber() < levelService.getLevels().length) {
      hudModule.nextLevelScreen(drawModule.ctx, levelService.getLevelNumber())
    } else {
      hudModule.gameCompleteScreen(drawModule.ctx)
    }
  }
  hudModule.updateHud(drawModule.ctx)
}

function clearCanvas () {
  drawModule.ctx.clearRect(0, 0, width, height)
}

function init () {
  canvas = document.getElementById(constants.CANVAS)
  drawModule.ctx = canvas.getContext('2d')
  document.addEventListener(constants.KEY_DOWN_EVENT, keyHandler.keyDown, false)
  document.addEventListener(constants.KEY_UP_EVENT, keyHandler.keyUp, false)
  levelService.initialiseNextLevel()
  if (debugModule.debug) {
    debugModule.addDebugControls()
    debugModule.addCheckBoxEventListeners()
  }
  audioModule.initialiseAudio()
  gameLoop()
}

function gameLoop () {
  clearCanvas()
  if (playerModule.getAlive() && keyHandler.getGameStarted() && enemyService.getEnemies().length !== 0) {
    updateEnemies()
    bulletPickupCollision()
    keyHandler.updateGameWorld()
    bulletModule.moveOnScreenPebbles()
    bulletPickupModule.drawPebblePickup(drawModule.ctx)
    bulletModule.drawOnScreenPebble(drawModule.ctx)
    wallService.updateWalls()
  }
  updateText()
  setTimeout(gameLoop, 1000 / 40)
}

window.onload = init
