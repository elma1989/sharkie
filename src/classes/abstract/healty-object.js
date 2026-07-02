import { HEALTH_STATE } from "../types.js";
import { MovableObject } from "./moveable-object.js";

/**
 * @typedef {import('../types.js').Offset} Offset
 * @typedef {import('../types.js').Animation} Animation
 */

/** An animattaed object alive. */
export class HealthyObject extends MovableObject {
    #health = 100;

    /**
     * Creats a healthy object.
     * @param {number} x - X-Pos of object.
     * @param {number} y - Y-Pos of object.
     * @param {number} width - Width of object.
     * @param {number} height - Height of object.
     * @param {Offset} offset - Offeset of object.
     * @param {Object.<string,Animation>} animaitons - Animations of Object.
     */
    constructor(x, y, width, height, offset, animaitons) {
        super(x, y, width, height, offset, animaitons)
    }

    get health() { return this.#health; }

    set health(value) { if (value >= 0 && value <= 100) this.#health = value; }

    // #region Methods
    /** Preperes the process of dead. */
    prepareDeath() {
        this.healthState = HEALTH_STATE.dead;
    }

    /**
     * Injures an healty object.
     * @param {number} damage - Damage of hurt
     */
    injure(damage) {
        this.#health -= damage;
        if (this.health <= 0) this.prepareDeath();
    }

    /**
     * Hits an object.
     * @param {HealthyObject} opponent - Object to hit.
     */
    hit(opponent) {
        opponent.injure(10);
    }
    // #endregion
}