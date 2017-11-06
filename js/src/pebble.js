var draw_module = require('./draw.js');

const WIDTH = 4, HEIGHT = 5, SPEED = 10;

pebble_sprite = new Image();
pebble_sprite.src = 'images/pebble.png';

function createPebble(x1, y1, player) {
  return {x:x1, y:y1 + 13, w:WIDTH, h:HEIGHT, hitBoxColor: '#00bfff'};
}

function moveOnScreenPebbles(on_screen_pebbles) {
  for (var i = 0; i < on_screen_pebbles.length; i++) {
    if (on_screen_pebbles[i].x < 600 + pebble_sprite.width) {
      on_screen_pebbles[i].x += 10;
    } else {
      on_screen_pebbles.splice(i, 1);
    }
  }
}

function drawOnScreenPebble(on_screen_pebbles, ctx) {
  if (on_screen_pebbles.length)
    for (var i = 0; i < on_screen_pebbles.length; i++) {
      draw_module.drawSprite(pebble_sprite, on_screen_pebbles[i], ctx);
    }
}

module.exports = {
  createPebble : createPebble,
  moveOnScreenPebbles : moveOnScreenPebbles,
  drawOnScreenPebble : drawOnScreenPebble
}
