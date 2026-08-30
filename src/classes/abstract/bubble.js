import { DIRECTION } from "../types.js";
import { MovableObject } from "./moveable-object.js";

/** 
 * Represents a bubble.
 * @extends MovableObject
 */
export class Bubble extends MovableObject {
    /**
     * Horzontally position on strart.
     * @type {number}
     */
    #startX = 0;
    /**
     * Direection to throw of bubble.
     * @type {('WEST' | 'EAST')?}
     */
    #direction = null;
    /**
     * Flag for reached minimal distance of bubble.
     * @type {boolean}
     */
    #bubbleDistanceReached = false;

    constructor() {
        super(0, 0, 96, 96, {
            top: 12,
            right: 12,
            bottom: 12,
            left: 12
        });
    }

    get direction() { return this.#direction; }

    set direction(direction) {
        const validValues = [DIRECTION.EAST, DIRECTION.WEST];
        if (!validValues.includes(direction)) return;
        this.#direction = direction;
    }

    get startX() {return this.#startX; }

    set startX(value) { this.#startX = value; }

    /**
     * Executes update-actions for movement.
     * @param {number} timedelta - Time to next fram in ms.
     */
    updateMovement(timedelta) {
        const speed = (this.#direction == DIRECTION.EAST ? 1 : -1) * 1200;
        this.x += speed * timedelta / 1000;
        if (this.x < -100) this.onBurst?.();
        if (this.x > this.#startX + 200 && !this.#bubbleDistanceReached) {
            this.#bubbleDistanceReached = true;
            this.onDistanceSharkie?.();
        }
    }
}