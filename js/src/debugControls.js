// TODO: Find a way around having drawHitboxes at window scope
const DEBUG_DIV = 'debug-controls';

window.drawHitboxes = false;

module.exports = {
  addDebugControls : function() {
    debugDiv = document.getElementById(DEBUG_DIV);
    debugDiv.innerHTML = '<h1>Debug</h1>';
    debugDiv.innerHTML += '<input type="checkbox" id="hitbox_toggle" >Show HitBoxes</input>';
    var checkbox = document.getElementById('hitbox_toggle');

    checkbox.addEventListener( 'change', function() {
      alert(this.checked);
      window.drawHitboxes = this.checked;
    });
  }
}
