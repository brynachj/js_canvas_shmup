const CANVAS = 'canvas'

const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 600

const KEY_DOWN_EVENT = 'keydown'
const KEY_UP_EVENT = 'keyup'

// player directions
const UP = 'up'
const DOWN = 'down'
const LEFT = 'left'
const RIGHT = 'right'

// player states
const IDLE = 'idle'
const ATTACKING = 'attacking'
const WINDING_DOWN = 'winding_down'
const DASHING = 'dashing'

// player properties
const PLAYER_WIDTH = 20
const PLAYER_HEIGHT = 26
const ATTACK_WIDTH = 15
const MOVEMENT_SPEED = 5
const DASH_PER_FRAME_LENGTH = 17

// enemy properties
const ENEMY_WIDTH = 34
const ENEMY_HEIGHT = 36
const ENEMY_SPEED = 3

module.exports = {
  CANVAS,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  KEY_DOWN_EVENT,
  KEY_UP_EVENT,
  UP,
  DOWN,
  LEFT,
  RIGHT,
  IDLE,
  ATTACKING,
  WINDING_DOWN,
  DASHING,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  ATTACK_WIDTH,
  MOVEMENT_SPEED,
  DASH_PER_FRAME_LENGTH,
  ENEMY_WIDTH,
  ENEMY_HEIGHT,
  ENEMY_SPEED
}
