var player_module = require('./player.js');
var pebble_module = require('./pebble.js');

const WIDTH = 600, HEIGHT = 600;

function updateHud(ctx) {
  ctx.font = 'bold 18px Arial';
  ctx.fillStyle = '#fff';
  ctx.fillText('Experience: ', 10, 30);
  ctx.fillText(player_module.getExperience(), 120, 30);
  ctx.fillText('Pebbles: ', 160, 30);
  ctx.fillText(pebble_module.getAmmo(), 260, 30);
  ctx.fillText('Health:', 10, 60); // TODO: Replace with a health bar
  ctx.fillText(player_module.getHealth(), 68, 60);
}

function startScreen(ctx) {
  ctx.font = 'bold 50px VT323';
  ctx.fillText('Canvas Shooter', WIDTH / 2 - 150, HEIGHT / 2);
  ctx.font = 'bold 20px VT323';
  ctx.fillText('Hit SPACE to Play', WIDTH / 2 - 56, HEIGHT / 2 + 30);
  ctx.fillText('Use arrow keys to move', WIDTH / 2 - 100, HEIGHT / 2 + 60);
  ctx.fillText('Use the x key to shoot', WIDTH / 2 - 100, HEIGHT / 2 + 90);
}

function deathScreen(ctx) {
  ctx.fillText('Game Over!', WIDTH/2 - 50, HEIGHT / 2);
  ctx.fillText('Press SPACE to continue', 252, (HEIGHT / 2) + 35);
}

module.exports = {
  updateHud : updateHud,
  startScreen : startScreen,
  deathScreen : deathScreen
}
