var enemyManager = require('../enemy/enemyManager.js')
var wallService = require('../wallService.js')
var collisionDetectionModule = require('../shared/collisionDetection.js')
var constants = require('../shared/constants.js')

function facePlayer (player, rightKey, leftKey, upKey, downKey) {
  if (upKey) {
    player.facing = constants.UP
    player.attack_box = {x: player.x - 5, y: player.y - constants.ATTACK_WIDTH, w: player.w + 10, h: constants.ATTACK_WIDTH, hitBoxColor: '#ff6961'}
  }
  if (downKey) {
    player.facing = constants.DOWN
    player.attack_box = {x: player.x - 5, y: player.y + player.h, w: player.w + 10, h: constants.ATTACK_WIDTH, hitBoxColor: '#ff6961'}
  }
  if (rightKey) {
    player.facing = constants.RIGHT
    player.attack_box = {x: player.x + player.w, y: player.y - 5, w: constants.ATTACK_WIDTH, h: player.h + 10, hitBoxColor: '#ff6961'}
  }
  if (leftKey) {
    player.facing = constants.LEFT
    player.attack_box = {x: player.x - constants.ATTACK_WIDTH, y: player.y - 5, w: constants.ATTACK_WIDTH, h: player.h + 10, hitBoxColor: '#ff6961'}
  }
}

function movePlayer (player, rightKey, leftKey, upKey, downKey) {
  let collidingWithEnemy = enemyManager.enemies.filter(e => collisionDetectionModule.collisionDetection({x: player.x - 5, y: player.y - 5, w: player.w + 5, h: player.h + 5}, e))
  let movementSpeed = (collidingWithEnemy.length > 0) ? 1 : constants.MOVEMENT_SPEED
  if (player.state !== constants.ATTACKING) {
    if (rightKey && (player.x + player.w) < 600 && detectWallCollision({ x: player.x + 5, y: player.y, w: player.w, h: player.h }).length === 0) {
      player.x += movementSpeed
      player.attack_box.x += movementSpeed
    } else if (leftKey && player.x > 0 && detectWallCollision({x: player.x - 5, y: player.y, w: player.w, h: player.h}).length === 0) {
      player.x -= movementSpeed
      player.attack_box.x -= movementSpeed
    } if (upKey && player.y > 0 && detectWallCollision({x: player.x, y: player.y - 5, w: player.w, h: player.h}).length === 0) {
      player.y -= movementSpeed
      player.attack_box.y -= movementSpeed
    } else if (downKey && (player.y + player.h) < 600 && detectWallCollision({x: player.x, y: player.y + 5, w: player.w, h: player.h}).length === 0) {
      player.y += movementSpeed
      player.attack_box.y += movementSpeed
    }
  }
}

function detectWallCollision (hitBox) {
  return wallService.getWalls().filter(w => collisionDetectionModule.collisionDetection(hitBox, w))
}

function dash (player, rightKey, leftKey, upKey, downKey) {
  let animationFrame = player.dashAnimationFrame
  if (rightKey && (player.x + player.w) < (600 - constants.DASH_PER_FRAME_LENGTH)) {
    let dashLength = detectWallCollision({ x: player.x + constants.DASH_PER_FRAME_LENGTH, y: player.y, w: player.w, h: player.h }).length === 0 ? constants.DASH_PER_FRAME_LENGTH : 0
    player.x += dashLength
    player.attack_box.x += constants.DASH_PER_FRAME_LENGTH
  } else if (leftKey && player.x > constants.DASH_PER_FRAME_LENGTH) {
    let dashLength = detectWallCollision({ x: player.x - constants.DASH_PER_FRAME_LENGTH, y: player.y, w: player.w, h: player.h }).length === 0 ? constants.DASH_PER_FRAME_LENGTH : 0
    player.x -= dashLength
    player.attack_box.x -= constants.DASH_PER_FRAME_LENGTH
  }
  if (upKey && player.y > constants.DASH_PER_FRAME_LENGTH) {
    let dashLength = detectWallCollision({ x: player.x, y: player.y - constants.DASH_PER_FRAME_LENGTH, w: player.w, h: player.h }).length === 0 ? constants.DASH_PER_FRAME_LENGTH : 0
    player.y -= dashLength
    player.attack_box.y -= constants.DASH_PER_FRAME_LENGTH
  } else if (downKey && (player.y + player.h) < (500 - constants.DASH_PER_FRAME_LENGTH)) {
    let dashLength = detectWallCollision({ x: player.x, y: player.y + constants.DASH_PER_FRAME_LENGTH, w: player.w, h: player.h }).length === 0 ? constants.DASH_PER_FRAME_LENGTH : 0
    player.y += dashLength
    player.attack_box.y += constants.DASH_PER_FRAME_LENGTH
  }
  if (animationFrame === 3) {
    player.state = constants.IDLE
    player.dashAnimationFrame = 0
  }
  animationFrame += 1
  player.dashAnimationFrame = animationFrame % 4
}

module.exports = {
  facePlayer,
  movePlayer,
  dash
}
