import { Background } from "./abstract/background.js";
import { Barrier } from "./abstract/barrier.js";
import { DrawableObject } from "./abstract/drawable-object.js";
import { GameConfig } from "./game-config.js";
import { Floor } from "./model/background/floor.js";
import { Layer0 } from "./model/background/layer0.js";
import { Layer1 } from "./model/background/layer1.js";
import { Light } from "./model/background/light.js";
import { Sharkie } from "./model/sharkie.js";
import { Water } from "./model/background/water.js";
import { Canvas } from "./ui/canvas.js";
import { TopBarrier } from "./model/barrier/top.js";
import { FirstBottomBarrier } from "./model/barrier/bottom-1.js";
import { SecondBottomBarrier } from "./model/barrier/bottom-2.js";
import { RightBarrier } from "./model/barrier/right.js";

/** Manges inner cnavas objects. */
export class Level {
    #ctx;
    /** @type{Sharkie} */
    #sharkie;
    #drawings = [];
    #backgrounds = [];
    /** @type{Barrier[]} */
    #barries = [];

    constructor(ctx) {
        this.#sharkie = new Sharkie();
        this.#backgrounds = this.#createBackgrounds();
        this.#barries = this.#createBarries();
        this.#drawings = this.#createDrawings();
        this.#ctx = ctx;
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

    /** Calls for all drawings the load()-method. */
    async loadDrawings() {
        await Promise.all(this.#drawings.map(drawing => drawing.load()));
    }

    /** Draws all drawings. */
    drawAll() {
        this.#ctx.clearRect(0, 0, GameConfig.WIDTH, GameConfig.HEIGHT);
        this.#drawings.forEach(drawing => drawing.draw(this.#ctx));
        requestAnimationFrame(() => this.drawAll());    
    }
}