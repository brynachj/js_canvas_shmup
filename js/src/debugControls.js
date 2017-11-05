
const DEBUG_DIV = 'debug-controls';

var drawHitboxes;

function addDebugControls() {
  debugDiv = document.getElementById(DEBUG_DIV);
  debugDiv.innerHTML = '<h1>Debug</h1>';
  debugDiv.innerHTML += '<input type="checkbox" id="blacklist" onclick="validate()">Show HitBoxes</input>';
}

function validate() {
  drawHitboxes = document.getElementById('blacklist').checked;
}
