var playerDrawer = require('./playerDrawer.js')
var playerMovement = require('./playerMovement.js')
var playerAttack = require('./playerAttack.js')
var constants = require('../constants.js')

const WIDTH = 20
const HEIGHT = 26
const ATTACK_WIDTH = 15

let player
let health
let alive = true
let experience = 0

function createPlayer (x1, y1) {
  return {x: x1,
    y: y1,
    w: WIDTH,
    h: HEIGHT,
    hitBoxColor: '#7cfc00',
    state: constants.IDLE,
    attackAnimationFrame: 0,
    dashAnimationFrame: 0,
    attack_box: {x: x1 + WIDTH, y: y1 - 5, w: ATTACK_WIDTH, h: HEIGHT + 10, hitBoxColor: '#ff6961'},
    facing: constants.RIGHT}
}

function getPlayer () {
  if (player === undefined) {
    resetPlayer()
  }
  return player
}

function resetPlayer () {
  experience = 0
  health = 100
  player = createPlayer(10, 287)
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

function getExperience () {
  return experience
}

function addExperience (value) {
  experience += value
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
  getExperience,
  addExperience,
  updatePlayer,
  attack,
  dash
}
