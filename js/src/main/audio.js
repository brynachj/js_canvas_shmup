var yourAudio
var ctrl

function initialiseAudio () {
  yourAudio = document.getElementById('yourAudio')
  ctrl = document.getElementById('audioControl')
  ctrl.onclick = function () {
    var play = ctrl.innerHTML === 'Music: <i class="fas fa-volume-mute"></i>'
    ctrl.innerHTML = play ? 'Music: <i class="fas fa-volume-up"></i>' : 'Music: <i class="fas fa-volume-mute"></i>'

    var method = play ? 'play' : 'pause'
    yourAudio[method]()

    return false
  }
}

module.exports = {
  initialiseAudio
}
