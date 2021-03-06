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
var MobileDetect = require('mobile-detect')
var mobileService = require('./mobileService.js')

var md = new MobileDetect(window.navigator.userAgent)

var canvas
var width = 600
var height = 600
var firstTime = true

function enemyHitTest () { // should be in enemy classes
  bulletModule.bullets.map(bullet => {
    enemyService.getEnemies().filter(enemy => collisionDetectionModule.collisionDetection(bullet, enemy)).map(enemy => {
      enemyService.damageEnemy(enemy, 15)
      bulletModule.removeFromBullets(bullet)
    })
  })
}

function updateEnemies () {
  enemyHitTest()
  enemyService.updateEnemies()
}

function bulletPickupCollision () {
  bulletPickupModule.bulletPickups.filter(p => collisionDetectionModule.collisionDetection(playerModule.getPlayer(), p)).map(p => pickUpBullets(p))
}

function pickUpBullets (bullet) {
  bulletModule.addToAmmo(3)
  bulletPickupModule.removeFromBulletPickups(bullet)
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
}

function clearCanvas () {
  drawModule.ctx.clearRect(0, 0, width, height)
}

function init () {
  if (md.mobile()) {
    mobileService.replaceContentWithMobileSpecificContent()
  } else {
    document.getElementById('instructions').classList.add('desktopInstructions')
  }
  var overlay = document.getElementById('overlay')
  overlay.style.transition = 'opacity 1s'
  overlay.style.opacity = 0
  canvas = document.getElementById(constants.CANVAS)
  drawModule.ctx = canvas.getContext('2d')
  document.addEventListener(constants.KEY_DOWN_EVENT, keyHandler.keyDown, false)
  document.addEventListener(constants.KEY_UP_EVENT, keyHandler.keyUp, false)
  levelService.initialiseNextLevel()
  if (debugModule.debug) {
    debugModule.addDebugControls()
    debugModule.addCheckBoxEventListeners()
  }
  gameLoop()
}

function gameLoop () {
  clearCanvas()
  if (playerModule.getAlive() && keyHandler.getGameStarted() && enemyService.getEnemies().length !== 0) {
    if (firstTime) {
      firstTime = false
    }
    updateEnemies()
    bulletPickupCollision()
    keyHandler.updateGameWorld()
    bulletModule.moveOnScreenBullets()
    bulletPickupModule.drawBulletPickup(drawModule.ctx)
    bulletModule.drawOnScreenBullet(drawModule.ctx)
    bulletModule.updateAmmoCount()
    wallService.updateWalls()
  }
  updateText()
  setTimeout(gameLoop, 1000 / 40)
}

window.onload = init
