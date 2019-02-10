var playerModule = require('./player/player.js')
var pebbleModule = require('./pebble/pebble.js')
var constants = require('./shared/constants')

function updateHud (ctx) {
  ctx.font = 'bold 18px Arial'
  ctx.fillStyle = '#fff'
  ctx.fillText('Experience: ', 10, 30)
  ctx.fillText(playerModule.getExperience(), 120, 30)
  ctx.fillText('Pebbles: ', 160, 30)
  ctx.fillText(pebbleModule.getAmmo(), 260, 30)
  ctx.fillText('Health:', 10, 60) // TODO: Replace with a health bar
  ctx.fillText(playerModule.getHealth(), 68, 60)
}

function startScreen (ctx) {
  ctx.font = 'bold 50px Arial'
  ctx.fillText('Enemy or Wall?', constants.CANVAS_WIDTH / 2 - 190, constants.CANVAS_HEIGHT / 2)
  ctx.font = 'bold 20px Arial'
  ctx.fillText('Hit SPACE to Play', constants.CANVAS_WIDTH / 2 - 90, constants.CANVAS_HEIGHT / 2 + 30)
  ctx.fillText('Use arrow keys to move', constants.CANVAS_WIDTH / 2 - 120, constants.CANVAS_HEIGHT / 2 + 60)
  ctx.fillText('Use the x key to shoot', constants.CANVAS_WIDTH / 2 - 110, constants.CANVAS_HEIGHT / 2 + 90)
}

function deathScreen (ctx) {
  ctx.font = 'bold 20px Arial'
  ctx.fillText('Game Over!', constants.CANVAS_WIDTH / 2 - 50, constants.CANVAS_HEIGHT / 2)
  ctx.fillText('Press SPACE to continue', 252, (constants.CANVAS_HEIGHT / 2) + 35)
}

function nextLevelScreen (ctx, levelNumber) {
  ctx.fillText('Congratulations, you beat level ' + levelNumber, constants.CANVAS_WIDTH / 2 - 150, constants.CANVAS_HEIGHT / 2)
  ctx.fillText('Press SPACE to continue', constants.CANVAS_WIDTH / 2 - 120, (constants.CANVAS_HEIGHT / 2) + 35)
}

module.exports = {
  updateHud,
  startScreen,
  deathScreen,
  nextLevelScreen
}
