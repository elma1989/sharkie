import { Background } from "./abstract/background.js";
import { Barrier } from "./abstract/barrier.js";
import { CollidingObject } from "./abstract/colliding-object.js";
import { DrawableObject } from "./abstract/drawable-object.js";
import { GameConfig } from "./game-config.js";
import { Floor } from "./model/background/floor.js";
import { Layer0 } from "./model/background/layer0.js";
import { Layer1 } from "./model/background/layer1.js";
import { Light } from "./model/background/light.js";
import { Sharkie } from "./model/sharkie.js";
import { Water } from "./model/background/water.js";
import { MovableObject } from "./abstract/moveable-object.js";
import { Canvas } from "./ui/canvas.js";
import { TopBarrier } from "./model/barrier/top.js";
import { FirstBottomBarrier } from "./model/barrier/bottom-1.js";
import { SecondBottomBarrier } from "./model/barrier/bottom-2.js";
import { RightBarrier } from "./model/barrier/right.js";

/** Manges inner cnavas objects. */
export class Level {
    /** @type{CanvasRenderingContext2D} */
    #ctx;
    /** @type{Sharkie} */
    #sharkie;
    /** @type{Background[]} */
    #backgrounds = [];
    /** @type{Barrier[]} */
    #barries = [];
    /** @type{DrawableObject[]} */
    #drawings = [];
    /** @type{MovalbelObject[]} */
    #movables = [];
    #lastTime = 0;
    #translationX = 0;

    constructor(ctx, ctrl) {
        this.#sharkie = new Sharkie(this, ctrl);
        this.#sharkieTranslation();
        this.#backgrounds = this.#createBackgrounds();
        this.#barries = this.#createBarries();
        this.#drawings = this.#createDrawings();
        this.#movables = this.#createMovables();
        this.#ctx = ctx;
    }

    get translationX() {return this.#translationX; }

    set translationX(value) {
        if (value < 0 || value > 5730) return;
        this.#translationX = value;
    }

    /**
     * Creates a list with all backgrounds.
     * @returns {Background[]} All backgrounds.
     */
    #createBackgrounds() {
        return [
            new Water(0), new Water(1), new Water(2), new Water(3),
            new Layer0(0), new Layer0(1), new Layer0(2), new Layer0(3),
            new Layer1(0), new Layer1(1), new Layer1(2), new Layer1(3),
            new Floor(0), new Floor(1), new Floor(2), new Floor(3),
            new Light(1), new Light(2)
        ]
    }

    /**
     * Crateds a list from all barriers.
     * @returns {Barrier[]}
     */
    #createBarries() {
        return [
            new TopBarrier(),
            new FirstBottomBarrier(),
            new SecondBottomBarrier(),
            new RightBarrier()
        ]
    }

    /**
     * Combines all object-lists to a huge list.
     * @returns {DrawableObject[]} All drawings.
     */
    #createDrawings() {
        return [
            ...this.#backgrounds,
            this.#sharkie,
            ...this.#barries
        ]
    }

    /**
     * Creates a list from all movable objects.
     * @returns {MovableObject[]} all movable objects.
     */
    #createMovables() {
        return [
            this.#sharkie
        ]
    }

    /** Calls for all drawings the load()-method. */
    async loadDrawings() {
        await Promise.all(this.#drawings.map(drawing => drawing.load()));
    }

    /** Draws all drawings. */
    #drawAll() {
        this.#ctx.clearRect(0, 0, GameConfig.WIDTH, GameConfig.HEIGHT);
        this.#ctx.translate(-this.#translationX, 0);
        this.#drawings.forEach(drawing => drawing.draw(this.#ctx));
        this.#ctx.translate(this.#translationX, 0);
    }

    /**
     * Executes update-method for all movable objects.
     * @param {number} timedelta - Time to next frame.
     */
    #updateAll(timedelta) {
        this.#movables.forEach(mov => mov.update(timedelta));
    }

    /** Adds tranlation event for shakie. */
    #sharkieTranslation() {
        this.#sharkie.onMoveX = (xPos) => {
            this.translationX = xPos;
        }
    }

    /**
     * Check, if object could move to pos.
     * @param {CollidingObject} obj - Object to check.
     * @param {number} x - Next X-Pos of object.
     * @param {number} y - Next Y-Pos of object.
     * @returns {boolean} - True, object could move to position
     */
    canMoveTo(obj, x, y) {
        return !this.#barries.some(barrier => obj.collidesAt(obj.hitboxAt(x, y), barrier));
    }

    gameLoop = (timestamp) => {
        const timedelta = timestamp - this.#lastTime;
        this.#lastTime = timestamp;

        this.#updateAll(timedelta);
        this.#drawAll();
        requestAnimationFrame(this.gameLoop);
    }
}