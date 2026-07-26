import { SoundManager } from "../helper/snd-mgr.js";
import { DIRECTION, HEALTH_STATE } from "../types.js";
import { Bubble } from "./bubble.js";
import { HealthyObject } from "./healty-object.js";

/**
 * @typedef {import('../types.js').Offset} Offset
 * @typedef {import('../types.js').Animation} Animaiton
 * @typedef {import('../types.js').Direction} Direction
 * @typedef {import('../types.js').Limits} Limits
 */

/** An evil healthy object. */
export class Enemy extends HealthyObject {
    #direction;
    #limits;

    /**
     * Creates an enemy.
     * @param {number} x - X-Pos of object.
     * @param {number} y - Y-Pos of object.
     * @param {number} width - Width of object.
     * @param {number} height - Height of object.
     * @param {Offset} offset - Offset of object.
     * @param {Object.<string,Animaiton>} animations - Animations of object.
     * @param {Direction} direction - Direction to which object starts to move.
     * @param {Limits} limits - Limits for movement of object.
     */
    constructor(x, y, width, height, offset, animations, direction, limits) {
        super(x, y, width, height, offset, animations);
        this.#direction = direction;
        this.#limits = limits;
    }

    get direction() { return this.#direction; }

    set direction(direction) {
        const validValues = Object.values(DIRECTION);
        if (validValues.includes(direction)) this.#direction = direction;
    }

    get limits() { return this.#limits; }

    /**
     * Draws a rectangle around the limits.
     * @param {CanvasRenderingContext2D} ctx - Context to draw.
     */
    drawLimits(ctx) {
        ctx.stroke.width = 3;
        ctx.strokeStyle = 'green';
        ctx.strokeRect(this.limits.minX, this.limits.minY, this.limits.maxX - this.limits.minX, this.limits.maxY - this.limits.minY);
    }

    bringToLife() {
        this.healthState = HEALTH_STATE.swim;
    }

    // #region Movemnt
    changeDirection() {}

    /** Checks conditions to change direction. */
    checkDirection() {
        if (this.healthState == HEALTH_STATE.swim
            && this.hitbox.x <= this.#limits.minX
            || this.hitbox.x + this.hitbox.width >= this.#limits.maxX
            || this.hitbox.y <= this.#limits.minY
            || this.hitbox.y + this.hitbox.height >= this.#limits.maxY) this.changeDirection();
    }

    /**
     * Movement on swim.
     * @param {number} movement - Distance in pixel after movement.
     */
    moveSwim(movement) {}

    /**
     * Movement on dead.
     * @param {number} movement - Distance in pixel on dead.
     */
    moveDead(movement) {}
    // #endregion

    /**
     * Will be executed on collision width bubble and enemy.
     * @param {Bubble} bubble - Bubble from collision.
     * @param {SoundManager} sndMgr - Instance of SoundManager.
     */
    blubb(bubble, sndMgr) {}
}