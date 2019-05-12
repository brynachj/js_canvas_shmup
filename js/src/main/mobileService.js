function replaceContentWithMobileSpecificContent () {
  window.alert('This game is not intended for mobile. Unfortunately it requires a keyboard to control. If you would like to implement a mobile control scheme you can fork the repo here: https://github.com/brynachj/js_canvas_shmup')
  window.stop()
}

module.exports = {
  replaceContentWithMobileSpecificContent
}
