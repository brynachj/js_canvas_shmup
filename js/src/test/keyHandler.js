const underTest = require('../main/keyHandler.js')

test('By default getGameStarted returns false', () => {
  expect(underTest.getGameStarted()).toBe(false)
})
