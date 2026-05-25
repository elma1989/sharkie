import { Canvas } from "../ui/canvas.js";
import { DrawableObject } from "./drawable-object.js";

/** A background to draw. */
export class Background extends DrawableObject {
    #offset;

    /**
     * Creates a background.
     * @param {number} offset - Offset of background
     */
    constructor(offset) {
        const canvas = Canvas.cvs;
        super(Background.calcX(offset), 0, canvas ? canvas.width : 0, canvas ? canvas.height : 0);
        this.#offset = offset;
    }

    get offset() { return this.#offset; }

    /**
     * Calculates x-Pos of background.
     * @param {number} offset - Offset of background.
     * @returns {number} X-Pos for background.
     */
    static calcX(offset) {
        const canvas = Canvas.cvs;
        return canvas ? canvas.width * offset : 0;
    }
}