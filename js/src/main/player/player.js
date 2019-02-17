var playerDrawer = require('./playerDrawer.js')
var playerMovement = require('./playerMovement.js')
var playerAttack = require('./playerAttack.js')
var constants = require('../shared/constants.js')
var pebbleModule = require('../bullet/bullet.js')

let player
let health
let alive = true

function createPlayer (x1, y1) {
  return {x: x1,
    y: y1,
    w: constants.PLAYER_WIDTH,
    h: constants.PLAYER_HEIGHT,
    hitBoxColor: '#7cfc00',
    state: constants.IDLE,
    attackAnimationFrame: 0,
    dashAnimationFrame: 0,
    attack_box: {x: x1 + constants.PLAYER_WIDTH, y: y1 - 5, w: constants.ATTACK_WIDTH, h: constants.PLAYER_HEIGHT + 10, hitBoxColor: '#ff6961'},
    facing: constants.RIGHT}
}

function getPlayer () {
  if (player === undefined) {
    resetPlayer()
  }
  return player
}

function resetPlayer () {
  health = 100
  player = createPlayer(100, 287)
}

function getHealth () {
  return health
}

function getAlive () {
  return alive
}

function setAlive (isAlive) {
  alive = isAlive
}

function updateHealth (value) {
  health += value
  if (health > 0) {
    // TODO: iframes and such
  } else {
    alive = false
  }
}

function updatePlayer (rightKey, leftKey, upKey, downKey) {
  if (player.state === constants.DASHING) {
    playerMovement.dash(player, rightKey, leftKey, upKey, downKey)
  }
  if (player.state === constants.ATTACKING || player.state === constants.WINDING_DOWN) {
    playerAttack.attack(player)
  }
  playerMovement.movePlayer(player, rightKey, leftKey, upKey, downKey)
  playerMovement.facePlayer(player, rightKey, leftKey, upKey, downKey)
  playerDrawer.drawPlayer(player)
}

function attack () {
  if (player.state === constants.IDLE) {
    player.state = constants.ATTACKING
  }
}

function rangedAttack () {
  pebbleModule.addToPebbles(player)
}

function dash () {
  if (player.state === constants.IDLE) {
    player.state = constants.DASHING
  }
}

module.exports = {
  getPlayer,
  resetPlayer,
  updateHealth,
  getHealth,
  getAlive,
  setAlive,
  updatePlayer,
  attack,
  rangedAttack,
  dash
}
