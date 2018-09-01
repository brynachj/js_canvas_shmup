var draw_module = require('./draw.js');
var utility_module = require('./utility.js');

const WIDTH = 10, HEIGHT = 13;

pebble_pickup_sprite = new Image();
pebble_pickup_sprite.src = 'images/pebble_pickup.png';

var pebblePickups = [];

function addToPebblePickups(x, y) {
  pebblePickups.push(createPebblePickup(x,y));
}

function removeFromPebblePickups(pickup) {
  var index = pebblePickups.map(p => p.id).indexOf(pickup.id);
  pebblePickups.splice(index,1);
}

function createPebblePickup(x1, y1) {
  return {id:utility_module.newId(pebblePickups), x:x1, y:y1 + 13, w:WIDTH, h:HEIGHT, hitBoxColor: '#00bfff'};
}

function drawPebblePickup(ctx) {
  for(var i = 0; i < pebblePickups.length; i ++){
    draw_module.drawSprite(pebble_pickup_sprite, pebblePickups[i], ctx);
  }
}

module.exports = {
  createPebblePickup : createPebblePickup,
  drawPebblePickup : drawPebblePickup,
  addToPebblePickups : addToPebblePickups,
  pebblePickups : pebblePickups,
  removeFromPebblePickups : removeFromPebblePickups
}