var utilityModule = require('./utility.js')
var pebblePickupModule = require('./pebblePickup.js')

const WIDTH = 34
const HEIGHT = 36
const SPEED = 3

const UP = 'up'
const DOWN = 'down'
const LEFT = 'left'
const RIGHT = 'right'

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
    w: WIDTH,
    h: HEIGHT,
    speed: SPEED,
    hitBoxColor: '#ff0000',
    health: 100,
    player_detection_box: {x: x1 - 60, y: y1 - 60, w: WIDTH + 120, h: HEIGHT + 120, hitBoxColor: '#ff8c00'},
    player_aggro_box: {x: x1 - 80, y: y1 - 80, w: WIDTH + 160, h: HEIGHT + 160, hitBoxColor: '#ffff00'},
    player_attack_box: {x: x1 - 10, y: y1 - 5, w: 10, h: HEIGHT + 10, hitBoxColor: '#ff6961'},
    aggro: false,
    attacking: false,
    facing: LEFT,
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
      enemy.facing = LEFT
      enemy.player_attack_box = {x: enemy.x - 10, y: enemy.y - 5, w: 10, h: HEIGHT + 10, hitBoxColor: '#ff6961'}
    } else {
      enemy.facing = RIGHT
      enemy.player_attack_box = {x: enemy.x + enemy.w, y: enemy.y - 5, w: 10, h: HEIGHT + 10, hitBoxColor: '#ff6961'}
    }
  } else {
    if (yDifference > 0) {
      enemy.facing = UP
      enemy.player_attack_box = {x: enemy.x - 5, y: enemy.y - 10, w: WIDTH + 10, h: 10, hitBoxColor: '#ff6961'}
    } else {
      enemy.facing = DOWN
      enemy.player_attack_box = {x: enemy.x - 5, y: enemy.y + enemy.h, w: WIDTH + 10, h: 10, hitBoxColor: '#ff6961'}
    }
  }
}

function moveEnemyToward(enemy, target) {
  updateEnemyDirection(enemy, target);
  if (enemy.x < target.x) {
    move(enemy, enemy.speed, 0);
  }
  if (enemy.x > target.x) {
    move(enemy, -enemy.speed, 0);
  }
  if (enemy.y < target.y) {
    move(enemy, 0, enemy.speed);
  }
  if (enemy.y > target.y) {
    move(enemy, 0, -enemy.speed);
  }
}

function move(enemy, move_x, move_y) {
  enemy.x += move_x;
  enemy.player_detection_box.x += move_x;
  enemy.player_aggro_box.x += move_x;
  enemy.player_attack_box.x += move_x;
  enemy.y += move_y;
  enemy.player_detection_box.y += move_y;
  enemy.player_aggro_box.y += move_y;
  enemy.player_attack_box.y += move_y;
}

function hitEnemy (enemy, damage) {
  enemy.health -= damage
  if (enemy.health <= 0) {
    removeEnemy(enemy)
    addEnemy(Math.random() * 600, Math.random() * 600)
    if (Math.random() < 0.2) {
      pebblePickupModule.addToPebblePickups(enemy.x, enemy.y)
    }
  }
}

module.exports = {
  enemies,
  getEnemies,
  addEnemy,
  removeEnemy,
  updateEnemyDirection,
  moveEnemyToward,
  hitEnemy
}
