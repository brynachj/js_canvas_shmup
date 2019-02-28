var constants = require('./shared/constants')

function startScreen (ctx) {
  ctx.font = 'bold 40px Arial'
  ctx.fillStyle = '#fff'
  ctx.fillText('Hit SPACE to Play', constants.CANVAS_WIDTH / 2 - 170, constants.CANVAS_HEIGHT / 2)
  ctx.font = '12px Arial'
  ctx.fillText('Note: this game contains audio, including music', constants.CANVAS_WIDTH / 2 - 130, constants.CANVAS_HEIGHT / 2 + 25)
}

function deathScreen (ctx) {
  ctx.font = 'bold 20px Arial'
  ctx.fillStyle = '#fff'
  ctx.fillText('Game Over!', constants.CANVAS_WIDTH / 2 - 50, constants.CANVAS_HEIGHT / 2)
  ctx.fillText('Hit SPACE to continue', 252, (constants.CANVAS_HEIGHT / 2) + 35)
}

function nextLevelScreen (ctx, levelNumber) {
  ctx.font = 'bold 18px Arial'
  ctx.fillStyle = '#fff'
  ctx.fillText('Congratulations, you beat level ' + levelNumber, constants.CANVAS_WIDTH / 2 - 150, constants.CANVAS_HEIGHT / 2)
  ctx.fillText('Hit SPACE to continue', constants.CANVAS_WIDTH / 2 - 120, (constants.CANVAS_HEIGHT / 2) + 35)
}

function gameCompleteScreen (ctx) {
  ctx.font = 'bold 40px Arial'
  ctx.fillStyle = '#fff'
  ctx.fillText('Congratulations!', constants.CANVAS_WIDTH / 2 - 170, constants.CANVAS_HEIGHT / 2)
  ctx.fillText('You beat every single level!', constants.CANVAS_WIDTH / 2 - 250, constants.CANVAS_HEIGHT / 2 + 40)
}

module.exports = {
  startScreen,
  deathScreen,
  nextLevelScreen,
  gameCompleteScreen
}
