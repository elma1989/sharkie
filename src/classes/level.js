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
import { Canvas } from "./ui/canvas.js";
import { TopBarrier } from "./model/barrier/top.js";
import { FirstBottomBarrier } from "./model/barrier/bottom-1.js";
import { SecondBottomBarrier } from "./model/barrier/bottom-2.js";
import { RightBarrier } from "./model/barrier/right.js";
import { PoisonousJar } from "./model/poisonous-jar.js";
import { AnimatedObject } from "./abstract/animatad-object.js";
import { Collectable } from "./abstract/collectable.js";
import { Coin } from "./model/coin.js";
import { Bubble } from "./abstract/bubble.js";
import { Enemy } from "./abstract/enemy.js";
import { Orca } from "./model/orca.js";
import { GreenPufferFish } from "./model/pufferfish-green.js";
import { OrangePufferFish } from "./model/pufferfish-orange.js";
import { PinkPufferFish } from "./model/pufferfish-pink.js";
import { PurpleJellyFish } from "./model/jellyfish-purple.js";
import { YellowJellyFish } from "./model/jellyfish-yellow.js";
import { Screen } from "./abstract/screen.js";
import { WinScreen } from "./model/screen-win.js";

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
    /** @type{Enemy[]} */
    #enemies = [];
    /** @type{Orca} */
    #orca;
    /** @type{Collectable[]} */
    #collectables = [];
    /** @type{Bubble[]} */
    #bubbles = [];
    /** @type{Screen[]} */
    #screens = [];
    /** @type{DrawableObject[]} */
    #loadings = []
    /** @type{DrawableObject[]} */
    #drawings = [];
    /** @type{AnimatedObject[]} */
    #updateables = [];
    #lastTime = 0;
    #translationX = 0;
    #frameid = null;
    #gameEnd = false;

    constructor(ctx, ctrl) {
        this.#sharkie = new Sharkie(this, ctrl);
        this.#sharkieTranslation();
        this.#backgrounds = this.#createBackgrounds();
        this.#barries = this.#createBarries();
        this.#collectables = this.#createCollectables();
        this.#enemies = this.#createEnemies();
        this.#screens = this.#createScreens();
        this.#orca = new Orca();
        this.#drawings = this.#createDrawings();
        this.#updateables = this.#createUpdatingObjects();
        this.#loadings = this.#createLoadings();
        this.#ctx = ctx;
        this.#addEvents();
    }

    // #region Methods
    get translationX() {return this.#translationX; }

    set translationX(value) {
        if (value < 0 || value > 5730) return;
        this.#translationX = value;
    }

    // #region Create Objects
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

    #createEnemies() {
        return [
            new GreenPufferFish(300, 100, 100, 1600),
            new OrangePufferFish(600, 300, 100, 1600),
            new PinkPufferFish(GameConfig.WIDTH + 300, 300, GameConfig.WIDTH + 100, 2 * GameConfig.WIDTH - 100),
            new PurpleJellyFish(2 * GameConfig.WIDTH, 200, 100, GameConfig.HEIGHT - 100),
            new YellowJellyFish(3 * GameConfig.WIDTH - 500, 100, 100, 700)
        ]
    }

    /**
     * Creates a list from all collectables.
     * @returns {Collectable[]} All collectables.
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
     * Combines all object-lists to a huge list.
     * @returns {DrawableObject[]} All drawings.
     */
    #createDrawings() {
        return [
            ...this.#backgrounds,
            ...this.#enemies,
            this.#orca,
            ...this.#collectables,
            ...this.#bubbles,
            this.#sharkie,
            ...this.#barries
        ]
    }

    /**
     * Creates a list from all movable objects.
     * @returns {AnimatedObject[]} all movable objects.
     */
    #createUpdatingObjects() {
        return [
            ...this.#collectables,
            ...this.#enemies,
            this.#orca,
            this.#sharkie,
            ...this.#bubbles
        ]
    }

    /**
     * Creates a list from all screens.
     * @returns {Screen[]} All screens.
     */
    #createScreens() {
        return [
            new WinScreen()
        ]
    }

    /**
     * Creates a list with all things to load.
     * @returns {DrawableObject[]} All things to load.
     */
    #createLoadings() {
        return [
            ...this.#drawings,
            ...this.#screens
        ]
    }

    // #endregion

    // #region Draw
    /** Calls for all drawings the load()-method. */
    async loadDrawings() {
        await Promise.all(this.#loadings.map(loading => loading.load()));
    }

    /** Draws all drawings. */
    #drawAll() {
        this.#ctx.clearRect(0, 0, GameConfig.WIDTH, GameConfig.HEIGHT);
        this.#ctx.translate(-this.#translationX, 0);
        this.#drawings.forEach(drawing => drawing.draw(this.#ctx));
        this.#ctx.translate(this.#translationX, 0);
    }
    // #endregion

    // #region Update
    /**
     * Executes update-method for all movable objects.
     * @param {number} timedelta - Time to next frame.
     */
    #updateAll(timedelta) {
        if (!this.#gameEnd) this.#updateables.forEach(updateObj => updateObj.update(timedelta));
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
    // #endregion

    // #region Collision
    #checkCollisionCollectable() {
        this.#collectables.forEach(collectable => {
            if (this.#sharkie.isColliding(collectable)) {
                collectable.collect(this.#sharkie);
            }
        })
    }

    #checkBubbleBarrierCollision() {
        if (this.#bubbles.length == 0) return;
        this.#bubbles.forEach(bubble => {
            this.#barries.forEach(barrier => {
                if(bubble.isColliding(barrier)) this.#removeBubble(bubble);
            });
        });
    }

    #checkBubbleEnemyCollision() {
        if (this.#bubbles.length == 0) return;
        this.#bubbles.forEach(bubble => {
            this.#enemies.forEach(enemy => {
                if(bubble.isColliding(enemy)) {
                    enemy.blubb(bubble);
                    this.#removeBubble(bubble);
                }
            });
            if(bubble.isColliding(this.#orca)) {
                this.#orca.blubb(bubble);
                this.#removeBubble(bubble);
            }
        });
    }

    #checkEnemyCollision() {
        this.#enemies.forEach(enemy => {
            if (this.#sharkie.isColliding(enemy)) enemy.hit(this.#sharkie);
        })
        if (this.#sharkie.isColliding(this.#orca)) this.#sharkie.injure(20, 'poison');
    }

    #checkBubbleCollision() {
        this.#checkBubbleBarrierCollision();
        this.#checkBubbleEnemyCollision();
    }

    #checkCollision() {
        this.#checkCollisionCollectable();
        this.#checkEnemyCollision();
        this.#checkBubbleCollision();
    }
    // #endregion

    gameLoop = (timestamp) => {
        const timedelta = Math.min(timestamp - this.#lastTime, 100);
        this.#lastTime = timestamp;

        this.#updateAll(timedelta);
        this.#checkCollision();
        this.#drawAll();
        this.#frameid = requestAnimationFrame(this.gameLoop);
    }

    /**
     * Removes a collectable.
     * @param {Collectable} collectable - Collectable to remove.
     */
    #removeCollectable(collectable) {
        const indexCollect = this.#collectables.indexOf(collectable);
        const indexUpdate = this.#updateables.indexOf(collectable);
        const indexDraw = this.#drawings.indexOf(collectable);
        if (indexCollect >= 0) {
            this.#collectables.splice(indexCollect, 1);
            this.#updateables.splice(indexUpdate, 1);
            this.#drawings.splice(indexDraw, 1);
        }
    }

    // #region Object Management
    /**
     * Adds bubble to level.
     * @param {Bubble} bubble - Bubble to add.
     */
    #addBubble(bubble) {
        this.#bubbles.push(bubble);
        this.#updateables = this.#createUpdatingObjects();
        this.#drawings = this.#createDrawings();
    }

    /**
     * Removes a bubble.
     * @param {Bubble} bubble - Bubble to remove.
     */
    #removeBubble(bubble) {
        const iBubble = this.#bubbles.indexOf(bubble);
        const iUpdate = this.#updateables.indexOf(bubble);
        const iDraw = this.#drawings.indexOf(bubble);
        if (iBubble >= 0) {
            this.#bubbles.splice(iBubble, 1);
            this.#updateables.splice(iUpdate, 1);
            this.#drawings.splice(iDraw, 1);
        }
        if (this.#bubbles.length == 0) this.#sharkie.enableBubbleShot();
    }

    /** Brings all enemies to life. */
    bringEnemiesToLife() {
        this.#enemies.forEach(enemy => enemy.bringToLife());
    }

    /**
     * Removes an enemy.
     * @param {Enemy} remEnemy - Enemy to remove.
     */
    #removeEnemy(remEnemy) {
        const iEnemy = this.#enemies.indexOf(remEnemy);
        const iUpdate = this.#updateables.indexOf(remEnemy);
        const iDraw = this.#drawings.indexOf(remEnemy);
        if (iEnemy >= 0) {
            this.#enemies.splice(iEnemy, 1);
            this.#updateables.splice(iUpdate, 1);
            this.#drawings.splice(iDraw, 1);
        }
    }
    // #endregion

    // #region Events
    /** Add event for focus on the game. */
    #addFocusEvent() {
        window.addEventListener('focus', () => {
            if(!this.#frameid) {
                this.#frameid = requestAnimationFrame(this.gameLoop);
            }
        })
    }

    /** Adds an event for leave game-tab. */
    #addBlurEvent() {
        window.addEventListener('blur', () => {
            if(this.#frameid) {
                cancelAnimationFrame(this.#frameid);
                this.#frameid = null;
            }
        })
    }

    /** Adds events for all collectables. */
    #addAllCollectEvents() {
        this.#collectables.forEach(collectable => {
            collectable.onCollect = () => {
                this.#removeCollectable(collectable);
            }
        })
    }

    /** Adds event for emit of bubble. */
    #addBubbleEvent() {
        this.#sharkie.onBubbleAttack = (bubble => {
            bubble.onBurst = () => this.#removeBubble(bubble);
            this.#addBubble(bubble);
        });
    }

    #addEnemyDeadEvent() {
        this.#enemies.forEach(enemy => {
            enemy.onDead = () => this.#removeEnemy(enemy);
        });
        this.#orca.onDead = () => this.#win();
    }

    #addCallOrcaEvent() {
        this.#sharkie.onCallOrca = () => this.#orca.bringToLife();
    }

    /** Adds all events. */
    #addEvents() {
        this.#addFocusEvent();
        this.#addBlurEvent();
        this.#addAllCollectEvents();
        this.#addBubbleEvent();
        this.#addEnemyDeadEvent();
        this.#addCallOrcaEvent();
    }
    // #endregion

    // #region Endgame
    /** Will be executed on finish of game. */
    #finish() {
        this.#gameEnd = true;
    }

    /** Will be executed, if sharkie wins. */
    #win() {
        this.#screens[0].setMiddle(this.translationX);
        this.#drawings.push(this.#screens[0]);
        this.#finish();
    }
    // #endregion
    // #endregion
}