
 function drawHitbox(object, ctx) {
  ctx.strokeStyle=object.hitBoxColor;
  ctx.strokeRect(object.x,object.y,object.w, object.h);
}

 function drawSprite(sprite, object, ctx) {
  ctx.drawImage(sprite, object.x, object.y);
  if(window.drawHitboxes){
    drawHitbox(object, ctx);
  }
}

module.exports = {
  drawSprite: drawSprite,
  drawHitbox: drawHitbox
}
