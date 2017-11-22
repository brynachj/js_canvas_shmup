var draw_module = require('./draw.js');

const WIDTH = 4, HEIGHT = 5, SPEED = 10;

pebble_sprite = new Image();
pebble_sprite.src = 'images/pebble.png';

var pebbles = [];
var ammo = 10;

function getAmmo() {
  return ammo;
}

function resetPebbleAmmo() {
  ammo = 10;
}

function takeOneFromAmmo() {
  ammo--;
}

function addToAmmo(i) {
  ammo += i;
}

function addToPebbles(x, y) {
  pebbles.push(createPebble(x,y));
}

function removeFromPebbles(pebble) {
  var index = pebbles.map(p => p.id).indexOf(pebble.id);
  pebbles.splice(index,1);
}

function newId() {
  if (pebbles.length === 0) {
    return 1;
  } else {
    return pebbles[pebbles.length - 1].id + 1;
  }
}

function createPebble(x1, y1) {
  return {id: newId(), x:x1, y:y1, w:WIDTH, h:HEIGHT, hitBoxColor: '#00bfff'};
}

function moveOnScreenPebbles() {
  pebbles.map(pebble => movePebble(pebble));
}

function movePebble(pebble) {
  if (pebble.x < 600 + pebble_sprite.width) {
    pebble.x += 10;
  } else {
    removeFromPebbles(pebble);
  }
}

function drawOnScreenPebble(ctx) {
  if (pebbles.length){
    pebbles.map(pebble => draw_module.drawSprite(pebble_sprite, pebble, ctx));
  }
}

module.exports = {
  pebbles : pebbles,
  createPebble : createPebble,
  moveOnScreenPebbles : moveOnScreenPebbles,
  drawOnScreenPebble : drawOnScreenPebble,
  addToPebbles : addToPebbles,
  removeFromPebbles : removeFromPebbles,

  resetPebbleAmmo : resetPebbleAmmo,
  takeOneFromAmmo : takeOneFromAmmo,
  addToAmmo : addToAmmo,
  getAmmo : getAmmo
}
