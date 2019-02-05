const underTest = require('../main/pebble/pebble.js')

afterEach(() => {
  underTest.resetPebbleAmmo()
})

test('getAmmo by default returns 10', () => {
  expect(underTest.getAmmo()).toBe(10)
})

test('takeOneFromAmmo reduces the number of ammo left by 1', () => {
  expect(underTest.getAmmo()).toBe(10)

  underTest.takeOneFromAmmo()

  expect(underTest.getAmmo()).toBe(9)
})

test('resetPebbleAmmo resets the number of ammo left to 10', () => {
  expect(underTest.getAmmo()).toBe(10)

  underTest.takeOneFromAmmo()
  underTest.takeOneFromAmmo()
  expect(underTest.getAmmo()).toBe(8)
  underTest.resetPebbleAmmo()

  expect(underTest.getAmmo()).toBe(10)
})

test('addToAmmo adds the number parameterised into the function to ammo', () => {
  expect(underTest.getAmmo()).toBe(10)

  underTest.addToAmmo(12)

  expect(underTest.getAmmo()).toBe(22)

  underTest.addToAmmo(9)

  expect(underTest.getAmmo()).toBe(31)
})

test('addToPebbles pushes a new item onto the pebbles array', () => {
  expect(underTest.pebbles.length).toBe(0)

  let character = {x: 0, y: 0, facing: 'RIGHT'}

  underTest.addToPebbles(character)

  expect(underTest.pebbles.length).toBe(1)
})
