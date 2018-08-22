const underTest = require('./enemyManager.js')
var utilityModule = require('./utility.js')
var pebble_pickup_module = require('./pebblePickup.js')

jest.mock('./utility.js')
jest.mock('./pebblePickup.js')

test('getEnemies should be empty initially ', () => {
  let enemies = underTest.getEnemies()

  expect(enemies).toEqual([])
})

test('getEnemies should return one enemy when add enemy has been called once', () => {
  underTest.addEnemy(0, 1)

  let enemies = underTest.getEnemies()

  expect(enemies.length).toEqual(1)
  expect(enemies[0].x).toBe(0)
  expect(enemies[0].y).toBe(1)
})
