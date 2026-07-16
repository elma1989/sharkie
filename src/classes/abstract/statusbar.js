import { GameConfig } from "../game-config.js";
import { DrawableObject } from "./drawable-object.js";

/** Shows user state of game. */
export class Statusbar extends DrawableObject {
    #active;
    #value;
    #stats = [];

    /**
     * Creates a statusbar.
     * @param {number} x - X-Pos. of bar.
     * @param {number} y - Y-Pos. of bar.
     * @param {number} value - Start-Value of bar
     * @param {boolean} active - True, shows bar on start (Default: true)
     */
    constructor(x, y, value, active = true) {
        super(x, y, 595, 158);
        this.#active = active;
    }

    get active() { return this.#active; }

    get stats() { return this.#stats; }

    set stats(imgs) {
        this.#stats = imgs;
    }

    get value() { return this.#value; }

    set value(value) {
        if (typeof value == 'number') {
            this.img = this.stats[this.#indexOf(value)];
            this.#value = value;
        }
    }

    /**
     * Gets index from value in stats-array.
     * @param {number} value - Value of bar.
     * @returns {number} Index in stats-array.
     */
    #indexOf(value) {
        if (value <= 0) return 0;
        if (value <= 20) return 1;
        if (value >= 100) return 5;
        return Math.floor(value / 20);
    }

    /** Enables status bar. */
    enable() {
        this.#active = true;
    }
}