var player_module = require('./player.js');
var pebble_module = require('./pebble.js');

function updateHud(ctx) {
  ctx.font = 'bold 18px Arial';
  ctx.fillStyle = '#fff';
  ctx.fillText('Experience: ', 10, 30);
  ctx.fillText(player_module.getExperience(), 120, 30);
  ctx.fillText('Pebbles: ', 160, 30);
  ctx.fillText(pebble_module.ammo, 260, 30);
  ctx.fillText('Health:', 10, 60); // TODO: Replace with a health bar
  ctx.fillText(player_module.getHealth(), 68, 60);
}

module.exports = {
  updateHud : updateHud
}
