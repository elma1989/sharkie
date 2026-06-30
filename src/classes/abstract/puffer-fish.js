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
    #pufferState = PUFFER_STATE.EMPTY;
    #pufferTimer = 0;
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

    // #region Methods
    get deathImg() { return this.#deathImg; }

    // #region Movment
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
    // #endregion

    // #region Animation
    /** Changes to the next puffer state. */
    #nextPufferState() {
        if (this.#pufferState == PUFFER_STATE.EMPTY) this.#pufferState = PUFFER_STATE.TRANSFORM;
        else if (this.#pufferState == PUFFER_STATE.TRANSFORM) this.#pufferState = PUFFER_STATE.FULL;
        else this.#pufferState = PUFFER_STATE.EMPTY;
    }

    /** Plays animation for current puffer state. */
    #checkPufferState() {
        if (this.animationTimer >= this.durationFrame) {
            switch (this.#pufferState) {
                case PUFFER_STATE.EMPTY:
                    this.playAnimation('swim/empty');
                    break;
                case PUFFER_STATE.TRANSFORM:
                    this.playAnimation('swim/transition');
                    break;
                case PUFFER_STATE.FULL:
                    this.playAnimation('swim/full');
            }
            this.animationTimer -= this.durationFrame;
        }
    }

    updateAnimation(timedelta) {
        if (this.healthState == HEALTH_STATE.swim) {
            this.animationTimer += timedelta;
            this.#pufferTimer += timedelta;
            this.#checkPufferState();
            if (this.#pufferState == PUFFER_STATE.TRANSFORM && this.curImg == 5 || this.#pufferTimer >= 10000) {
                this.#nextPufferState();
                this.#pufferTimer = 0;
            }
        }
    }
    // #endregion
    // #endregion
}