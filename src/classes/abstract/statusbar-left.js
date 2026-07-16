import { GameConfig } from "../game-config.js";
import { Statusbar } from "./statusbar.js";

/** A statusbar on the left of canvas */
export class LeftStatusbar extends Statusbar {
    constructor(y, value) {
        super(0, y, value);
    }

    get x() { return super.x; }

    set x(value) { super.x = value < 0 ? 0 : (value > 3 * GameConfig.WIDTH ? 3 * GameConfig.WIDTH : value) }
}