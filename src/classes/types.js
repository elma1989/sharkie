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

export {}

export const HEALTH_STATE = Object.freeze({
  idle: 'idle',
  longIdle: 'longIdle',
  swim: 'swim',
  'hurt/poison': 'hurt/poison',
  'hurt/electric': 'hurt/electric',
  'dead/poison': 'dead/poison',
  'dead/electric': 'dead/electric',
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