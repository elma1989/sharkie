import { DIRECTION, HEALTH_STATE, PUFFER_STATE } from "../types.js";
import { Enemy } from "./enemy.js";

/**
 * @typedef {import('../types.js').Offset} Offset
 * @typedef {import('../types.js').Animation} Animaiton
 * @typedef {import('../types.js').Direction} Direction
 * @typedef {import('../types.js').Limits} Limits
 * @typedef {import('../types.js').PufferState} PufferState
 */

export class PufferFish extends Enemy {
    #prevPufferState = null;
    #curPufferState = PUFFER_STATE.EMPTY;
    #pufferTimer = null;
    #deathImg = {
        empty: null,
        transition: null,
        full: null
    }
    #imgDeadEmpty = null;
    #imgDeadTransition = null;
    #imgDeadFull = null;

    /**
     * Creates a puffer fish.
     * @param {number} x - X-Pos of object.
     * @param {number} y - Y-Pos of object.
     * @param {number} minX - Minimum X-Pos of object.
     * @param {number} maxX - Maximum Y-Pos of object.
     */
    constructor(x, y, minX, maxX) {
        super(x, y, 241, 198, {
            top: 30,
            right: 50,
            bottom: 60,
            left: 30
        }, {
            'swim/empty': {
                frames: [],
                duration: 700,
                loop: true
            },
            'swim/transition': {
                frames: [],
                duration: 1000,
                loop: false
            },
            'swim/full': {
                frames: [],
                duration: 700,
                loop: true
            }
        }, DIRECTION.WEST, {
            minX: minX,
            maxX: maxX,
            minY: y - 10,
            maxY: y + 10
        });
    }

    get deathImg() { return this.#deathImg; }

    changeDirection() {
        this.direction = this.direction == DIRECTION.WEST ? DIRECTION.EAST : DIRECTION.WEST;
        this.mirrorHorzontally = this.direction == DIRECTION.EAST;
    }

    updateMovement(timedelta) {
        let movement;
        if(this.healthState == HEALTH_STATE.swim) {
            movement = this.movement(400, timedelta);
            this.x += this.direction == DIRECTION.WEST ? -movement : movement;
            super.updateMovement();
        } else if (this.healthState == HEALTH_STATE.dead) {
            movement = this.movement(1500, timedelta);
            this.x -= movement;
            this.y -= movement;
        }
    }
}