var playerModule = require('./player/player.js')
var pebbleModule = require('./pebble/pebble.js')
var constants = require('./shared/constants')

function updateHud (ctx) {
  ctx.font = 'bold 18px Arial'
  ctx.fillStyle = '#fff'
  ctx.fillText('Bullets: ', 10, 30)
  ctx.fillText(pebbleModule.getAmmo(), 80, 30)
  ctx.fillText('Health:', 10, 60) // TODO: Replace with a health bar
  ctx.fillText(playerModule.getHealth(), 68, 60)
}

function startScreen (ctx) {
  ctx.font = 'bold 40px Arial'
  ctx.fillText('Hit SPACE to Play', constants.CANVAS_WIDTH / 2 - 170, constants.CANVAS_HEIGHT / 2)
}

function deathScreen (ctx) {
  ctx.font = 'bold 20px Arial'
  ctx.fillText('Game Over!', constants.CANVAS_WIDTH / 2 - 50, constants.CANVAS_HEIGHT / 2)
  ctx.fillText('Hit SPACE to continue', 252, (constants.CANVAS_HEIGHT / 2) + 35)
}

function nextLevelScreen (ctx, levelNumber) {
  ctx.fillText('Congratulations, you beat level ' + levelNumber, constants.CANVAS_WIDTH / 2 - 150, constants.CANVAS_HEIGHT / 2)
  ctx.fillText('Hit SPACE to continue', constants.CANVAS_WIDTH / 2 - 120, (constants.CANVAS_HEIGHT / 2) + 35)
}

function gameCompleteScreen (ctx) {
  ctx.font = 'bold 40px Arial'
  ctx.fillText('Congratulations!', constants.CANVAS_WIDTH / 2 - 170, constants.CANVAS_HEIGHT / 2)
  ctx.fillText('You beat every single level!', constants.CANVAS_WIDTH / 2 - 250, constants.CANVAS_HEIGHT / 2 + 40)
}

module.exports = {
  updateHud,
  startScreen,
  deathScreen,
  nextLevelScreen,
  gameCompleteScreen
}
