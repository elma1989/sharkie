import { ImgHelper } from '../helper/img-helper.js';
import { HEALTH_STATE } from '../types.js';
import { SHAKIE } from '../helper/animation.js';
import { MovableObject } from '../abstract/moveable-object.js';

export class Sharkie extends MovableObject {

    /** @type{Level} */
    #level;
    #ctrl;
    #longIdleTimer = 0;
    #poisonousJars = 0;
    #coins = 0;

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

    updateMovement(timedelta) {
        const speed = 800;
        let moveX = 0;
        let moveY = 0;

        if (this.#ctrl.ctrl.left) moveX = -1;
        if (this.#ctrl.ctrl.right) moveX = 1;
        if (this.#ctrl.ctrl.up) moveY = -1;
        if (this.#ctrl.ctrl.down) moveY = 1;

        if (moveX < 0) this.mirrorHorzontally = true;
        else if (moveX > 0) this.mirrorHorzontally = false;

        const length = Math.hypot(moveX, moveY);
        if (length > 0) {
            moveX /= length;
            moveY /= length;
            if (this.healthState == HEALTH_STATE.idle || this.healthState == HEALTH_STATE.longIdle) this.healthState = HEALTH_STATE.swim;
        } else if (this.healthState != HEALTH_STATE.longIdle && this.healthState != HEALTH_STATE.idle) {
            this.healthState = HEALTH_STATE.idle;
        }

        const nextX = this.x + moveX * speed * timedelta / 1000;
        const nextY = this.y + moveY * speed * timedelta / 1000;
        if (this.#level.canMoveTo(this, nextX, nextY)) {
            this.x = nextX;
            this.y = nextY;
        }
    }

    updateState(timedelta) {
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

    /** Adds a poisonous jar. */
    addPoisonousJar() {
        this.#poisonousJars++;
    }

    /** Adds a coin. */
    addCoin() {
        this.#coins++;
    }
    // #endregion
}