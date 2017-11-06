var draw_module = require('./draw.js');

const WIDTH = 4, HEIGHT = 5, SPEED = 10;

pebble_sprite = new Image();
pebble_sprite.src = 'images/pebble.png';

var pebbles = [];
var ammo = 10;

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

function removeFromPebbles(i) {
  pebbles.splice(i,1);
}

function createPebble(x1, y1) {
  return {x:x1, y:y1, w:WIDTH, h:HEIGHT, hitBoxColor: '#00bfff'};
}

function moveOnScreenPebbles() {
  for (var i = 0; i < pebbles.length; i++) {
    if (pebbles[i].x < 600 + pebble_sprite.width) {
      pebbles[i].x += 10;
    } else {
      pebbles.splice(i, 1);
    }
  }
}

function drawOnScreenPebble(ctx) {
  if (pebbles.length)
    for (var i = 0; i < pebbles.length; i++) {
      draw_module.drawSprite(pebble_sprite, pebbles[i], ctx);
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
  ammo : ammo
}
