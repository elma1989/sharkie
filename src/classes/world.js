import { GameConfig } from './game-config.js';
import { Floor } from './model/background/floor.js';
import { Layer0 } from './model/background/layer0.js';
import { Layer1 } from './model/background/layer1.js';
import { Light } from './model/background/light.js';
import { Water } from './model/background/water.js';
import { FirstBottomBarrier } from './model/barrier/bottom-1.js';
import { SecondBottomBarrier } from './model/barrier/bottom-2.js';
import { RightBarrier } from './model/barrier/right.js';
import { TopBarrier } from './model/barrier/top.js';
import { Coin } from './model/coin.js';
import { DangerousJellyFish } from './model/jellyfish-danger.js';
import { PurpleJellyFish } from './model/jellyfish-purple.js';
import { YellowJellyFish } from './model/jellyfish-yellow.js';
import { Orca } from './model/orca.js';
import { PoisonousJar } from './model/poisonous-jar.js';
import { GreenPufferFish } from './model/pufferfish-green.js';
import { OrangePufferFish } from './model/pufferfish-orange.js';
import { PinkPufferFish } from './model/pufferfish-pink.js';
import { Sharkie } from './model/sharkie.js';

/**
 * @typedef {import('./helper/control.js').Control} Control
 * @typedef {import('./helper/snd-mgr.js').SoundManager} SoundManager
 * @typedef {import('./abstract/background.js').Background} Background
 * @typedef {import('./abstract/barrier.js').Barrier} Barrier
 * @typedef {import('./abstract/collectable.js').Collectable} Collectable
 * @typedef {import('./abstract/enemy.js').Enemy} Enemy
*/

/** All thing in the world. */
export class World {

    #backgrounds;
    #barriers;
    #collectables;
    #enemies;
    #orca = new Orca();
    #sharkie;

    /**
     * Creates the world.
     * @param {Control} ctrl - Control for movement.
     * @param {SoundManager} sndMgr - Soundmanager for control sound.
     */
    constructor(ctrl, sndMgr) {
        this.#backgrounds = this.#createBackgrounds();
        this.#barriers = this.#createBarriers();
        this.#collectables = this.#createCollectables();
        this.#enemies = this.#createEnemies();
        this.#sharkie = new Sharkie(ctrl, sndMgr);

    }

    // #region Methods
    get backgrounds() { return this.#backgrounds; }

    get barriers() { return this.#barriers; }

    get collectables() { return this.#collectables; }

    get enemies() { return this.#enemies; }

    get orca() { return this.#orca; }

    get sharkie() { return this.#sharkie; }

    // #region Object Createion
    /**
     * Creates a list for all backgrounds
     * @returns {Background[]}
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
     * Creates a list of barriers.
     * @returns {Barrier[]}
     */
    #createBarriers() {
        return [
            new TopBarrier(),
            new FirstBottomBarrier(),
            new SecondBottomBarrier(),
            new RightBarrier()
        ]
    }

    /**
     * Creates a list of collectables.
     * @returns {Collectable[]}
     */
    #createCollectables() {
        return [
            new PoisonousJar(1700, 800),
            new PoisonousJar(2500, 600),
            new PoisonousJar(3800, 800),
            new PoisonousJar(5300, 400),
            new PoisonousJar(6000, 100),
            new Coin(1300, 200),
            new Coin(1500, 200),
            new Coin(1700, 200),
            new Coin(2000, 400),
            new Coin(2200, 600),
            new Coin(2400, 400),
            new Coin(2600, 600),
            new Coin(3800, 200),
            new Coin(4000, 200),
            new Coin(4200, 200),
            new Coin(5000, 200),
            new Coin(5200, 200),
            new Coin(5200, 400),
            new Coin(5600, 200),
            new Coin(5600, 400),
            new Coin(5600, 600),
            new Coin(5800, 200),
            new Coin(5800, 400),
            new Coin(5800, 600),
            new Coin(5800, 800)
        ]
    }

    /**
     * Creates a list of enemies.
     * @returns {Enemy[]}
     */
    #createEnemies() {
        return [
            new GreenPufferFish(300, 100, 100, 1600),
            new OrangePufferFish(600, 300, 100, 1600),
            new PinkPufferFish(GameConfig.WIDTH + 300, 300, GameConfig.WIDTH + 100, 2 * GameConfig.WIDTH - 100),
            new PurpleJellyFish(2 * GameConfig.WIDTH, 200, 100, GameConfig.HEIGHT - 100),
            new YellowJellyFish(3 * GameConfig.WIDTH - 500, 200, 100, 700),
            new DangerousJellyFish()
        ]
    }
    // #endregion

    /**
     * Loads the world.
     * @returns {Promise<void>[]}
     */
    loadWorld() {
        const loadings = [
            ...this.backgrounds,
            ...this.barriers,
            ...this.collectables,
            ...this.enemies,
            this.orca,
            this.sharkie
        ];
        return loadings.map(loading => loading.load());
    }
    // #endregion
}