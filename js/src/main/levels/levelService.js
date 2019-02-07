var levelOne = require('./one.js')
var levelTwo = require('./two.js')
var levelThree = require('./three.js')
var levelFour = require('./four.js')
var levelFive = require('./five.js')
var levelSix = require('./six.js')
var levelSeven = require('./seven.js')
var wallService = require('../wallService.js')
var enemyService = require('../enemy/enemyService.js')
var player = require('../player/player.js')

var levels = [levelOne, levelTwo, levelThree, levelFour, levelFive, levelSix, levelSeven]
var levelNumber = 0

function initialiseNextLevel () {
  player.resetPlayer()
  wallService.removeAllWalls()
  enemyService.removeAllEnemies()
  if (levels[levelNumber].level) {
    let rowNumber = 0
    levels[levelNumber].level.map(row => {
      let columnNumber = 0
      row.map(column => {
        if (column === 1) {
          wallService.addWall(columnNumber * 30, rowNumber * 30)
        } else if (column === 2) {
          enemyService.addEnemy(columnNumber * 30, rowNumber * 30)
        }
        columnNumber++
      })
      rowNumber++
    })
    levelNumber++
  } else {
    enemyService.addEnemy(Math.random() * 600, Math.random() * 600)
    wallService.addWall(Math.random() * 600, Math.random() * 600)
  }
}

function getLevelNumber() {
  return levelNumber
}

function setLevelNumber(newLevelNumber) {
  levelNumber = newLevelNumber
}

module.exports = {
  initialiseNextLevel,
  getLevelNumber,
  setLevelNumber
}