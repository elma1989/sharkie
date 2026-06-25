import { ImgHelper } from '../helper/img-helper.js';
import { DIRECTION, HEALTH_STATE } from '../types.js';
import { SHAKIE } from '../helper/animation.js';
import { MovableObject } from '../abstract/moveable-object.js';
import { NormalBubble } from './normal-bubble.js';
import { PoisonousBubble } from './poison-bubble.js';

/**
 * @typedef {import('../types.js').Direction} Direction
 */

export class Sharkie extends MovableObject {

    /** @type{Level} */
    #level;
    #ctrl;
    #longIdleTimer = 0;
    #poisonousJars = 0;
    #coins = 0;
    #bubble = null;
    #canThrowBubble = true;

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
     * Load a bubble
     * @param {Bubble} bubble - Bubble to looad
     */
    async #loadBubble(bubble) {
        await bubble.load();
        this.#bubble = bubble;
        this.#canThrowBubble = true;
    }

    updateMovement(timedelta) {
        const speed = 800;
        let moveX = 0;
        let moveY = 0;

        if (this.#ctrl.ctrl.left) moveX = -1;
        if (this.#ctrl.ctrl.right) moveX = 1;
        if (this.#ctrl.ctrl.up) moveY = -1;
        if (this.#ctrl.ctrl.down) moveY = 1;

        if (this.#ctrl.ctrl.attackSlap) this.#attackSlap();
        if (this.#ctrl.ctrl.attackBubble) this.#attackBubble();

        if (moveX < 0) this.mirrorHorzontally = true;
        else if (moveX > 0) this.mirrorHorzontally = false;

        const length = Math.hypot(moveX, moveY);
        if (length > 0) {
            moveX /= length;
            moveY /= length;
            if (this.healthState == HEALTH_STATE.idle || this.healthState == HEALTH_STATE.longIdle) this.healthState = HEALTH_STATE.swim;
        } else if (this.healthState == HEALTH_STATE.swim) this.healthState = HEALTH_STATE.idle;

        const nextX = this.x + moveX * speed * timedelta / 1000;
        const nextY = this.y + moveY * speed * timedelta / 1000;
        if (this.#level.canMoveTo(this, nextX, nextY)) {
            this.x = nextX;
            this.y = nextY;
        }
    }

    updateState(timedelta) {
        if ((this.healthState == HEALTH_STATE['attack/slap'] || this.healthState == HEALTH_STATE['attack/bubble/normal'] || this.healthState == HEALTH_STATE['attack/bubble/poison'])
            && this.curImg == 8) {
            this.healthState = HEALTH_STATE.idle;
            this.onBubbleAttack?.(this.#bubble);
            this.bubble = null;
        }
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
    #calcBubblePos(direction) {
        return {
            x: direction == DIRECTION.EAST ? this.hitbox.x + this.hitbox.width + 50 : this.hitbox.x - 150,
            y: this.hitbox.y + this.hitbox.height - 100
        }
    }

    /** Executes an attack for slap. */
    #attackSlap() {
        if (this.healthState == HEALTH_STATE['dead/electric'] || this.healthState == HEALTH_STATE['dead/poison']) return;
        if (this.healthState != HEALTH_STATE['attack/slap']) this.healthState = HEALTH_STATE['attack/slap'];
    }

    /** Executes an attack for bubble-shot. */
    #attackBubble() {
        if (this.healthState == HEALTH_STATE['dead/electric'] || this.healthState == HEALTH_STATE['dead/poison']
            || this.healthState == HEALTH_STATE['attack/bubble/normal'] || this.healthState == HEALTH_STATE['attack/bubble/poiseon']
        ) return;
        if (!this.#canThrowBubble) return;
        this.#canThrowBubble = false;
        const direction = this.mirrorHorzontally ? DIRECTION.WEST : DIRECTION.EAST;
        const pos = this.#calcBubblePos(direction);
        let bubble;
        if (this.#poisonousJars == 5) {
            this.healthState = HEALTH_STATE['attack/bubble/poison'];
            bubble = new PoisonousBubble(pos.x, pos.y, direction);
        } else {
            this.healthState = HEALTH_STATE['attack/bubble/normal'];
            bubble = new NormalBubble(pos.x, pos.y, direction);
        }
        this.#loadBubble(bubble);
    }
    // #endregion
}