
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

function drawCircle (object, color, context) {
  context.fillStyle = color
  let clockwise = true
  context.beginPath()
  context.arc(object.x + (object.w / 2), object.y + (object.h / 2), (object.w / 2), 0, Math.PI * 2, clockwise)

  context.fill()
}

module.exports = {
  drawSprite,
  drawRectangle,
  drawHitbox,
  drawCircle,
  ctx
}
