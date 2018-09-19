var player_drawer = require('./playerDrawer.js');
var enemy_manager = require('../enemy/enemyManager.js');
var collision_detection_module = require('../collisionDetection.js');

const IDLE = 'idle', ATTACKING = 'attacking', WINDING_DOWN = 'winding_down';

let hitEnemyList = []

function attack(player) {
    let animationFrame = player.attackAnimationFrame;
    switch(true) {
      case animationFrame < 5:
        windingUp(player);
        break;
      case animationFrame < 10:
        attacking(player);
        break;
      case animationFrame < 19:
        windingDown(player);
        break;
      case animationFrame === 19:
        windingDown(player);
        hitEnemyList = [];
        player.state = IDLE;
        break;
    }
    animationFrame += 1;
    player.attackAnimationFrame = animationFrame % 20;
  }
  
  function windingUp(player){
    player_drawer.drawWindUpAttack(player);
    player.state = ATTACKING;
  }
  
  function attacking(player) {
    player_drawer.drawAttacking(player);
    player.state = ATTACKING;
    enemy_manager.enemies.filter(e => collision_detection_module.collisionDetection(player.attack_box, e))
                          .filter(e => hitEnemyList.indexOf(e) < 0).map(e => hitEnemy(e));
  }
  
  function hitEnemy(enemy) {
    enemy_manager.hitEnemy(enemy, 50);
    hitEnemyList.push(enemy);
  }
  
  function windingDown(player) {
    player.state = WINDING_DOWN;
  }

  module.exports = {
      attack
  }