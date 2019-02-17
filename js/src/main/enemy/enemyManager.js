var utilityModule = require('../shared/utility.js')
var bulletPickupModule = require('../bullet/bulletPickup.js')
var constants = require('../shared/constants.js')
var wallService = require('../wallService.js')
var collisionDetectionModule = require('../shared/collisionDetection.js')

let enemies = []

function addEnemy (x, y) {
  enemies.push(createEnemy(x, y))
}

function getEnemies () {
  return enemies
}

function createEnemy (x1, y1) {
  return {id: utilityModule.newId(enemies),
    x: x1,
    y: y1,
    w: constants.ENEMY_WIDTH,
    h: constants.ENEMY_HEIGHT,
    speed: constants.ENEMY_SPEED,
    hitBoxColor: '#ff0000',
    health: 100,
    player_detection_box: {x: x1 - 60, y: y1 - 60, w: constants.ENEMY_WIDTH + 120, h: constants.ENEMY_HEIGHT + 120, hitBoxColor: '#ff8c00'},
    player_aggro_box: {x: x1 - 80, y: y1 - 80, w: constants.ENEMY_WIDTH + 160, h: constants.ENEMY_HEIGHT + 160, hitBoxColor: '#ffff00'},
    player_attack_box: {x: x1 - 10, y: y1 - 5, w: 10, h: constants.ENEMY_HEIGHT + 10, hitBoxColor: '#ff6961'},
    aggro: false,
    attacking: false,
    facing: constants.LEFT,
    attackAnimationFrame: 0,
    hitPlayer: false
  }
}

function removeEnemy (enemyToRemove) {
  var index = enemies.map(enemy => enemy.id).indexOf(enemyToRemove.id)
  enemies.splice(index, 1)
}

function updateEnemyDirection (enemy, target) {
  let xDifference = (enemy.x + enemy.w / 2) - (target.x + target.w / 2)
  let yDifference = (enemy.y + enemy.h / 2) - (target.y + target.h / 2)
  if (xDifference * xDifference > yDifference * yDifference) {
    if (xDifference > 0) {
      enemy.facing = constants.LEFT
      enemy.player_attack_box = {x: enemy.x - 10, y: enemy.y - 5, w: 10, h: constants.ENEMY_HEIGHT + 10, hitBoxColor: '#ff6961'}
    } else {
      enemy.facing = constants.RIGHT
      enemy.player_attack_box = {x: enemy.x + enemy.w, y: enemy.y - 5, w: 10, h: constants.ENEMY_HEIGHT + 10, hitBoxColor: '#ff6961'}
    }
  } else {
    if (yDifference > 0) {
      enemy.facing = constants.UP
      enemy.player_attack_box = {x: enemy.x - 5, y: enemy.y - 10, w: constants.ENEMY_WIDTH + 10, h: 10, hitBoxColor: '#ff6961'}
    } else {
      enemy.facing = constants.DOWN
      enemy.player_attack_box = {x: enemy.x - 5, y: enemy.y + enemy.h, w: constants.ENEMY_WIDTH + 10, h: 10, hitBoxColor: '#ff6961'}
    }
  }
}

function moveEnemyToward (enemy, target) {
  updateEnemyDirection(enemy, target)
  if (enemy.x < target.x && detectWallCollision({ x: enemy.x + 5, y: enemy.y, w: enemy.w, h: enemy.h }).length === 0) {
    move(enemy, enemy.speed, 0)
  }
  if (enemy.x > target.x && detectWallCollision({x: enemy.x - 5, y: enemy.y, w: enemy.w, h: enemy.h}).length === 0) {
    move(enemy, -enemy.speed, 0)
  }
  if (enemy.y < target.y && detectWallCollision({x: enemy.x, y: enemy.y + 5, w: enemy.w, h: enemy.h}).length === 0) {
    move(enemy, 0, enemy.speed)
  }
  if (enemy.y > target.y && detectWallCollision({x: enemy.x, y: enemy.y - 5, w: enemy.w, h: enemy.h}).length === 0) {
    move(enemy, 0, -enemy.speed)
  }
}

function detectWallCollision (hitBox) {
  return wallService.getWalls().filter(w => collisionDetectionModule.collisionDetection(hitBox, w))
}

function move (enemy, moveX, moveY) {
  enemy.x += moveX
  enemy.player_detection_box.x += moveX
  enemy.player_aggro_box.x += moveX
  enemy.player_attack_box.x += moveX
  enemy.y += moveY
  enemy.player_detection_box.y += moveY
  enemy.player_aggro_box.y += moveY
  enemy.player_attack_box.y += moveY
}

function hitEnemy (enemy, damage) {
  enemy.health -= damage
  if (enemy.health <= 0) {
    removeEnemy(enemy)
    if (Math.random() < 0.2) {
      bulletPickupModule.addToPebblePickups(enemy.x, enemy.y)
    }
  }
}

function removeAllEnemies () {
  enemies.splice(0, enemies.length)
}

module.exports = {
  enemies,
  getEnemies,
  addEnemy,
  removeEnemy,
  updateEnemyDirection,
  moveEnemyToward,
  hitEnemy,
  removeAllEnemies
}
