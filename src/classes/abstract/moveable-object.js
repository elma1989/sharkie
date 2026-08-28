import { AnimatedObject } from "./animatad-object.js";

/**
 * An animated object, which can move.
 * @extends AnimatedObject
 */
export class MovableObject extends AnimatedObject {
    /**
     * State for mirror horizontally
     * @type {boolean}
     */
    #mirorHorizontally = false;

    /**
     * Creates a movable object.
     * @param {number} x - X-Pos of object.
     * @param {number} y - Y-Pos of object.
     * @param {number} width - Width of object.
     * @param {number} height - Height of object.
     * @param {Offset} offset - Offset of object.
     * @param {Object.<string, Animaiton>} animations - Animations of object.
     */
    constructor(x, y, width, height, offset, animations) {
        super(x, y, width, height, offset, animations);
    }

    get mirrorHorzontally() { return this.#mirorHorizontally; }

    set mirrorHorzontally(state) {
        if (typeof state != 'boolean') return;
        if (state == this.mirrorHorzontally) return;
        this.#mirorHorizontally = state;
    }

    /**
     * Draws an object, witch can be mirrored.
     * @param {CanvasRenderingContext2D} ctx - Context of canvas.
     */
    draw(ctx) {
        if (this.mirrorHorzontally) {
            ctx.save();
            ctx.translate(this.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(this.img, -this.x, this.y, this.width, this.height);
            ctx.restore();
        } else super.draw(ctx);
    }

    /**
     * Updates the moving object.
     * @param {number} timedelta - Time to next frame in ms.
     */
    update(timedelta) {
        this.updateMovement(timedelta);
        super.update(timedelta)
    }

    /**
     * Updates movment of an object.
     * Must be overridden by children.
     * @param {number} timedelta - Time to next frame in ms.
     */
    updateMovement(timedelta) {

    }

    /**
     * Calulates movement for an obuject.
     * @param {number} speed - Speed in pixel per second.
     * @param {number} timedelta - Time to next frame.
     * @returns {number} - Movement of object.
     */
    movement(speed, timedelta) {
        return speed * timedelta / 1000;
    }
}