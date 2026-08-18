import { DrawableObject } from './drawable-object.js';

/** 
 * @typedef {import(../types.js).Offset} Offset
 * @typedef {import(../types.js).Hitbox} Hitbox
 * @typedef {import('./barrier.js').Barrier} Barrier
/**

/**
 * Represents an object, which has collision.
 */
export class CollidingObject extends DrawableObject {
    /** @type {Offset} */
    #offset;
    /**
     * Creates a colliding object.
     * @param {number} x - X-Pos of object.
     * @param {number} y - Y-Pos of ojbect.
     * @param {number} width - Width of object.
     * @param {number} height - Height of object.
     * @param {Offset} offset - Offset of object.
     */
    constructor(x, y, width, height, offset) {
        super(x, y, width, height);
        this.#offset = offset;
    }

    get hitbox() {
        return {
            x: this.x + this.#offset.left,
            y: this.y + this.#offset.top,
            width: this.width - this.#offset.left - this.#offset.right,
            height: this.height - this.#offset.top - this.#offset.bottom
        }
    }

    get offset() { return this.#offset; }

    /**
     * Sets a new offset.
     * @param {Offset} offset - Offet to set
     */
    set offset(offset) { this.#offset = offset;}

    /**
     * Draws a full frame around the object.
     * @param {CanvasRenderingContext2D} ctx - Context from canvas
     */
    drawFrame(ctx) {
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 3;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    /**
     * Draws the offset-frame.
     * @param {CanvasRenderingContext2D} ctx - Context from canvas.
     */
    drawOffsetFrame(ctx) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        ctx.strokeRect(
            this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height
        );
    }

    /**
     * Calculates a hitbox form coordinaties.
     * @param {number} x - X-Pos for hitbox.
     * @param {number} y - Y-Pos for hitbox.
     * @returns {Hitbox} - Hitbox from coorinations.
     */
    hitboxAt(x, y) {
        return {
            x: x + this.#offset.left,
            y: y + this.#offset.top,
            width: this.width - this.#offset.left - this.#offset.right,
            height: this.height - this.#offset.top - this.#offset.bottom
        }
    }

    /**
     * Checks, if this object collides with other object.
     * @param {CollidingObject} other - Object, for which collision to check.
     * @returns {boolean} true, if object a colliding.
     */
    isColliding(other) {
        return this.hitbox.x + this.hitbox.width >= other.hitbox.x
            && this.hitbox.x <= other.hitbox.x + other.hitbox.width
            && this.hitbox.y + this.hitbox.height >= other.hitbox.y
            && this.hitbox.y <= other.hitbox.y + other.hitbox.height;
    }

    /**
     * Checks, if coorinates of an object has collision with barrier.
     * @param {Hitbox} hitbox - Hit-Box of oject.
     * @param {Barrier} barrier - Barrier to check.
     * @returns {boolean} - True, if it has collision.
     */
    collidesAt(hitbox, barrier) {
        return hitbox.x + hitbox.width >= barrier.hitbox.x
            && hitbox.x <= barrier.hitbox.x + barrier.hitbox.width
            && hitbox.y + hitbox.height >= barrier.hitbox.y
            && hitbox.y <= barrier.hitbox.y + barrier.hitbox.height
    }
}