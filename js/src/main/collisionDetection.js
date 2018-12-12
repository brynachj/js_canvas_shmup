function collisionDetection (firstThing, secondThing) {
  return firstThing.x < secondThing.x + secondThing.w && firstThing.x + firstThing.w > secondThing.x &&
  firstThing.y < secondThing.y + secondThing.h && firstThing.h + firstThing.y > secondThing.y
}

function isObjectBetweenTwoObjects (objectBetween, firstObject, secondObject) {
  return topWallCollisionCheck(objectBetween, firstObject, secondObject) ||
  (objectBetween.x > firstObject.x && objectBetween.x < secondObject.x) ||
  (objectBetween.x < firstObject.x && objectBetween.x > secondObject.x)
}

function topWallCollisionCheck (objectBetween, firstObject, secondObject) {
  let firstObjectCenterY = firstObject.y + (firstObject.h / 2)
  let secondObjectCenterY = secondObject.y + (secondObject.h / 2)
  let firstObjectCenterX = firstObject.x + (firstObject.w / 2)
  let secondObjectCenterX = secondObject.x + (secondObject.w / 2)
  return (objectBetween.y > firstObjectCenterY && objectBetween.y < secondObjectCenterY && firstObjectCenterX > objectBetween.x && firstObjectCenterX < (objectBetween.x + objectBetween.w) && secondObjectCenterX > objectBetween.x && secondObjectCenterX < (objectBetween.x + objectBetween.w)) ||
    (objectBetween.y < firstObjectCenterY && objectBetween.y > secondObjectCenterY && firstObjectCenterX > objectBetween.x && firstObjectCenterX < (objectBetween.x + objectBetween.w) && secondObjectCenterX > objectBetween.x && secondObjectCenterX < (objectBetween.x + objectBetween.w))
}

// // The following methods are taken from:
// // https://socratic.org/questions/how-do-you-find-the-parametric-equations-for-a-line-segment
// // https://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
// // https://en.wikipedia.org/wiki/Cramer%27s_rule
// function isObjectBetweenTwoObjects (objectBetween, firstObject, secondObject) {
//   let firstToSecondObjectLine = {xA: firstObject.x, yA: firstObject.y, xB: secondObject.x, yB: secondObject.y}
//   let firstDiagonalOfObjectBetween = {xA: objectBetween.x, yA: objectBetween.y, xB: objectBetween.x + objectBetween.w, yB: objectBetween.y + objectBetween.h}
//   let secondDiagonalOfObjectBetween = {xA: objectBetween.x, yA: objectBetween.y + objectBetween.h, xB: objectBetween.x + objectBetween.w, yB: objectBetween.y}
//   let objectIsBetweenTwoObjects = (doLinesCross(firstToSecondObjectLine, firstDiagonalOfObjectBetween) ||
//   doLinesCross(firstToSecondObjectLine, secondDiagonalOfObjectBetween))
//   console.log(objectIsBetweenTwoObjects)
//   return objectIsBetweenTwoObjects
// }

// function doLinesCross (firstLine, secondLine) {
//   let simultaneousEquationSolution = solveSimultaneousEquation(firstLine.xB - firstLine.xA,
//     secondLine.xA - secondLine.xB,
//     firstLine.xA - secondLine.xB,
//     firstLine.yB - firstLine.yA,
//     secondLine.yA - secondLine.yB,
//     firstLine.yA - secondLine.yB)

//   return ((Math.abs(simultaneousEquationSolution.x) >= 0 && Math.abs(simultaneousEquationSolution.x) <= 1) &&
//   (Math.abs(simultaneousEquationSolution.y) >= 0 && Math.abs(simultaneousEquationSolution.y) <= 1))
// }

// // Solves simultaneous equations of the form:
// // ax + by = c
// // dx + ey = f
// function solveSimultaneousEquation (a, b, c, d, e, f) {
//   let detS = a * e - b * c
//   let detX = c * e - b * f
//   let detY = a * f - c * d
//   if (detS === 0 || detX === 0 || detY === 0) {
//     return {x: -1, y: -1}
//   }
//   let x = detX / detS
//   let y = detY / detS
//   return {x: x, y: y}
// }

module.exports = {
  collisionDetection,
  isObjectBetweenTwoObjects
}
