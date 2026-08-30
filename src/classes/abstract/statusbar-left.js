import { GameConfig } from "../game-config.js";
import { Statusbar } from "./statusbar.js";

/** 
 * A statusbar on the left of canvas.
 * @extends Statusbar
 */
export class LeftStatusbar extends Statusbar {
    /**
     * Creates a left status bar.
     * @param {number} y Y-Pos of bar.
     * @param {number} value - Value of bar.
     */
    constructor(y, value) {
        super(0, y, value);
    }

    get x() { return super.x; }

    set x(value) { super.x = value < 0 ? 0 : (value > 3 * GameConfig.WIDTH ? 3 * GameConfig.WIDTH : value) }
}