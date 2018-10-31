const underTest = require('../main/wallService.js')
let drawService = require('../main/draw.js')

jest.mock('../main/draw.js')

afterEach(() => {
  jest.resetAllMocks()
})

test('addWall adds the a wall at the given coordinates to the global list of walls', () => {
  let wall = {id: 1, x: 2, y: 3, w: 50, h: 50}

  underTest.addWall(2, 3)

  expect(underTest.getWalls()[0]).toEqual(wall)
})

test('updateWalls calls the draw service to draw the sprite for all the walls in the global list of walls,', () => {
  underTest.updateWalls()

  expect(drawService.drawSprite).toHaveBeenCalledWith(underTest.wallSprite, underTest.getWalls()[0], drawService.ctx)
})

test('addWall can be called several times to add several walls to the global list of walls', () => {
  let initialNumberOfWalls = underTest.getWalls().length

  underTest.addWall(1, 2)
  underTest.addWall(2, 3)
  underTest.addWall(3, 4)
  underTest.addWall(4, 5)

  let numberOfAddedWalls = underTest.getWalls().length - initialNumberOfWalls

  expect(numberOfAddedWalls).toBe(4)
})