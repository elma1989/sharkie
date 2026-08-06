import { HUD } from "./hud.js";
import { World } from "./world.js";

/**
 * @typedef {import('./helper/control.js').Control} Control
 * @typedef {import('./helper/snd-mgr.js').SoundManager} SoundManager
 */

/** Manges inner cnavas objects. */
export class Level {
    #world;
    #hud = new HUD();

    /**
     * Creates the level.
     * @param {Control} ctrl - Control for movement.
     * @param {SoundManager} sndMgr - Soundmanager for control sounds.
     */
    constructor(ctrl, sndMgr) {
        this.#world = new World(ctrl, sndMgr);
    }

    /** Loads the level. */
    async loadLevel() {
        const loadings = [
            ...this.#world.loadWorld(),
            ...this.#hud.loadHud()
        ]
        await Promise.all(loadings);
    }
}