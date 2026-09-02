import { GameConfig } from "../game-config.js";
import { DrawableObject } from "./drawable-object.js";

/** 
 * A background to draw.
 * @extends DrawableObject
 */
export class Background extends DrawableObject {
    #offset;

    /**
     * Creates a background.
     * @param {number} offset - Offset of background
     */
    constructor(offset) {
        super(Background.calcX(offset), 0, GameConfig.WIDTH,  GameConfig.HEIGHT);
        this.#offset = offset;
    }

    get offset() { return this.#offset; }

    /**
     * Calculates x-Pos of background.
     * @param {number} offset - Offset of background.
     * @returns {number} X-Pos for background.
     */
    static calcX(offset) {
        return offset * GameConfig.WIDTH - offset;
    }
}