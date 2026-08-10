import { LoseScreen } from "./model/screen-lose.js";
import { WinScreen } from "./model/screen-win.js";
import { CoinBar } from "./model/status/coin.js";
import { OrcaHealthBar } from "./model/status/health-orca.js";
import { SharkieHealthBar } from "./model/status/health-sharkie.js";
import { PoisonBar } from "./model/status/poison.js";

export class HUD {
    #bars = {
        sharkie: new SharkieHealthBar(),
        coin: new CoinBar(),
        poison: new PoisonBar(),
        orca: new OrcaHealthBar()
    };
    #screens = {
        win: new WinScreen(),
        lose: new LoseScreen()
    }

    get bars() { return this.#bars; }

    get screens() { return this.#screens; }

    /**
     * Loads the HUD.
     * @returns {Promise<void>[]}
     */
    loadHud() {
        const loadings = [
            ...Object.values(this.bars),
            ...Object.values(this.screens)
        ]
        return loadings.map(loading => loading.load());
    }

    moveBars(xPos) {
        Object.values(this.bars).forEach(bar => bar.x = xPos);
    }
}