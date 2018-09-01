const underTest = require('../main/enemyAttack.js')

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
