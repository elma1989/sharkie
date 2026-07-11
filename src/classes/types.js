/**
  * @typedef {Object} Offset
  * @property {number} top - Top of offset.
  * @property {number} right - Right of offset.
  * @property {number} bottom - Bottom of offset.
  * @property {number} left - Left of offset.
  */

/** 
 * @typedef {Object} Hitbox 
 * @property {number} x - X-Pos of box.
 * @property {number} y - Y-Pos of box.
 * @property {number} width - Width of box.
 * @property {number} height - Height of box.
 * */

/**
 * @typedef {Object} Animation
 * @property {HTMLImageElement[]} frames - Sprites of animation.
 * @property {number} duration - Duration of animation in ms.
 * @property {boolean} loop - True , if animation has loop.
 */

/**
 * @typedef {Object} Limits
 * @property {number} minX - Smallesst x-Pos.
 * @property {number} maxX - Biggest x-Pos.
 * @property {number} minY - Smallest y-Pos.
 * @property {number} maxY - Bigges y-Pos.
 */

export {}

export const HEALTH_STATE = Object.freeze({
  idle: 'idle',
  longIdle: 'longIdle',
  swim: 'swim',
  spawn: 'spawn',
  hurt: 'hurt',
  'hurt/poison': 'hurt/poison',
  'hurt/electric': 'hurt/electric',
  dead: 'dead',
  'dead/poison': 'dead/poison',
  'dead/electric': 'dead/electric',
  attack: 'attack',
  'attack/slap' : 'attack/slap',
  'attack/bubble/normal': 'attack/bubble/normal',
  'attack/bubble/poison': 'attack/bubble/poison'
})

/**
 * @typedef {typeof HEALTH_STATE[keyof typeof HEALTH_STATE]} HealthState
 */

export const DIRECTION = Object.freeze({
  NORTH: 'north',
  EAST: 'east',
  SOUTH: 'south',
  WEST: 'west'
})

/**
 * @typedef {typeof DIRECTION[keyof typeof DIRECTION]} Direction
 */

export const PUFFER_STATE = Object.freeze({
  EMPTY: 'empty',
  TRANSFORM: 'transform',
  FULL: 'full'
})

/**
 * @typedef {typeof PUFFER_STATE[keyof typeof PUFFER_STATE]} PufferState
 */