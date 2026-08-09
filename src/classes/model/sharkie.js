import { ImgHelper } from '../helper/img-helper.js';
import { DIRECTION, HEALTH_STATE } from '../types.js';
import { SHAKIE } from '../helper/animation.js';
import { NormalBubble } from './normal-bubble.js';
import { PoisonousBubble } from './poison-bubble.js';
import { HealthyObject } from '../abstract/healty-object.js';
import { GameConfig } from '../game-config.js';
import { Control } from '../helper/control.js';
import { SoundManager } from '../helper/snd-mgr.js';
import { Barrier } from '../abstract/barrier.js';

/**
 * @typedef {import('../types.js').Direction} Direction
 */

export class Sharkie extends HealthyObject {

    /** @type{Level} */
    #ctrl;
    #sndMgr;
    #longIdleTimer = 0;
    #poisonousJars = 0;
    #coins = 0;
    #barriers;
    #bubble = null;
    #canThrowBubble = true;
    #isBubbleThrown = false;
    #calledOrca = false;

    /**
     * Creeates sharkie
     * @param {Control} ctrl - Control for movement.
     * @param {SoundManager} sndMgr - Soundmanager for control sound.
     * @param {Barrier[]} barriers - Barriers to limit the movement.
     */
    constructor(ctrl, sndMgr, barriers) {
        super(0, 0, 815, 1000, {
            top: 600,
            right: 250,
            bottom: 300,
            left: 250
        }, SHAKIE);
        this.#ctrl = ctrl;
        this.#sndMgr = sndMgr;
        this.#barriers = barriers;
    }

    // #region Methods
    // #region Overridden methods
    get x() { return super.x; }

    set x(value) {
        const newX = this.x + value;
        const oldX = this.x;
        if (newX < -280) return;
        super.x = value;
    }

    get y() { return super.y; }

    set y(value) {
        const newY = this.y + value;
        if (newY < -920 || newY > 655) return;
        super.y = value;
    }

    get coin() { return this.#coins; }

    get poison() { return this.#poisonousJars; }
    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.sharkie.idle[0]));
        this.animations.idle.frames = await this.loadImages(ImgHelper.urls(ImgHelper.sharkie.idle));
        this.animations.longIdle.frames = await this.loadImages(ImgHelper.urls(ImgHelper.sharkie.longIdle));
        this.animations.swim.frames = await this.loadImages(ImgHelper.urls(ImgHelper.sharkie.swim));
        this.animations['hurt/poison'].frames = await this.loadImages(ImgHelper.urls(ImgHelper.sharkie['hurt/poison']));
        this.animations['hurt/electric'].frames = await this.loadImages(ImgHelper.urls(ImgHelper.sharkie['hurt/electric']));
        this.animations['dead/poison'].frames = await this.loadImages(ImgHelper.urls(ImgHelper.sharkie['dead/poison']));
        this.animations['dead/electric'].frames = await this.loadImages(ImgHelper.urls(ImgHelper.sharkie['dead/electric']));
        this.animations['attack/slap'].frames = await this.loadImages(ImgHelper.urls(ImgHelper.sharkie['attack/slap']));
        this.animations['attack/bubble/normal'].frames = await this.loadImages(ImgHelper.urls(ImgHelper.sharkie['attack/bubble/normal']));
        this.animations['attack/bubble/poison'].frames = await this.loadImages(ImgHelper.urls(ImgHelper.sharkie['attack/bubble/poison']));
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

    #isAttackBubble() {return this.healthState == HEALTH_STATE['attack/bubble/normal'] || this.healthState == HEALTH_STATE['attack/bubble/poison']}

    isAttackSlap() { return this.healthState == HEALTH_STATE['attack/slap']; }

    /**
     * Checks if it is attack.
     * @returns {boolean} True if it is attack.
     */
    #isAttack() { return this.isAttackSlap() || this.#isAttackBubble()};

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
    /**
     * Checkes, if Sharkie can move to position.
     * @param {number} x - X-Pos to check.
     * @param {number} y - y-Pos to check.
     * @returns {boolean}
     */
    #canMoveTo(x, y) {
        return !this.#barriers.some(barrier => barrier.collidesAt(this.hitboxAt(x, y), barrier));
    }

    /**
     * Moves to next positon.
     * @param {number} inputX - Horizintally input.
     * @param {number} inputY - Vertically input.
     * @param {number} timedelta - Time to next frame.
     */
    #moveToNewPositon(inputX, inputY, timedelta) {
        const speed = 800;
        const newX = this.x + inputX * speed * timedelta / 1000;
        const newY = this.y + inputY * speed * timedelta / 1000;
        if (this.#canMoveTo(newX, newY)) {
            this.x = newX;
            this.y = newY;
        }
    }

    updateMovement(timedelta) {
        if (this.#isDead()) return;
        const inputs = this.#controlImput();
        this.#checkAttack();
        if (inputs.moving) {
            this.mirrorHorzontally = inputs.moveX < 0;
            if (this.#isIdle()) this.healthState = HEALTH_STATE.swim;
            this.#moveToNewPositon(inputs.moveX, inputs.moveY, timedelta);
        } else if (this.healthState == HEALTH_STATE.swim) this.healthState = HEALTH_STATE.idle;
    }

    updateState(timedelta) {
        super.updateState(timedelta);
        if (this.#isAttack() && this.curImg == 8) {
            this.healthState = HEALTH_STATE.idle;
        }
        if (this.#isInjured() && !this.invulnerable) this.healthState = HEALTH_STATE.idle;
        if (this.healthState != HEALTH_STATE.idle && this.healthState != HEALTH_STATE.longIdle) this.#longIdleTimer = 0;
        if (this.healthState == HEALTH_STATE.idle) this.#longIdleTimer += timedelta;
        if (this.healthState == HEALTH_STATE.idle && this.#longIdleTimer >= 5000) this.healthState = HEALTH_STATE.longIdle;
    }

    animationLoop() {
        this.playAnimation(this.healthState);
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
        this.#sndMgr.play('collect/poison')
        if (this.#poisonousJars == 5) this.#sndMgr.play('skill');
    }

    /** Adds a coin. */
    addCoin() {
        this.#coins++;
        this.#sndMgr.play('collect/coin');
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
    /** Plays sound for slap. */
    playSlap (enemy) {
        if (enemy.healthState != HEALTH_STATE.dead) this.#sndMgr.play('attack/slap');
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
     * Injures Sharkie by poisonous or electric attacks.
     * @param {'poison' | 'electric'} attactType Type for injure.
     * @param {number} damage - Value of damage in percent of health
     * @returns
     */
    injureBy(attactType, damage) {
        let health = this.health;
        this.injure(damage);
        if (health == this.health) return;
        this.#sndMgr.play(`hurt/${attactType}`);
        this.healthState = this.health > 0 ? HEALTH_STATE[`hurt/${attactType}`] : HEALTH_STATE[`dead/${attactType}`];
    }
    // #endregion
}