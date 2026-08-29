import { Statusbar } from "../../abstract/statusbar.js";
import { GameConfig } from "../../game-config.js";
import { ImgHelper } from "../../helper/img-helper.js";

/**
 * A statusbar for Orca's health.
 * @extends Statusbar
 */
export class OrcaHealthBar extends Statusbar {
    constructor() {
        super(GameConfig.WIDTH - 595, 0, 100, false);
    }

    /**
     * Load Images for Orca's health bar.
     * @override
     */
    async load() {
        this.stats = await this.loadImages(ImgHelper.urls(ImgHelper.STATUS["health/orca"]));
        this.img = this.stats[5]
    }

    get x() { return super.x; }

    set x(value) {
        super.x = value < 0
            ? GameConfig.WIDTH - this.width + 5
            : (value > 3 * GameConfig.WIDTH ? 4 * GameConfig.WIDTH - this.width - 5 : value + GameConfig.WIDTH - this.width);
    }
}