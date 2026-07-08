import { ImgHelper } from '../helper/img-helper.js';
import { DIRECTION, HEALTH_STATE } from '../types.js';
import { SHAKIE } from '../helper/animation.js';
import { NormalBubble } from './normal-bubble.js';
import { PoisonousBubble } from './poison-bubble.js';
import { HealthyObject } from '../abstract/healty-object.js';

/**
 * @typedef {import('../types.js').Direction} Direction
 */

export class Sharkie extends HealthyObject {

    /** @type{Level} */
    #level;
    #ctrl;
    #longIdleTimer = 0;
    #poisonousJars = 0;
    #coins = 0;
    #bubble = null;
    #canThrowBubble = true;
    #isBubbleThrown = false;

    constructor(level, ctrl) {
        super(0, 0, 815, 1000, {
            top: 600,
            right: 250,
            bottom: 300,
            left: 250
        }, SHAKIE);
        this.#level = level;
        this.#ctrl = ctrl;
    }

    // #region Methods
    // #region Overridden methods
    get x() { return super.x; }

    set x(value) {
        const newX = this.x + value;
        if (newX < -280 || newX > 13300) return;
        super.x = value;
        this.onMoveX?.(this.x);
    }

    get y() { return super.y; }

    set y(value) {
        const newY = this.y + value;
        if (newY < -920 || newY > 655) return;
        super.y = value;
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.sharkie.idle[0]));
        this.animations.idle.frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.sharkie.idle));
        this.animations.longIdle.frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.sharkie.longIdle));
        this.animations.swim.frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.sharkie.swim));
        this.animations['hurt/poison'].frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.sharkie['hurt/poison']));
        this.animations['hurt/electric'].frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.sharkie['hurt/electric']));
        this.animations['dead/poison'].frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.sharkie['dead/poison']));
        this.animations['dead/electric'].frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.sharkie['dead/electric']));
        this.animations['attack/slap'].frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.sharkie['attack/slap']));
        this.animations['attack/bubble/normal'].frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.sharkie['attack/bubble/normal']));
        this.animations['attack/bubble/poison'].frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.sharkie['attack/bubble/poison']));
    }

    /**
     * Checks, if sharkie is dead
     * @returns {boolean} True, if it is dead.
     */
    #isDead() { return this.healthState == HEALTH_STATE['dead/poison'] || this.healthState == HEALTH_STATE['dead/electric']; }

    /**
     * Checks if it is idle.
     * @returns {boolean} True if it is idle.
     */
    #isIdle() { return this.healthState == HEALTH_STATE.idle || this.healthState == HEALTH_STATE.longIdle; }

    /**
     * Checkes if it is injured.
     * @returns {boolean} True if it is injured.
     */
    #isInjured() {return this.healthState == HEALTH_STATE['hurt/poison'] || this.healthState == HEALTH_STATE['hurt/electric']; }

    /**
     * Checks if it is attack.
     * @returns {boolean} True if it is attack.
     */
    #isAttack() { return this.healthState == HEALTH_STATE['attack/slap'] || this.healthState == HEALTH_STATE['attack/bubble/normal'] || this.healthState == HEALTH_STATE['attack/bubble/poison']}

    /**
     * Gets control-data.
     * @returns {{moveX:number,moveY:number, moving:boolean}} Data from control.
     */
    #controlImput() {
        let moveX = 0;
        let moveY = 0;

        if (this.#ctrl.ctrl.left) moveX = -1;
        if (this.#ctrl.ctrl.right) moveX = 1;
        if (this.#ctrl.ctrl.up) moveY = -1;
        if (this.#ctrl.ctrl.down) moveY = 1;

        const length = Math.hypot(moveX, moveY);
        if (length > 0) {
            moveX /= length;
            moveY /= length;
        }

        return {moveX, moveY, moving: length > 0}
    }

    /** Checks Attack-Controls */
    #checkAttack() {
        if (this.#ctrl.ctrl.attackSlap) this.#attackSlap();
        if (this.#ctrl.ctrl.attackBubble) this.#attackBubble();
    }

    updateMovement(timedelta) {
        const speed = 800;
        if (this.#isDead()) return;
        const inputs = this.#controlImput();
        this.#checkAttack();
        if (inputs.moving) {
            this.mirrorHorzontally = inputs.moveX < 0;
            if (this.#isIdle()) this.healthState = HEALTH_STATE.swim;
        } else if (this.healthState == HEALTH_STATE.swim) this.healthState = HEALTH_STATE.idle;

        const nextX = this.x + inputs.moveX * speed * timedelta / 1000;
        const nextY = this.y + inputs.moveY * speed * timedelta / 1000;

        if (this.#level.canMoveTo(this, nextX, nextY)) {
            this.x = nextX;
            this.y = nextY;
        }
    }

    updateState(timedelta) {
        super.updateState(timedelta);
        if (this.#isAttack() && this.curImg == 8) {
            this.healthState = HEALTH_STATE.idle;
            if (this.#bubble) {
                this.#setBubblePos();
                this.onBubbleAttack?.(this.#bubble);
            }
            this.#bubble = null;
        }
        if (this.#isInjured() && !this.invulnerable) this.healthState = HEALTH_STATE.idle;
        if (this.healthState != HEALTH_STATE.idle && this.healthState != HEALTH_STATE.longIdle) this.#longIdleTimer = 0;
        if (this.healthState == HEALTH_STATE.idle) this.#longIdleTimer += timedelta;
        if (this.healthState == HEALTH_STATE.idle && this.#longIdleTimer >= 5000) this.healthState = HEALTH_STATE.longIdle;
    }

    updateAnimation(timedelta) {
        this.animationTimer += timedelta;
        const duration = this.durationFrame;
        if (this.animationTimer >= duration) {
            this.playAnimation(this.healthState);
            this.animationTimer -= duration;
        }
    }

    resetAnimation() {
        if (this.healthState == HEALTH_STATE.longIdle && this.curImg >= 13) this.curImg = 10;
        else super.resetAnimation();
    }
    // #endregion

    // #region Collect
    /** Adds a poisonous jar. */
    addPoisonousJar() {
        this.#poisonousJars++;
    }

    /** Adds a coin. */
    addCoin() {
        this.#coins++;
    }
    // #endregion

    // #region Bubble-Mangement
    /** Sets position of bubble. */
    #setBubblePos() {
        const x = this.#bubble.direction == DIRECTION.EAST ? this.hitbox.x + this.hitbox.width + 50 : this.hitbox.x - 150;
        this.#bubble.x = x;
        this.#bubble.startX = x;
        this.#bubble.y = this.hitbox.y + this.hitbox.height - 100;
    }

    /**
     * Loads a bubble
     * @param {Bubble} bubble - Bubble to load.
     */
    async #loadBubble(bubble) {
        await bubble.load();
        this.#bubble = bubble;
        this.#canThrowBubble = true;
    }

    /**
     * Adds events for a bubbe
     * @param {Bubble} bubble - Bubble for add events
     */
    #addBubbleEvents(bubble) {
        bubble.onBurst = () => {
            this.#isBubbleThrown = false;
        }
        bubble.onDistanceSharkie = () => {
            this.#isBubbleThrown = false;
        }
    }

    /** Enables bubblesshot again. */
    enableBubbleShot() {
        this.#isBubbleThrown = false;
    }
    // #endregion

    // #region Attack
    /** Executes an attack for slap. */
    #attackSlap() {
        if (this.healthState == HEALTH_STATE['dead/electric'] || this.healthState == HEALTH_STATE['dead/poison']) return;
        if (this.healthState != HEALTH_STATE['attack/slap']) this.healthState = HEALTH_STATE['attack/slap'];
    }

    /** Executes an attack for bubble-shot. */
    #attackBubble() {
        if (this.#isDead() || this.#isAttack()) return
        if (!this.#canThrowBubble || this.#isBubbleThrown) return;
        this.#canThrowBubble = false;
        this.#isBubbleThrown = true;
        const direction = this.mirrorHorzontally ? DIRECTION.WEST : DIRECTION.EAST;
        let bubble;
        if (this.#poisonousJars == 5) {
            this.healthState = HEALTH_STATE['attack/bubble/poison'];
            bubble = new PoisonousBubble(direction);
        } else {
            this.healthState = HEALTH_STATE['attack/bubble/normal'];
            bubble = new NormalBubble(direction);
        }
        this.#addBubbleEvents(bubble);
        this.#loadBubble(bubble);
    }
    // #endregion
    prepareDeath(attackType) {
        this.healthState = `dead/${attackType}`;
    }

    /**
     * Injures sharkie.
     * @param {number} damage - Damage from collision
     * @param {string} attackType - Attacktype poison or electric
     */
    injure(damage, attackType) {
        const health = this.health;
        super.injure(damage);
        if (this.health <= 0) this.prepareDeath(attackType);
        else if (this.health < health) this.healthState = `hurt/${attackType}`;
    }
    // #endregion
}