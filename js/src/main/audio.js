var yourAudio
var ctrl

function initialiseAudio () {
  yourAudio = document.getElementById('yourAudio')
  ctrl = document.getElementById('audioControl')
  ctrl.onclick = function () {
    var play = ctrl.innerHTML === 'Music: <i class="fas fa-volume-mute"></i>'
    ctrl.innerHTML = play ? 'Music: <i class="fas fa-volume-up"></i>' : 'Music: <i class="fas fa-volume-mute"></i>'

    if (play) {
      playMusic()
    } else {
      pauseMusic()
    }
    return false
  }
}

function playMusic () {
  ctrl.innerHTML = 'Music: <i class="fas fa-volume-up"></i>'

  yourAudio['play']()
}

function pauseMusic () {
  ctrl.innerHTML = 'Music: <i class="fas fa-volume-mute"></i>'
  yourAudio['pause']()
}

module.exports = {
  initialiseAudio,
  playMusic,
  pauseMusic
}
