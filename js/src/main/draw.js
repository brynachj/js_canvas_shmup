
let ctx

function drawHitbox (object, context) {
  context.strokeStyle = object.hitBoxColor
  context.strokeRect(object.x, object.y, object.w, object.h)
}

function drawSprite (sprite, object, context) {
  context.drawImage(sprite, object.x, object.y)
  if (window.drawHitboxes) {
    drawHitbox(object, context)
  }
}

function drawRectangle (object, color, context) {
  context.fillStyle = color
  context.fillRect(object.x, object.y, object.w, object.h)
}

module.exports = {
  drawSprite,
  drawRectangle,
  drawHitbox,
  ctx
}
