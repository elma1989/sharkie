import { Sharkie } from "../model/sharkie.js";
import { HEALTH_STATE } from "../types.js";
import { MovableObject } from "./moveable-object.js";

/**
 * @typedef {import('../types.js').Offset} Offset
 * @typedef {import('../types.js').Animation} Animation
 */

/** An animattaed object alive. */
export class HealthyObject extends MovableObject {
    #health = 100;
    #invulnerable = false;
    #invulnerableTimer = 0;

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

    get invulnerable() { return this.#invulnerable; }

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
        if (this.deathState() || this.#invulnerable) return;
        this.#invulnerable = true;
        this.#invulnerableTimer = 0;
        this.#health -= damage;
        if (!(this instanceof Sharkie) && this.health <= 0) this.prepareDeath();
    }

    /**
     * Hits an object.
     * @param {HealthyObject} opponent - Object to hit.
     */
    hit(opponent) {
        opponent.injure(10);
    }

    updateState(timedelta) {
        this.#invulnerableTimer += timedelta;
        if (this.#invulnerableTimer >= 700) this.#invulnerable = false;
    }
    // #endregion
}