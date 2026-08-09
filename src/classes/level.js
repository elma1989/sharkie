import { GameConfig } from "./game-config.js";
import { HUD } from "./hud.js";
import { World } from "./world.js";

/**
 * @typedef {import('./helper/control.js').Control} Control
 * @typedef {import('./helper/snd-mgr.js').SoundManager} SoundManager
 * @typedef {import('./abstract/drawable-object.js').DrawableObject} DrawableObject
 * @typedef {import('./abstract/collectable.js').Collectable} Collectable
 * @typedef {import('./abstract/enemy.js').Enemy} Enemy
 * @typedef {import('./abstract/bubble.js').Bubble} Bubble
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
    #sndMgr;

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
        this.#sndMgr = sndMgr;
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

    // #region Object-Management
    /**
     * Removes an object.
     * @param {DrawableObject} obj - Object to remove
     */
    #removeObject(obj) {
        const index = this.#drawings.indexOf(obj);
        if (index != -1) this.#drawings.splice(index, 1);
    }

    /**
     * Removes a object after collect.
     * @param {Collectable} col - Collectable object to remove.
     */
    #removeCollectable(col) {
        const collectables = this.#world.collectables;
        const index = collectables.indexOf(col);
        if (index >= 0) {
            collectables.splice(index, 1);
            this.#world.removeUpate(col);
            this.#removeObject(col);
        }
    }

    /**
     * Removes an enemy after dead.
     * @param {Enemy} enemy - Enemy to remove.
     */
    #removeEnemy(enemy) {
        const enemies = this.#world.enemies;
        const index = enemies.indexOf(enemy);
        if (index >= 0) {
            enemies.splice(index, 1);
            this.#world.removeUpate(enemy);
            this.#removeObject(enemy);
        }
    }

    /**
     * Adds a bubble.
     * @param {Bubble} bubble - Bubble for add.
     */
    #addBubble(bubble) {
        const iSharkie = this.#drawings.indexOf(this.#world.sharkie);
        if (iSharkie >= 0) {
            this.#world.bubbles.push(bubble);
            this.#world.addUpdate(bubble);
            this.#drawings.splice(iSharkie + 1, 0, bubble);
            this.#sndMgr.play('attack/bubble');
        }
    }

    /**
     * Removes a bubble.
     * @param {Bubble} bubble - Bubble to remove.
     */
    #remvoeBubble(bubble) {
        const bubbles = this.#world.bubbles;
        const index = bubbles.indexOf(bubble);
        if (index >= 0) {
            bubbles.splice(index, 1);
            this.#world.removeUpate(bubble);
            this.#removeObject(bubble);
            this.#sndMgr.play('hurt/bubble');
        }
    }
    // #endregion

    // #region Collison
    /** Checks collision for collectabels. */
    #checkCollisionCollectable() {
        const sharkie = this.#world.sharkie;
        this.#world.collectables.forEach(col => {
            if (sharkie.isColliding(col)) {
                col.collect(sharkie);
                this.#hud.bars.coin.value = sharkie.coin / 20 * 100;
                this.#hud.bars.poison.value = sharkie.poison / 5 * 100;
                this.#removeCollectable(col);
            }
        });
    }

    /** Checks collisoin Sharkie with enemy. */
    #checkCollisonEnemy() {
        const shark = this.#world.sharkie;
        this.#world.enemies.forEach(enemy => {
            if (shark.isColliding(enemy)) {
                enemy.hit(shark);
                this.#hud.bars.sharkie.value = shark.health;
            }
        });
    }

    /** Checks collision bubble with barrier. */
    #checkCollisionBubbleBarrier() {
        this.#world.barriers.forEach(barrier => {
            this.#world.bubbles.forEach(bubble => {
                if (bubble.isColliding(barrier)) this.#remvoeBubble(bubble);
            });
        });
    }

    /** Checks collison bubble with enemy. */
    #checkCollisionBubbleEnemy() {
        this.#world.enemies.forEach(enemy => {
            this.#world.bubbles.forEach(bubble => {
                if (bubble.isColliding(enemy)) {
                    enemy.blubb(bubble);
                    this.#remvoeBubble(bubble);
                }
            });
        });
    }

    /** Checks all collsions. */
    #checkCollision() {
        this.#checkCollisionCollectable();
        this.#checkCollisonEnemy();
        this.#checkCollisionBubbleBarrier();
        this.#checkCollisionBubbleEnemy();
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
        this.#checkCollision();
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