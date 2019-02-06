var playerModule = require('./player/player.js')
var pebbleModule = require('./pebble/pebble.js')
var enemyService = require('./enemy/enemyService.js')
var levelService = require('./levels/levelService.js')

const RANGED_ATTACK_KEY_CODE = 88
const MELEE_ATTACK_KEY_CODE = 67
const LEFT_KEY_CODE = 37
const UP_KEY_CODE = 38
const RIGHT_KEY_CODE = 39
const DOWN_KEY_CODE = 40
const DASH_KEY_CODE = 32

var rightKey = false
var leftKey = false
var upKey = false
var downKey = false

var gameStarted = false

function getGameStarted () {
  return gameStarted
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
    } else if (!playerModule.getAlive()) {
      playerModule.setAlive(true)
      reset()
    } else if (enemyService.getEnemies().length === 0) {
      levelService.initialiseNextLevel()
    }
  }
}

function attackKeyHandler (e) {
  if (e.keyCode === MELEE_ATTACK_KEY_CODE && playerModule.getPlayer().state === 'idle') {
    playerModule.attack()
  }
  if (e.keyCode === RANGED_ATTACK_KEY_CODE && pebbleModule.getAmmo() > 0) {
    playerModule.rangedAttack()
    pebbleModule.takeOneFromAmmo()
  }
}

function dashKeyHandler (e) {
  if (e.keyCode === DASH_KEY_CODE && gameStarted && playerModule.getAlive()) {
    playerModule.dash()
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
}

function keyUp (e) {
  if (e.keyCode === RIGHT_KEY_CODE) rightKey = false
  else if (e.keyCode === LEFT_KEY_CODE) leftKey = false
  if (e.keyCode === UP_KEY_CODE) upKey = false
  else if (e.keyCode === DOWN_KEY_CODE) downKey = false
}

module.exports = {
  keyDown,
  keyUp,
  updateGameWorld,
  getGameStarted
}
