var yourAudio
var ctrl

function initialiseAudio () {
  yourAudio = document.getElementById('yourAudio')
  ctrl = document.getElementById('audioControl')
  ctrl.onclick = function () {
    var play = ctrl.innerHTML === 'play!'
    ctrl.innerHTML = play ? 'pause!' : 'play!'

    var method = play ? 'play' : 'pause'
    yourAudio[method]()

    return false
  }
}

module.exports = {
  initialiseAudio
}
