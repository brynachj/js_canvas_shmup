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

test('collisionDetection returns true when an object is inside another object', () => {
  let firstObject = {x: 0, y: 0, w: 10, h: 10}
  let secondObject = {x: 2, y: 2, w: 5, h: 5}
  expect(underTest.collisionDetection(firstObject, secondObject)).toBe(true)
})

test('collisionDetection returns false when two objects dont collide', () => {
  let firstObject = {x: 0, y: 0, w: 10, h: 10}
  let secondObject = {x: 20, y: 20, w: 10, h: 10}
  expect(underTest.collisionDetection(firstObject, secondObject)).toBe(false)
})

// ----1--
// -OOOOO-
// ----2--
test('isObjectBetweenTwoObjects returns true when object is between other two objects center points', () => {
  let objectBetween = {x: 2, y: 1, w: 5, h: 1}
  let firstObject = {x: 5, y: 0, w: 1, h: 1}
  let secondObject = {x: 5, y: 2, w: 1, h: 1}
  expect(underTest.isObjectBetweenTwoObjects(objectBetween, firstObject, secondObject)).toBe(true)
})

// -1--2--
// -OOOOO-
// ------
test('isObjectBetweenTwoObjects returns false when object is below other two objects\' center points', () => {
  let objectBetween = {x: 2, y: 1, w: 5, h: 1}
  let firstObject = {x: 2, y: 0, w: 1, h: 1}
  let secondObject = {x: 5, y: 0, w: 1, h: 1}
  expect(underTest.isObjectBetweenTwoObjects(objectBetween, firstObject, secondObject)).toBe(false)
})
