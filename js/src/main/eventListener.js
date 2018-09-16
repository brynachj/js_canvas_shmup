var playerModule = require('./player.js')
var pebbleModule = require('./pebble.js')
var enemyService = require('./enemy/enemyService.js')

const KEY_DOWN_EVENT = 'keydown'
const KEY_UP_EVENT = 'keyup'
const RANGED_ATTACK_KEY_CODE = 88
const MELEE_ATTACK_KEY_CODE = 67
const LEFT_KEY_CODE = 37
const UP_KEY_CODE = 38
const RIGHT_KEY_CODE = 39
const DOWN_KEY_CODE = 40
const DASH_KEY_CODE = 32 // spacebar

var rightKey = false
var leftKey = false
var upKey = false
var downKey = false

var gameStarted = false

function getGameStarted () {
  return gameStarted
}

function initialiseEventListeners () {
  document.addEventListener(KEY_DOWN_EVENT, keyDown, false)
  document.addEventListener(KEY_UP_EVENT, keyUp, false)
}

function updateGameWorld () {
  playerModule.updatePlayer(rightKey, leftKey, upKey, downKey)
}

function keyDown (e) {
  directionKeyHandler(e)
  attackKeyHandler(e)
  dashKeyHandler(e)
  newGameKeyHandler(e)
}

function newGameKeyHandler (e) {
  if (e.keyCode === DASH_KEY_CODE) {
    if (!gameStarted) {
      gameStarted = true
    }
    if (!playerModule.getAlive()) {
      playerModule.setAlive(true)
      reset()
    }
  }
}

function attackKeyHandler (e) {
  if (e.keyCode === MELEE_ATTACK_KEY_CODE & playerModule.getPlayer().state === 'idle') {
    playerModule.attack()
  }
  if (e.keyCode === RANGED_ATTACK_KEY_CODE && pebbleModule.getAmmo() > 0) {
    pebbleModule.addToPebbles(playerModule.getPlayer().x + 2, playerModule.getPlayer().y + 13)
    pebbleModule.takeOneFromAmmo()
  }
}

function dashKeyHandler (e) {
  if (e.keyCode === DASH_KEY_CODE && gameStarted) {
    console.log('dash')
  }
}

function directionKeyHandler (e) {
  if (e.keyCode === RIGHT_KEY_CODE) rightKey = true
  else if (e.keyCode === LEFT_KEY_CODE) leftKey = true
  if (e.keyCode === UP_KEY_CODE) upKey = true
  else if (e.keyCode === DOWN_KEY_CODE) downKey = true
}

function reset () {
  pebbleModule.resetPebbleAmmo()
  playerModule.resetPlayer()
  enemyService.getEnemies().map(enemy => enemyService.removeAndReplaceEnemy(enemy))
}

function keyUp (e) {
  if (e.keyCode === 39) rightKey = false
  else if (e.keyCode === 37) leftKey = false
  if (e.keyCode === 38) upKey = false
  else if (e.keyCode === 40) downKey = false
}

module.exports = {
  initialiseEventListeners,
  updateGameWorld,
  getGameStarted
}
