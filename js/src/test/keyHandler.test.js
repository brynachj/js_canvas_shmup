const underTest = require('../main/keyHandler.js')
let playerModule = require('../main/player/player.js')
let enemyService = require('../main/enemy/enemyService.js')
let pebbleModule = require('../main/pebble.js')

jest.mock('../main/pebble.js')

jest.mock('../main/enemy/enemyService.js', () => ({
  getEnemies: jest.fn(),
  removeAndReplaceEnemy: jest.fn()
}))

jest.mock('../main/player/player.js', () => ({
  getPlayer: jest.fn(),
  attack: jest.fn(),
  getAlive: jest.fn(),
  setAlive: jest.fn(),
  resetPlayer: jest.fn(),
  dash: jest.fn()
}))

afterEach(() => {
  jest.resetAllMocks()
})

test('By default getGameStarted returns false', () => {
  expect(underTest.getGameStarted()).toBe(false)
})

test('keyDown calls playerModule attack when the event passed in is the attack key and player is idle', () => {
  let event = {keyCode: 67}
  let mockPlayerIdle = {state: 'idle'}
  playerModule.getPlayer.mockImplementation(() => mockPlayerIdle)
  underTest.keyDown(event)

  expect(playerModule.attack).toHaveBeenCalledTimes(1)
})

test('keyDown does not call playerModule attack when the event passed in is the attack key and player is not idle', () => {
  let event = {keyCode: 67}
  let mockPlayerNotIdle = {state: 'attacking'}
  playerModule.getPlayer.mockImplementation(() => mockPlayerNotIdle)

  underTest.keyDown(event)

  expect(playerModule.attack).not.toBeCalled()
})

test('keyDown does not call playerModule dash and sets gameStarted to true when the event passed in is the dash key and the game has not started', () => {
  let event = {keyCode: 32}
  playerModule.getAlive.mockImplementation(() => true)

  expect(underTest.getGameStarted()).toBe(false)

  underTest.keyDown(event)

  expect(underTest.getGameStarted()).toBe(true)
  expect(playerModule.dash).not.toBeCalled()
})

test('keyDown does call playerModule dash when the event passed in is the dash key and the game has started', () => {
  let event = {keyCode: 32}
  playerModule.getAlive.mockImplementation(() => true)

  underTest.keyDown(event)
  expect(underTest.getGameStarted()).toBe(true)
  underTest.keyDown(event)

  expect(playerModule.dash).toBeCalled()
})

test('keyDown calls playerModule setAlive(true) and all the reset functions when the event passed in is the dash key and the player is not alive', () => {
  let event = {keyCode: 32}
  let enemy = {}
  playerModule.getAlive.mockImplementation(() => false)
  enemyService.getEnemies.mockImplementation(() => [enemy])

  underTest.keyDown(event)
  expect(underTest.getGameStarted()).toBe(true)
  underTest.keyDown(event)

  expect(playerModule.setAlive).toBeCalledWith(true)
  expect(pebbleModule.resetPebbleAmmo).toBeCalled()
  expect(enemyService.getEnemies).toBeCalled()
  expect(enemyService.removeAndReplaceEnemy).toBeCalledWith(enemy)
})

test('keyDown calls pebbleModule functions when the event passed in is the ranged attack key and the player is not alive', () => {
  let event = {keyCode: 88}
  pebbleModule.getAmmo.mockImplementation(() => 1)
  let mockPlayerNotIdle = {x: 1, y: 5}
  playerModule.getPlayer.mockImplementation(() => mockPlayerNotIdle)

  underTest.keyDown(event)
  expect(underTest.getGameStarted()).toBe(true)
  underTest.keyDown(event)

  expect(pebbleModule.addToPebbles).toBeCalled()
  expect(pebbleModule.takeOneFromAmmo).toBeCalled()
})

test('keyUp function exists', () => {
  let event = {keyCode: 100}

  underTest.keyUp(event)
})
