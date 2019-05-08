var levelOne = require('./01.js')
var levelTwo = require('./02.js')
var levelThree = require('./03.js')
var levelFour = require('./04.js')
var levelFive = require('./05.js')
var levelSix = require('./06.js')
var levelSeven = require('./07.js')
var levelEight = require('./08.js')
var levelNine = require('./09.js')
var levelTen = require('./10.js')
var levelEleven = require('./11.js')
var levelTwelve = require('./12.js')
var wallService = require('../wallService.js')
var enemyService = require('../enemy/enemyService.js')
var player = require('../player/player.js')

var levels = [levelOne, levelTwo, levelThree, levelFour, levelFive, levelSix, levelSeven, levelEight, levelNine, levelTen, levelEleven, levelTwelve]
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

function getLevels() {
  return levels
}

module.exports = {
  initialiseNextLevel,
  getLevelNumber,
  setLevelNumber,
  getLevels
}