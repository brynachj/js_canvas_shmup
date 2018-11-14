const underTest = require('../main/collisionDetection.js')

test('collisionDetection returns true when two objects are colliding', () => {
  let firstObject = {x: 0, y: 0, w: 10, h: 10}
  let secondObject = {x: 5, y: 5, w: 10, h: 10}
  expect(underTest.collisionDetection(firstObject, secondObject)).toBe(true)
})

test('collisionDetection returns true when two objects are in the same place', () => {
  let firstObject = {x: 0, y: 0, w: 10, h: 10}
  let secondObject = {x: 0, y: 0, w: 10, h: 10}
  expect(underTest.collisionDetection(firstObject, secondObject)).toBe(true)
})