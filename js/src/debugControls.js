// TODO: Find a way around having drawHitboxes at window scope
const DEBUG_DIV = 'debug-controls';

window.drawHitboxes = false;

function addDebugControls() {
  debugDiv = document.getElementById(DEBUG_DIV);
  debugDiv.innerHTML = '<h1>Debug</h1>';
  debugDiv.innerHTML += '<input type="checkbox" id="hitbox_toggle" >Show HitBoxes</input>';
  var checkbox = document.getElementById('hitbox_toggle');

  checkbox.addEventListener( 'change', function() {
    window.drawHitboxes = this.checked;
  });
}

function writeOutDebug(debugInfo) {
  debugDiv = document.getElementById(DEBUG_DIV);
  debugDiv.innerHTML += '<p>' + debugInfo + '</p>'
}

module.exports = {
  debug : true,
  addDebugControls : addDebugControls,
  writeOutDebug : writeOutDebug
}
