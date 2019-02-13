const AUDIO_CONTROLS_DIV = 'audio-controls'
const AUDIO_DIV = 'audio'

var yourAudio
var ctrl

function initialiseAudio () {
  yourAudio = document.getElementById('yourAudio')
  ctrl = document.getElementById('audioControl')
  ctrl.onclick = function () {
    var pause = ctrl.innerHTML === 'pause!'
    ctrl.innerHTML = pause ? 'play!' : 'pause!'

    var method = pause ? 'pause' : 'play'
    yourAudio[method]()

    return false
  }
}

function addAudio (debugInfo) {
  let debugDiv = document.getElementById(AUDIO_DIV)
  debugDiv.innerHTML += '<source src="audio/game_music.wav" autoplay loop type="audio/wav">'
}

function addAudioControls () {
  let debugDiv = document.getElementById(AUDIO_CONTROLS_DIV)
  debugDiv.innerHTML = '<button id="pause-audio" type="button">Pause Audio</button>'
}

function addPauseButtonEventListener () {
  var paueButton = document.getElementById('pause-audio')

  var audio = document.getElementById(AUDIO_DIV)

  paueButton.addEventListener('click', function () {
    console.log('here')
    audio.play()
  })
}

module.exports = {
  addAudioControls,
  addPauseButtonEventListener,
  addAudio,
  initialiseAudio
}
