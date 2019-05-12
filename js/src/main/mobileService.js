function replaceContentWithMobileSpecificContent () {
  var instructionsElement = document.getElementById('instructions')
  instructionsElement.innerHTML = '<h1>Sorry!</h1><p>This game is not intended for mobile</p><p>Unfortunately it currently requires a keyboard to play</p><p>If you would like to help implement a mobile control scheme you can fork the repo here:</p><p><a href="https://github.com/brynachj/js_canvas_shmup">https://github.com/brynachj/js_canvas_shmup</a></p>'

  var gameElement = document.getElementById('gameArea')
  gameElement.innerHTML = ''
}

module.exports = {
  replaceContentWithMobileSpecificContent
}
