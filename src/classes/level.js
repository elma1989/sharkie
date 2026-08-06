import { GameConfig } from "./game-config.js";
import { HUD } from "./hud.js";
import { World } from "./world.js";

/**
 * @typedef {import('./helper/control.js').Control} Control
 * @typedef {import('./helper/snd-mgr.js').SoundManager} SoundManager
 * @typedef {import('./abstract/drawable-object.js').DrawableObject} DrawableObject
 */

/** Manges inner cnavas objects. */
export class Level {
    #world;
    #hud = new HUD();
    #drawings;
    #ctx;
    #running = false;
    #lastTime = 0;
    #frameId = 0;

    /**
     * Creates the level.
     * @param {Control} ctrl - Control for movement.
     * @param {SoundManager} sndMgr - Soundmanager for control sounds.
     * @param {CanvasRenderingContext2D} ctx - Canvas-Context.
     */
    constructor(ctrl, sndMgr, ctx) {
        this.#world = new World(ctrl, sndMgr);
        this.#drawings = this.#createDrawings();
        this.#ctx = ctx;
    }

    // #region Methods
    // #region Obejct-Mangement
    /** Loads the level. */
    async loadLevel() {
        const loadings = [
            ...this.#world.loadWorld(),
            ...this.#hud.loadHud()
        ]
        await Promise.all(loadings);
    }

    /**
     * Creates a list for all Drawings.
     * @returns {DrawableObject[]}
     */
    #createDrawings() {
        return [
            ...this.#world.backgrounds,
            ...this.#world.collectables,
            ...this.#world.enemies,
            this.#world.sharkie,
            ...this.#world.barriers,
            ...Object.values(this.#hud.bars).slice(0, 3)
        ]
    }
    // #endregion

    // #region Game-Loop
    /** Draws all objects. */
    #drawAll() {
        this.#ctx.clearRect(0, 0, GameConfig.WIDTH, GameConfig.HEIGHT);
        this.#drawings.forEach(drawing => drawing.draw(this.#ctx));
    }

    /** Procedure to repeat in loop. */
    #gameLoop = (timestamp) => {
        if (!this.#running) return;
        const timedelta = Math.min(100, timestamp - this.#lastTime);
        this.#lastTime = timestamp;

        this.#world.updateAll(timedelta);
        this.#drawAll();
        this.#frameId = requestAnimationFrame(this.#gameLoop);
    }

    /** Starts game loop. */
    start() {
        this.#running = true;
        this.#lastTime = performance.now();
        this.#frameId = requestAnimationFrame(this.#gameLoop);
    }

    /** Stops gaame loop. */
    #stop() {
        this.#running = false;
        cancelAnimationFrame(this.#frameId);
    }
    // #endregion
    // #endregion
}