const underTest = require('./enemyService.js')
var enemyManager = require('./enemyManager.js')
var playerModule = require('./player.js')
var enemyDrawer = require('./enemyDrawer.js')
var collisionDetectionModule = require('./collisionDetection.js')

jest.mock('./enemyManager.js')
jest.mock('./player.js')
jest.mock('./enemyDrawer.js')
jest.mock('./collisionDetection.js')

test('addEnemy calls the enemyManager addEnemy function', () => {
  underTest.addEnemy(1, 2)
  expect(enemyManager.addEnemy).toHaveBeenCalledWith(1, 2)
})

test('damageEnemy calls the enemyManager hitEnemy function', () => {
  let obj1 = {mockProperty: 1}
  let obj2 = {otherMockProperty: 'a'}
  underTest.damageEnemy(obj1, obj2)
  expect(enemyManager.hitEnemy).toHaveBeenCalledWith(obj1, obj2)
})

test('getEnemies calls enemyManager getEnemies function', () => {
  underTest.getEnemies()
  expect(enemyManager.getEnemies).toHaveBeenCalled()
})
