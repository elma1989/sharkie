import { DrawableObject } from "./drawable-object.js";

/**
 * Shows user state of game.
 * @estends DrawableObject
 */
export class Statusbar extends DrawableObject {
    /**
     * Value of statusbar in percent.
     * @type {number}
     */
    #value;
    /**
     * Saves the images of statusbar.
     * @type {Image[]}
     */
    #stats = [];

    /**
     * Creates a statusbar.
     * @param {number} x - X-Pos. of bar.
     * @param {number} y - Y-Pos. of bar.
     * @param {number} value - Start-Value of bar
     */
    constructor(x, y, value) {
        super(x, y, 595, 158);
        this.#value = value;
    }

    get stats() { return this.#stats; }

    set stats(imgs) {
        this.#stats = imgs;
    }

    get value() { return this.#value; }

    set value(value) {
        if (typeof value == 'number') {
            this.img = this.stats[this.indexOf(value)];
            this.#value = value;
        }
    }

    /**
     * Gets index from value in stats-array.
     * @param {number} value - Value of bar.
     * @returns {number} Index in stats-array.
     */
    indexOf(value) {
        if (value <= 0) return 0;
        if (value <= 20) return 1;
        if (value >= 100) return 5;
        return Math.floor(value / 20);
    }
}