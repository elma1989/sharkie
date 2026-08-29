import { LoseScreen } from "./model/screen-lose.js";
import { WinScreen } from "./model/screen-win.js";
import { CoinBar } from "./model/status/coin.js";
import { OrcaHealthBar } from "./model/status/health-orca.js";
import { SharkieHealthBar } from "./model/status/health-sharkie.js";
import { PoisonBar } from "./model/status/poison.js";

/**
 * @typedef {Object} BarCollection
 * @property {SharkieHealthBar} sharkie - Bar for Sharkie's health.
 * @property {OrcaHealthBar} orca - Bar for Orca's health.
 * @property {CoinBar} coin - Bar for collected coins.
 * @property {PoisonBar} poison - Bar for collected poisonous jars.
 */

/**
 * @typedef {Object} ScreenCollection
 * @property {WinScreen} win - Screen for show on win.
 * @property {LoseScreen} lose - Screen for show on lose.
 */

/** Mangege all startus bars and screens. */
export class HUD {
    /**
     * Collection for any status bars.
     * @type {BarCollection}
     */
    #bars = {
        sharkie: new SharkieHealthBar(),
        coin: new CoinBar(),
        poison: new PoisonBar(),
        orca: new OrcaHealthBar()
    };
    /**
     * Collection for screens.
     * @type {ScreenCollection}
     */
    #screens = {
        win: new WinScreen(),
        lose: new LoseScreen()
    }

    get bars() { return this.#bars; }

    get screens() { return this.#screens; }

    /**
     * Loads the HUD.
     * @returns {Array<Promise<void>>}
     */
    loadHud() {
        const loadings = [
            ...Object.values(this.bars),
            ...Object.values(this.screens)
        ]
        return loadings.map(loading => loading.load());
    }

    /**
     * Moves statusbars dependent of camera positon.
     * @param {number} xPos - New x-pos of status bars.
     */
    moveBars(xPos) {
        Object.values(this.bars).forEach(bar => bar.x = xPos);
    }
}