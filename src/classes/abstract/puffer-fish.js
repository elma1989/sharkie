import { Sharkie } from "../model/sharkie.js";
import { DIRECTION, HEALTH_STATE, PUFFER_STATE } from "../types.js";
import { Enemy } from "./enemy.js";

/**
 * @typedef {Object} DeathImage
 * @property {Image?} empty - Image for empty puffer state.
 * @property {Image?} transition - Image for neither empty nor full state.
 * @property {Image?} full - Image for full puffer state.
 */

/**
 * Represents a fish, which can blow up.
 * @extends Enemy
 */
export class PufferFish extends Enemy {
    /**
     * Current state of body.
     * @type {PufferState}
     */
    #pufferState = PUFFER_STATE.EMPTY;
    /**
     * Timer for change of puffer state.
     * @type {number}
     */
    #pufferTimer = 0;
    /**
     * A map of images of dead dependens on puffer state.
     * @type {DeathImage}
     */
    #deathImg = {
        empty: null,
        transition: null,
        full: null
    }

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
            maxY: y + 200
        });
    }

    // #region Methods
    get deathImg() { return this.#deathImg; }

    // #region Movment
    moveSwim(timedelta) {
        this.mirrorHorzontally = this.direction == DIRECTION.EAST;
        super.moveSwim(timedelta);
    }

    moveDead(timedelta) {
        const speed = 1200;
        this.x -= speed * timedelta / 1000;
        this.y -= speed * timedelta / 1000;
        super.moveDead(timedelta);
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

    /**
     * Updates the animation for puffer fishes
     * @param {number} timedelta - Time to next frame in ms.
     */
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

    /** 
     * Prepares the death of puffer fishes.
     * @override
     */
    prepareDeath() {
        this.healthState = HEALTH_STATE.dead;
        this.img = this.#pufferState == PUFFER_STATE.EMPTY ? this.deathImg.empty : (this.#pufferState == PUFFER_STATE.FULL ? this.deathImg.full : this.deathImg.transition);
    }

    /**
     * Action for puffer fish hits Sharkie.
     * @param {Sharkie} sharkie - Instanz of main-character.
     * @override
     */
    hit(sharkie) {
        if (sharkie.isAttackSlap()) {
            sharkie.playSlap(this);
            this.injure(100);
        } else sharkie.injureBy('poison', 10);
    }
    // #endregion
}