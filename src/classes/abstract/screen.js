import { GameConfig } from "../game-config.js";
import { DrawableObject } from "./drawable-object.js";

/** A view the show to the user. */
export class Screen extends DrawableObject {
    /**
     * Creates a screen.
     * @param {number} width - Width of object.
     * @param {number} height - Height of object.
     */
    constructor(width, height) {
        super(0, 0, width, height);
    }

    /**
     * Sets object the middle of canvas.
     * @param {number} xScreen - X-Pos of screen.
     */
    setMiddle(xScreen) {
        this.x = xScreen >= 0 ? (2 * xScreen + GameConfig.WIDTH) / 2 - this.width / 2 : GameConfig.WIDTH / 2 - this.width / 2;
        this.y = GameConfig.HEIGHT / 2 - this.height / 2;
    }
}