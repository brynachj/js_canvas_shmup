const underTest = require('../../main/enemy/enemyManager.js')
var utilityModule = require('../../main/utility.js')
var pebblePickupModule = require('../../main/pebblePickup.js')
var wallService = require('../../main/wallService.js')

jest.mock('../../main/utility.js')
jest.mock('../../main/pebblePickup.js')
jest.mock('../../main/wallService.js')
const mockMath = Object.create(global.Math)

const WIDTH = 34
const HEIGHT = 36

beforeEach(() => {
  while (underTest.getEnemies().length !== 0) {
    underTest.removeEnemy(underTest.getEnemies()[0])
    wallService.getWalls.mockImplementation(() => { return [] })
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

test('addEnemy calls the utitlity function for giving the enemy a new Id', () => {
  underTest.addEnemy(10, 20)

  expect(utilityModule.newId).toBeCalledWith(underTest.getEnemies())
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

test('moveEnemyToward keeps the enemy in place if they are in the same place as their target', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  let target = {x: 50, y: 50, w: WIDTH, h: HEIGHT}

  underTest.moveEnemyToward(enemy, target)

  expect(underTest.getEnemies()[0].x).toBe(50)
  expect(underTest.getEnemies()[0].y).toBe(50)
})

test('moveEnemyToward moves the enemy left 3 if the x axis of the given target is left of the enemy x coordinate but the y coordinates match', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  let target = {x: 30, y: 50, w: WIDTH, h: HEIGHT}

  underTest.moveEnemyToward(enemy, target)

  expect(underTest.getEnemies()[0].x).toBe(47)
  expect(underTest.getEnemies()[0].y).toBe(50)
})

test('moveEnemyToward moves the enemy right 3 if the x axis of the given target is right of the enemy x coordinate but the y coordinates match', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  let target = {x: 60, y: 50, w: WIDTH, h: HEIGHT}

  underTest.moveEnemyToward(enemy, target)

  expect(underTest.getEnemies()[0].x).toBe(53)
  expect(underTest.getEnemies()[0].y).toBe(50)
})

test('moveEnemyToward moves the enemy up 3 if the y axis of the given target is above of the enemy y coordinate but the x coordinates match', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  let target = {x: 50, y: 40, w: WIDTH, h: HEIGHT}

  underTest.moveEnemyToward(enemy, target)

  expect(underTest.getEnemies()[0].x).toBe(50)
  expect(underTest.getEnemies()[0].y).toBe(47)
})

test('moveEnemyToward moves the enemy down 3 if the y axis of the given target is below of the enemy y coordinate but the x coordinates match', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  let target = {x: 50, y: 60, w: WIDTH, h: HEIGHT}

  underTest.moveEnemyToward(enemy, target)

  expect(underTest.getEnemies()[0].x).toBe(50)
  expect(underTest.getEnemies()[0].y).toBe(53)
})

test('moveEnemyToward moves the enemy left 3 if the x axis of the given target is 3 or more left of the enemy x coordinate and the difference in y coordinates is less than 3', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  let target = {x: 30, y: 52, w: WIDTH, h: HEIGHT}

  underTest.moveEnemyToward(enemy, target)

  expect(underTest.getEnemies()[0].x).toBe(47)
  expect(underTest.getEnemies()[0].y).toBe(50)
})

test('moveEnemyToward moves the enemy right 3 and up 3 if the x axis of the given target is 3 or more right of the enemy x coordinate and the difference in y coordinates is more than 3', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  let target = {x: 60, y: 44, w: WIDTH, h: HEIGHT}

  underTest.moveEnemyToward(enemy, target)

  expect(underTest.getEnemies()[0].x).toBe(53)
  expect(underTest.getEnemies()[0].y).toBe(47)
})

test('moveEnemyToward moves the enemy up 3 if the y axis of the given target is 3 or more above of the enemy y coordinate and the difference in x coordinates is less than 3', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  let target = {x: 51, y: 40, w: WIDTH, h: HEIGHT}

  underTest.moveEnemyToward(enemy, target)

  expect(underTest.getEnemies()[0].x).toBe(50)
  expect(underTest.getEnemies()[0].y).toBe(47)
})

