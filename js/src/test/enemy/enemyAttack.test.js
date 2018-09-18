const underTest = require('../../main/enemy/enemyAttack.js')
var playerModule = require('../../main/player/player.js')
var enemyDrawer = require('../../main/enemy/enemyDrawer.js')
var collisionDetectionModule = require('../../main/collisionDetection.js')

jest.mock('../../main/player/player.js')
jest.mock('../../main/enemy/enemyDrawer.js')
jest.mock('../../main/collisionDetection.js')

it('attack moves the given enemy animationFrame forward by 1 when it is less than 30', () => {
  let enemy = {attackAnimationFrame: 0, attacking: false, hitPlayer: false}

  underTest.attack(enemy)

  expect(enemy.attackAnimationFrame).toBe(1)

  underTest.attack(enemy)

  expect(enemy.attackAnimationFrame).toBe(2)
})

it('attack sets the given enemy animationFrame to 0 when gets to 30', () => {
  let enemy = {attackAnimationFrame: 29, attacking: false, hitPlayer: false}

  underTest.attack(enemy)

  expect(enemy.attackAnimationFrame).toBe(0)
})

it('attack calls enemyDrawer drawWindUpAttack when attackAnimationFrame is less than 10', () => {
  let enemy = {attackAnimationFrame: 0, attacking: false, hitPlayer: false}
  let enemyFurtherAlongAnimation = {attackAnimationFrame: 8, attacking: false, hitPlayer: false}

  underTest.attack(enemy)
  underTest.attack(enemyFurtherAlongAnimation)

  expect(enemyDrawer.drawWindUpAttack).toBeCalledWith(enemy)
  expect(enemyDrawer.drawWindUpAttack).toBeCalledWith(enemyFurtherAlongAnimation)
})

it('attack calls enemyDrawer drawWindDownAttack when attackAnimationFrame is between 20 and 29', () => {
  let enemy = {attackAnimationFrame: 20, attacking: false, hitPlayer: false}
  let enemyFurtherAlongAnimation = {attackAnimationFrame: 28, attacking: false, hitPlayer: false}

  underTest.attack(enemy)
  underTest.attack(enemyFurtherAlongAnimation)

  expect(enemyDrawer.drawWindDownAttack).toBeCalledWith(enemy)
  expect(enemyDrawer.drawWindDownAttack).toBeCalledWith(enemyFurtherAlongAnimation)
})

it('attack calls enemyDrawer drawAttacking when attackAnimationFrame is between 10 and 19', () => {
  let enemy = {attackAnimationFrame: 10, attacking: false, hitPlayer: false}
  let enemyFurtherAlongAnimation = {attackAnimationFrame: 18, attacking: false, hitPlayer: false}

  underTest.attack(enemy)
  underTest.attack(enemyFurtherAlongAnimation)

  expect(enemyDrawer.drawAttacking).toBeCalledWith(enemy)
  expect(enemyDrawer.drawAttacking).toBeCalledWith(enemyFurtherAlongAnimation)
})

it('attack calls collisionDetectionModule collisionDetection with the playerModule and given enemy attack box when attackAnimationFrame is between 10 and 19', () => {
  let playerAttackBox = {x: 10, y: 5, w: 10, h: 10}
  let playerAttackBox2 = {x: 12, y: 6, w: 20, h: 30}
  let enemy = {attackAnimationFrame: 10, attacking: false, hitPlayer: false, player_attack_box: playerAttackBox}
  let enemyFurtherAlongAnimation = {attackAnimationFrame: 18, attacking: false, hitPlayer: false, player_attack_box: playerAttackBox2}
  let mockPlayer = {key: 'value'}

  playerModule.getPlayer.mockImplementation(() => { return mockPlayer })

  underTest.attack(enemy)
  underTest.attack(enemyFurtherAlongAnimation)

  expect(playerModule.getPlayer).toHaveBeenCalled()
  expect(collisionDetectionModule.collisionDetection).toBeCalledWith(mockPlayer, enemy.player_attack_box)
  expect(collisionDetectionModule.collisionDetection).toBeCalledWith(mockPlayer, enemyFurtherAlongAnimation.player_attack_box)
})

it('attack calls playerModule updateHealth and enemy hitPlayer to be true when attackAnimationFrame is between 10 and 19 and collision with player is true', () => {
  let playerAttackBox = {x: 10, y: 5, w: 10, h: 10}
  let enemy = {attackAnimationFrame: 10, attacking: false, hitPlayer: false, player_attack_box: playerAttackBox}
  let mockPlayer = {key: 'value'}

  playerModule.getPlayer.mockImplementation(() => { return mockPlayer })
  collisionDetectionModule.collisionDetection.mockImplementation(() => { return true })

  underTest.attack(enemy)

  expect(playerModule.updateHealth).toBeCalledWith(-40)
  expect(enemy.hitPlayer).toBe(true)
})

it('attack calls enemyDrawer drawWindDownAttack when attackAnimationFrame is between 20 and 29', () => {
  let enemy = {attackAnimationFrame: 20, attacking: false, hitPlayer: false}
  let enemyFurtherAlongAnimation = {attackAnimationFrame: 28, attacking: false, hitPlayer: false}

  underTest.attack(enemy)
  underTest.attack(enemyFurtherAlongAnimation)

  expect(enemyDrawer.drawWindDownAttack).toBeCalledWith(enemy)
  expect(enemyDrawer.drawWindDownAttack).toBeCalledWith(enemyFurtherAlongAnimation)
})
