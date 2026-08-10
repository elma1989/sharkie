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
        this.healthState = HEALTH_STATE.swim;
    }

    get direction() { return this.#direction; }

    set direction(direction) {
        const validValues = Object.values(DIRECTION);
        if (validValues.includes(direction)) this.#direction = direction;
    }

    /**
     * Draws a rectangle around the limits.
     * @param {CanvasRenderingContext2D} ctx - Context to draw.
     */
    drawLimits(ctx) {
        ctx.stroke.width = 3;
        ctx.strokeStyle = 'green';
        ctx.strokeRect(this.#limits.minX, this.#limits.minY, this.#limits.maxX - this.#limits.minX, this.#limits.maxY - this.#limits.minY);
    }

    // #region Movemnt
    /**
     * Checks limit at postion.
     * @param {number} x - X-Pos.
     * @param {number} y - Y-Pos.
     * @returns {boolean} True, if limit on position.
     */
    limtitAt(x, y) {
        const hitbox = this.hitboxAt(x, y);
        return hitbox.x <= this.#limits.minX
            || hitbox.x + hitbox.width >= this.#limits.maxX
            || hitbox.y <= this.#limits.minY
            || hitbox.y + hitbox.height >= this.#limits.maxY
    }

    /** Changes direction. */
    changeDirection() {
        switch (this.direction) {
            case DIRECTION.NORTH:
                this.direction = DIRECTION.SOUTH;
                break;

            case DIRECTION.EAST:
                this.direction = DIRECTION.WEST;
                break;

            case DIRECTION.SOUTH:
                this.direction = DIRECTION.NORTH;
                break;

            case DIRECTION.WEST:
                this.direction = DIRECTION.EAST;
        }
    }

    /**
     * Move enemy alive.
     * @param {number} timedelta - Time to next frame in ms.
     */
    moveSwim(timedelta) {
        const speed = 400;
        const dirX = this.direction == DIRECTION.EAST ? 1 : (this.direction == DIRECTION.WEST ? -1 : 0);
        const dirY = this.direction == DIRECTION.SOUTH ? 1 :  (this.direction == DIRECTION.NORTH ? -1 : 0);
        const newX = this.x + dirX * speed * timedelta / 1000;
        const newY = this.y + dirY * speed * timedelta / 1000;
        if (this.limtitAt(newX, newY)) this.changeDirection();
        else {
            this.x = newX;
            this.y = newY;
        }
    }

    /**
     * Move enemy after dead.
     * @param {number} timedelta - Time to next frame in ms.
     */
    moveDead(timedelta) {
        if (this.y < -300) this.onDead?.();
    }

    /**
     * @inheritdoc
     * @override
     * @param {number} timedelta
     */
    updateMovement(timedelta) {
        switch(this.healthState) {
            case HEALTH_STATE.swim:
                this.moveSwim(timedelta);
                break;

            case HEALTH_STATE.dead:
                this.moveDead(timedelta);
        }
    }
    // #endregion

    /**
     * Will be executed on collision width bubble and enemy.
     * @param {Bubble} bubble - Bubble from collision.
     */
    blubb(bubble) {}
}