test('moveEnemyToward moves the enemy down 3 and left 3 if the y axis of the given target is 3 or more below of the enemy y coordinate and the difference in x coordinates is more than 3', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  let target = {x: 46, y: 60, w: WIDTH, h: HEIGHT}

  underTest.moveEnemyToward(enemy, target)

  expect(underTest.getEnemies()[0].x).toBe(47)
  expect(underTest.getEnemies()[0].y).toBe(53)
})

test('moveEnemyToward does not move the enemy left if the x axis of the given target is left of the enemy x coordinate but the y coordinates match but there is a wall to its left', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  let target = {x: 0, y: 50, w: WIDTH, h: HEIGHT}
  let wall = {id: 1, x: 20, y: 45, w: 30, h: 30}

  wallService.getWalls.mockImplementation(() => { return [wall] })

  underTest.moveEnemyToward(enemy, target)

  expect(underTest.getEnemies()[0].x).toBe(50)
  expect(underTest.getEnemies()[0].y).toBe(50)
})

test('moveEnemyToward does not move the enemy right if the x axis of the given target is right of the enemy x coordinate but the y coordinates match but there is a wall to its right', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  let target = {x: 120, y: 50, w: WIDTH, h: HEIGHT}
  let wall = {id: 1, x: 80, y: 45, w: 30, h: 30}

  wallService.getWalls.mockImplementation(() => { return [wall] })

  underTest.moveEnemyToward(enemy, target)

  expect(underTest.getEnemies()[0].x).toBe(50)
  expect(underTest.getEnemies()[0].y).toBe(50)
})

test('moveEnemyToward does not move the enemy down if the y axis of the given target is below the enemy y coordinate but the x coordinates match but there is a wall below it', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  let target = {x: 50, y: 120, w: WIDTH, h: HEIGHT}
  let wall = {id: 1, x: 45, y: 80, w: 30, h: 30}

  wallService.getWalls.mockImplementation(() => { return [wall] })

  underTest.moveEnemyToward(enemy, target)

  expect(underTest.getEnemies()[0].x).toBe(50)
  expect(underTest.getEnemies()[0].y).toBe(50)
})

test('moveEnemyToward does not move the enemy left if the y axis of the given target is above the enemy y coordinate but the x coordinates match but there is a wall above it', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  let target = {x: 50, y: 0, w: WIDTH, h: HEIGHT}
  let wall = {id: 1, x: 45, y: 20, w: 30, h: 30}

  wallService.getWalls.mockImplementation(() => { return [wall] })

  underTest.moveEnemyToward(enemy, target)

  expect(underTest.getEnemies()[0].x).toBe(50)
  expect(underTest.getEnemies()[0].y).toBe(50)
})

test('hitEnemy takes the given amount of health from the given enemy', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]

  underTest.hitEnemy(enemy, 20)

  expect(underTest.getEnemies()[0].health).toBe(80)
})

test('hitEnemy does not replace the enemy if the damage taken does not take it under 0 health', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]

  underTest.hitEnemy(enemy, 20)

  expect(underTest.getEnemies()[0]).toBe(enemy)
})

test('hitEnemy does replace the enemy if the damage taken takes it under 0 health', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]

  underTest.hitEnemy(enemy, 120)

  expect(underTest.getEnemies().length).toBe(1)
  expect(underTest.getEnemies()[0]).not.toBe(enemy)
})

test('hitEnemy calls pebblePickupModule addToPebblePickups with the enemy coordinates when the enemy is removed and the random fucntion is less than 0.2', () => {
  underTest.addEnemy(50, 50)
  let enemy = underTest.getEnemies()[0]
  mockMath.random = () => 0.1
  global.Math = mockMath

  underTest.hitEnemy(enemy, 120)

  expect(pebblePickupModule.addToPebblePickups).toBeCalledWith(enemy.x, enemy.y)
})
