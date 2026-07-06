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

    bringToLife() {
        this.healthState = HEALTH_STATE.swim;
    }

    changeDirection() {}

    updateMovement() {
        if (this.x <= this.#limits.minX
            || this.x >= this.#limits.maxX
            || this.y <= this.#limits.minY
            || this.y >= this.#limits.maxY) this.changeDirection();
    }

    /**
     * Will be executed on collision width bubble and enemy.
     * @param {Bubble} bubble - Bubble from collision.
     */
    blubb(bubble) {}
}