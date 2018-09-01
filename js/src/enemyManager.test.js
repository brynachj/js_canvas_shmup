const underTest = require('./enemyManager.js')
var utilityModule = require('./utility.js')
var pebble_pickup_module = require('./pebblePickup.js')

jest.mock('./utility.js')
jest.mock('./pebblePickup.js')

const WIDTH = 34
const HEIGHT = 36

beforeEach(() => {
  while (underTest.getEnemies().length !== 0) {
    underTest.removeEnemy(underTest.getEnemies()[0])
  }
})

test('addEnemy pushes a new enemy to the enemy array with all the expected properties', () => {
  underTest.addEnemy(90, 91)

  let enemies = underTest.getEnemies()

  expect(enemies[0].x).toBe(90)
  expect(enemies[0].y).toBe(91)
  expect(enemies[0].w).toBe(34)
  expect(enemies[0].h).toBe(36)
  expect(enemies[0].speed).toBe(3)
  expect(enemies[0].health).toBe(100)
  expect(enemies[0].aggro).toBe(false)
  expect(enemies[0].attacking).toBe(false)
  expect(enemies[0].facing).toBe('left')
  expect(enemies[0].attackAnimationFrame).toBe(0)
  expect(enemies[0].hitPlayer).toBe(false)
})

test('getEnemies is empty initially ', () => {
  let enemies = underTest.getEnemies()

  expect(enemies).toEqual([])
})

test('getEnemies returns one enemy when addEnemy has been called once', () => {
  underTest.addEnemy(0, 1)

  let enemies = underTest.getEnemies()

  expect(enemies.length).toEqual(1)
})

test('getEnemies returns two enemies when addEnemy is called twice', () => {
  underTest.addEnemy(0, 1)
  underTest.addEnemy(2, 3)

  let enemies = underTest.getEnemies()

  expect(enemies.length).toEqual(2)
})

test('removeEnemy removes an enemy', () => {
  underTest.addEnemy(0, 1)

  expect(underTest.getEnemies().length).toBe(1)

  underTest.removeEnemy(underTest.getEnemies()[0])

  expect(underTest.getEnemies().length).toBe(0)
})

test('removeEnemy removes the specified enemy', () => {
  underTest.addEnemy(0, 1)
  underTest.addEnemy(2, 3)

  expect(underTest.getEnemies().length).toBe(2)

  underTest.removeEnemy(underTest.getEnemies()[0])

  expect(underTest.getEnemies().length).toBe(1)
  expect(underTest.getEnemies()[0].x).toBe(2)
  expect(underTest.getEnemies()[0].y).toBe(3)
})

test('updateEnemyDirection defaults to DOWN if they are in the same place as their target', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  let target = {x: 50, y: 50, w: WIDTH, h: HEIGHT}

  underTest.updateEnemyDirection(enemy, target)

  expect(underTest.getEnemies()[0].facing).toBe('down')
})

test('updateEnemyDirection faces the given enemy LEFT if the x axis of the given target is left of the enemy x coordinate but the y coordinates match', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  let target = {x: 30, y: 50, w: WIDTH, h: HEIGHT}

  underTest.updateEnemyDirection(enemy, target)

  expect(underTest.getEnemies()[0].facing).toBe('left')
})

test('updateEnemyDirection faces the given enemy RIGHT if the x axis of the given target is right of the enemy x coordinate but the y coordinates match', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  let target = {x: 60, y: 50, w: WIDTH, h: HEIGHT}

  underTest.updateEnemyDirection(enemy, target)

  expect(underTest.getEnemies()[0].facing).toBe('right')
})

test('updateEnemyDirection faces the given enemy UP if the y axis of the given target is above of the enemy y coordinate but the x coordinates match', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  let target = {x: 50, y: 60, w: WIDTH, h: HEIGHT}

  underTest.updateEnemyDirection(enemy, target)

  expect(underTest.getEnemies()[0].facing).toBe('down')
})

test('updateEnemyDirection faces the given enemy DOWN if the y axis of the given target is below the enemy y coordinate but the x coordinates match', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  let target = {x: 50, y: 40, w: WIDTH, h: HEIGHT}

  underTest.updateEnemyDirection(enemy, target)

  expect(underTest.getEnemies()[0].facing).toBe('up')
})

test('updateEnemyDirection faces the given enemy LEFT if the x axis of the given target is left of the enemy x coordinate and the difference is greater than the difference in y coordinates', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  let target = {x: 30, y: 53, w: WIDTH, h: HEIGHT}

  underTest.updateEnemyDirection(enemy, target)

  expect(underTest.getEnemies()[0].facing).toBe('left')
})

test('updateEnemyDirection faces the given enemy RIGHT if the x axis of the given target is right of the enemy x coordinate and the difference is greater than the difference in y coordinates', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  let target = {x: 60, y: 45, w: WIDTH, h: HEIGHT}

  underTest.updateEnemyDirection(enemy, target)

  expect(underTest.getEnemies()[0].facing).toBe('right')
})

test('updateEnemyDirection faces the given enemy UP if the y axis of the given target is above of the enemy y coordinate and the difference is greater than the difference in x coordinates', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  let target = {x: 55, y: 60, w: WIDTH, h: HEIGHT}

  underTest.updateEnemyDirection(enemy, target)

  expect(underTest.getEnemies()[0].facing).toBe('down')
})

test('updateEnemyDirection faces the given enemy DOWN if the y axis of the given target is below the enemy y coordinate and the difference is greater than the difference in x coordinates', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  let target = {x: 44, y: 40, w: WIDTH, h: HEIGHT}

  underTest.updateEnemyDirection(enemy, target)

  expect(underTest.getEnemies()[0].facing).toBe('up')
})
