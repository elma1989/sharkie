import { Background } from "./abstract/background.js";
import { DrawableObject } from "./abstract/drawable-object.js";
import { Floor } from "./model/floor.js";
import { Layer0 } from "./model/layer0.js";
import { Layer1 } from "./model/layer1.js";
import { Light } from "./model/light.js";
import { Water } from "./model/water.js";
import { Canvas } from "./ui/canvas.js";

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
            new Water(0), new Water(1), new Water(2), new Water(3),
            new Layer0(0), new Layer0(1), new Layer0(2), new Layer0(3),
            new Layer1(0), new Layer1(1), new Layer1(2), new Layer1(3),
            new Floor(0), new Floor(1), new Floor(2), new Floor(3),
            new Light(1), new Light(2)
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