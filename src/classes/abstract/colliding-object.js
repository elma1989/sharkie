import { DrawableObject } from './drawable-object.js'

/** @typedef {import(../types.js).Offset} Offset */

/**
 * Represents an object, which has collision.
 */
export class CollidingObject extends DrawableObject {
    /** @type {Offset} */
    offset;
    #rX;
    #rY;
    #rWidth;
    #rHeight;
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
        this.offset = offset;
        this.#rX = x + offset.left;
        this.#rY = y + offset.top;
        this.#rWidth = width - offset.left - offset.right;
        this.#rHeight = height - offset.top - offset.bottom;
    }

    get rX() { return this.#rX; }

    get rY() { return this.#rY; }

    get rWidth() { return this.#rWidth; }

    get rHeight() { return this.#rHeight; }

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
            this.rX, this.rY, this.rWidth, this.rHeight
        );
    }

    /**
     * Checks, if this object collides with other object.
     * @param {CollidingObject} other - Object, for which collision to check.
     * @returns {boolean} true, if object a colliding.
     */
    isColliding(other) {
        return this.rX + this.rWidth >= other.rX
            && this.rX <= other.rX + other.rWidth
            && this.rY + this.rHeight >= other.rY
            && this.rY <= other.rY + other.rHeight;
    }
}