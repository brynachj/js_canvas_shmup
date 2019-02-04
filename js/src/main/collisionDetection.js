function collisionDetection(firstThing, secondThing){
  return firstThing.x < secondThing.x + secondThing.w && firstThing.x + firstThing.w > secondThing.x &&
  firstThing.y < secondThing.y + secondThing.h && firstThing.h + firstThing.y > secondThing.y;
}

function isObjectBetweenTwoObjects (objectBetween, firstObject, secondObject) {
  return true
}

module.exports = {
  collisionDetection,
  isObjectBetweenTwoObjects
}
