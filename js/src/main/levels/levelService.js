var levelOne = require('./one.js')
var levelTwo = require('./two.js')
var wallService = require('../wallService.js')
var enemyService = require('../enemy/enemyService.js')
var player = require('../player/player.js')

var levels = [levelOne, levelTwo]
var levelNumber = 0

function initialiseNextLevel () {
  player.resetPlayer()
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

module.exports = {
  initialiseNextLevel,
  getLevelNumber
}