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
test('isObjectBetweenTwoObjects returns true when object is vertically between other two objects\' center points', () => {
  let objectBetween = {x: 2, y: 2, w: 5, h: 1}
  let firstObject = {x: 5, y: 1, w: 1, h: 1}
  let secondObject = {x: 5, y: 3, w: 1, h: 1}
  expect(underTest.isObjectBetweenTwoObjects(objectBetween, firstObject, secondObject)).toBe(true)
})

// ----1--
// -OOOOO-
// -O---O-
// -OOOOO-
// -2-----
test('isObjectBetweenTwoObjects returns true when object is vertically between other two objects\' center points and object is tall', () => {
  let objectBetween = {x: 2, y: 2, w: 5, h: 3}
  let firstObject = {x: 5, y: 1, w: 1, h: 1}
  let secondObject = {x: 2, y: 5, w: 1, h: 1}
  expect(underTest.isObjectBetweenTwoObjects(objectBetween, firstObject, secondObject)).toBe(true)
})

// -1111---
// --OOOOO-
// -2222---
test('isObjectBetweenTwoObjects returns true when object is vertically between other two objects\' center points and two objects are wide', () => {
  let objectBetween = {x: 3, y: 2, w: 5, h: 1}
  let firstObject = {x: 2, y: 1, w: 4, h: 1}
  let secondObject = {x: 2, y: 5, w: 4, h: 1}
  expect(underTest.isObjectBetweenTwoObjects(objectBetween, firstObject, secondObject)).toBe(true)
})

// -1111---
// -----OO-
// -2222---
test('isObjectBetweenTwoObjects returns false when object is not vertically between other two objects\' center points and two objects are wide', () => {
  let objectBetween = {x: 6, y: 2, w: 2, h: 1}
  let firstObject = {x: 2, y: 1, w: 4, h: 1}
  let secondObject = {x: 2, y: 5, w: 4, h: 1}
  expect(underTest.isObjectBetweenTwoObjects(objectBetween, firstObject, secondObject)).toBe(false)
})

// -1--2--
// -OOOOO-
// -------
test('isObjectBetweenTwoObjects returns false when object is below other two objects\' center points', () => {
  let objectBetween = {x: 2, y: 2, w: 5, h: 1}
  let firstObject = {x: 2, y: 1, w: 1, h: 1}
  let secondObject = {x: 5, y: 1, w: 1, h: 1}
  expect(underTest.isObjectBetweenTwoObjects(objectBetween, firstObject, secondObject)).toBe(false)
})

// -------
// -OOOOO-
// -1--2--
test('isObjectBetweenTwoObjects returns false when object is above other two objects\' center points', () => {
  let objectBetween = {x: 2, y: 2, w: 5, h: 1}
  let firstObject = {x: 2, y: 3, w: 1, h: 1}
  let secondObject = {x: 5, y: 3, w: 1, h: 1}
  expect(underTest.isObjectBetweenTwoObjects(objectBetween, firstObject, secondObject)).toBe(false)
})

// --O----
// 1-O-2--
// --O----
test('isObjectBetweenTwoObjects returns true when object is horizontally between other two objects\' center points', () => {
  let objectBetween = {x: 3, y: 1, w: 1, h: 3}
  let firstObject = {x: 1, y: 2, w: 1, h: 1}
  let secondObject = {x: 5, y: 2, w: 1, h: 1}
  expect(underTest.isObjectBetweenTwoObjects(objectBetween, firstObject, secondObject)).toBe(true)
})

// --O-1--
// --O----
// --O-2--
test('isObjectBetweenTwoObjects returns false when object is left of other two objects\' center points', () => {
  let objectBetween = {x: 3, y: 1, w: 1, h: 3}
  let firstObject = {x: 5, y: 1, w: 1, h: 1}
  let secondObject = {x: 5, y: 3, w: 1, h: 1}
  expect(underTest.isObjectBetweenTwoObjects(objectBetween, firstObject, secondObject)).toBe(false)
})

// 1-O----
// --O----
// 2-O----
test('isObjectBetweenTwoObjects returns false when object is right of other two objects\' center points', () => {
  let objectBetween = {x: 3, y: 1, w: 1, h: 3}
  let firstObject = {x: 1, y: 1, w: 1, h: 1}
  let secondObject = {x: 1, y: 3, w: 1, h: 1}
  expect(underTest.isObjectBetweenTwoObjects(objectBetween, firstObject, secondObject)).toBe(false)
})
