import { Barrier } from "../abstract/barrier.js";
import { CollidingObject } from "../abstract/colliding-object.js";
import { GameConfig } from "../game-config.js";
import { ImgHelper } from "../helper/img-helper.js";

/** @typedef {import('../types.js').Offset} Offset */

/** Represents top-bottom-barrier. */
export class TopButtomBarrier extends Barrier {

    /** @type {Offset} */
    #topBarrier;

    /** @type {Offset} */
    #bottomBarrier;

    constructor() {
        super(GameConfig.WIDTH + 100, 0, 1682, GameConfig.HEIGHT, {
            top: 420,
            right: 0,
            bottom: 270,
            left: 0
        });
    }

    async load() {
        try {
            this.img = await this.loadImage(ImgHelper.url(ImgHelper.background.barrier.topButton));
        } catch(e) {
            console.error(e);
        }
    }

    // #region Drawing
    /**
     * Draws the top frame.
     * @param {CanvasRenderingContext2D} ctx - Context of canvas.
     */
    #drawTopFrame(ctx) {
        ctx.strokeRect(this.rX, 0, this.rWidth, this.rY);
    }

    /**
     * Draws the bottom frame.
     * @param {CanvasRenderingContext2D} ctx Context of cnavas
     */
    #drawBottomFrame(ctx) {
        ctx.strokeRect(this.rX, this.rY + this.rHeight, this.rWidth, GameConfig.HEIGHT - this.rY - this.rHeight);
    }

    drawOffsetFrame(ctx) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        this.#drawTopFrame(ctx);
        this.#drawBottomFrame(ctx);
    }
    // #endregion

    // #region Colliding
    /**
     * Check collision top barrier.
     * @param {CollidingObject} other - Object to check.
     * @returns {boolean} true, if has collision.
     */
    #collidingTop(other) {
        return other.rX + other.rWidth >= this.rX
            && other.rX <= this.rX + this.rWidth
            && other.rY <= this.rY
    }

    /**
     * Checks collision bottom barrier.
     * @param {CollidingObject} other - Object to check.
     * @returns {boolean} true, if has collision
     */
    #collidingBottom(other) {
        return other.rX + other.rWidth >= this.rX
            && other.rX <= this.rX + this.rWidth
            && other.rY + other.rHeight >= this.rY + this.rHeight
    }

    isColliding(other) {
        return this.#collidingTop(other) || this.#collidingBottom(other);
    }
    // #endregion
}