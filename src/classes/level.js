import { Background } from "./abstract/background.js";
import { DrawableObject } from "./abstract/drawable-object.js";
import { Water } from "./model/water.js";

/** Manges inner cnavas objects. */
export class Level {
    #drawings = [];
    #backgrounds = [];

    constructor() {
        this.#backgrounds = this.#createBackgrounds();
        this.#drawings = this.#createDrawings();
    }

    /**
     * Creates a list with all backgrounds.
     * @returns {Background[]} All backgrounds.
     */
    #createBackgrounds() {
        return [
            new Water(0), new Water(1), new Water(2), new Water(3) 
        ]
    }

    /**
     * Combines all object-lists to a huge list.
     * @returns {DrawableObject[]} All drawings.
     */
    #createDrawings() {
        return [
            ...this.#backgrounds
        ]
    }

    /** Calls for all drawings the load()-method. */
    async loadDrawings() {
        Promise.all(this.#drawings.map(drawing => drawing.load()));
    }

    /** Draws all drawings. */
    drawAll() {
        this.#drawings.forEach(drawing => drawing.draw());
        const self = this;
        requestAnimationFrame(() => self.drawAll());
    }
}