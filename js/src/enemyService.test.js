const underTest = require('./enemyService.js')
var enemyManager = require('./enemyManager.js')
var playerModule = require('./player.js')
var enemyDrawer = require('./enemyDrawer.js')
var collisionDetectionModule = require('./collisionDetection.js')
var enemyAttack = require('./enemyAttack.js')

jest.mock('./enemyManager.js')
jest.mock('./player.js')
jest.mock('./enemyDrawer.js')
jest.mock('./collisionDetection.js')
jest.mock('./enemyAttack')

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

test('updateEnemies calls the external methods expected when enemy is idle', () => {
  let mockEnemy = createMockEnemy()
  let mockEnemies = [mockEnemy]
  enemyManager.getEnemies.mockReturnValue(mockEnemies)

  underTest.updateEnemies()

  expect(enemyManager.getEnemies).toHaveBeenCalledTimes(7)
  expect(enemyDrawer.drawIdle).toHaveBeenCalledWith(mockEnemy)
})

test('updateEnemies sets the enemy to be aggrod and calls the external methods expected when enemy is within aggro range of player', () => {
  let mockEnemy = createMockEnemy()
  let mockPlayer = createMockPlayer()
  let mockEnemies = [mockEnemy]
  enemyManager.getEnemies.mockReturnValue(mockEnemies)
  playerModule.getPlayer.mockReturnValue(mockPlayer)
  newFunction(mockEnemy)

  underTest.updateEnemies()

  expect(enemyManager.getEnemies).toHaveBeenCalled()
  expect(enemyManager.moveEnemyToward).toHaveBeenCalledWith(mockEnemy, mockPlayer)
})

function newFunction (mockEnemy) {
  collisionDetectionModule.collisionDetection.mockImplementation((a, b) => {
    if (a === playerModule.getPlayer() && (b === mockEnemy.player_detection_box || b === mockEnemy.player_aggro_box)) {
      return true
    } else {
      return false
    }
  })
}

function createMockEnemy () {
  return {
    id: 1,
    x: 1,
    y: 1,
    w: 20,
    h: 20,
    speed: 50,
    hitBoxColor: '#ff0000',
    health: 100,
    player_detection_box: {x: -60, y: -60, w: 120, h: 120, hitBoxColor: '#ff8c00'},
    player_aggro_box: {x: -80, y: -80, w: 160, h: 160, hitBoxColor: '#ffff00'},
    player_attack_box: {x: -10, y: -5, w: 10, h: 10, hitBoxColor: '#ff6961'},
    aggro: false,
    attacking: false,
    facing: 'left',
    attackAnimationFrame: 0,
    hitPlayer: false
  }
}

function createMockPlayer () {
  return {
    x: 501,
    y: 501,
    w: 20,
    h: 20,
    hitBoxColor: '#7cfc00',
    state: 'idle',
    attackAnimationFrame: 0,
    attack_box: {x: 60, y: 60, w: 120, h: 120, hitBoxColor: '#ff6961'},
    facing: 'right'
  }
}
