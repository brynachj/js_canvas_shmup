const underTest = require('./enemyManager.js')
var utilityModule = require('./utility.js')
var pebble_pickup_module = require('./pebblePickup.js')

jest.mock('./utility.js')
jest.mock('./pebblePickup.js')

beforeEach(() => {
  while (underTest.getEnemies().length !== 0) {
    underTest.removeEnemy(underTest.getEnemies()[0])
  }
})

test('getEnemies should be empty initially ', () => {
  let enemies = underTest.getEnemies()

  expect(enemies).toEqual([])
})

test('getEnemies should return one enemy when addEnemy has been called once', () => {
  underTest.addEnemy(0, 1)

  let enemies = underTest.getEnemies()

  expect(enemies.length).toEqual(1)
})

test('getEnemies should return two enemies when addEnemy is called twice', () => {
  underTest.addEnemy(0, 1)
  underTest.addEnemy(2, 3)

  let enemies = underTest.getEnemies()

  expect(enemies.length).toEqual(2)
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
