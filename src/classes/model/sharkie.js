import { ImgHelper } from '../helper/img-helper.js';
import { DIRECTION, HEALTH_STATE } from '../types.js';
import { SHAKIE } from '../helper/animation.js';
import { NormalBubble } from './normal-bubble.js';
import { PoisonousBubble } from './poison-bubble.js';
import { HealthyObject } from '../abstract/healty-object.js';
import { Control } from '../helper/control.js';
import { SoundManager } from '../helper/snd-mgr.js';
import { Barrier } from '../abstract/barrier.js';

/**
 * It's the main character.
 * @extends HealthyObject
 */
export class Sharkie extends HealthyObject {

    /**
     * User inputs for movment.
     * @type {Control}
     */
    #ctrl;
    /**
     * Sound-maanger for Sharkie's sounds.
     * @type {SoundManager}
     */
    #sndMgr;
    /**
     * Timer in ms to trigger the long idle state.
     * Time since normal idle.
     * @type {number}
     */
    #longIdleTimer = 0;
    /**
     * Number of allready collected poisonous jars.
     * @type {number}
     */
    #poisonousJars = 0;
    /**
     * Number of allready collected coins.
     * @type {number}
     */
    #coins = 0;
    /**
     * Bariers to check collison before swim.
     * @type {Barrier[]}
     */
    #barriers;
    /**
     * Bubble, which is just prepared.
     * @type {Bubble?}
     */
    #bubble = null;
    /** 
     * Flag for just thrown bubble.
     * @type {boolean}
     */
    #isBubbleThrown = false;
    /**
     * Flag for already called endboss once finsh of level has been reached.
     * @type {boolean}
     */
    #calledOrca = false;

    /**
     * Creeates sharkie
     * @param {Control} ctrl - Control for movement.
     * @param {SoundManager} sndMgr - Soundmanager for control sound.
     * @param {Barrier[]} barriers - Barriers to limit the movement.
     */
    constructor(ctrl, sndMgr, barriers) {
        super(0, 0, 815, 1000, {
            top: 520,
            right: 160,
            bottom: 250,
            left: 180
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
        this.onMoveX?.(value);
        if(!this.#calledOrca && value >= 4900) {
            this.#calledOrca = true;
            this.onCallOrca?.();
        }
    }

    get y() { return super.y; }

    set y(value) {
        const newY = this.y + value;
        if (newY < -920 || newY > 655) return;
        super.y = value;
    }

    get coin() { return this.#coins; }

    get poison() { return this.#poisonousJars; }

    get healthState() { return super.healthState; }

    set healthState(value) {
        const bubbleAttack = value == HEALTH_STATE['attack/bubble/normal'] || value == HEALTH_STATE['attack/bubble/poison'];
        if (this.isAttackBubble() && !bubbleAttack) this.#resetBubble();
        if (value == HEALTH_STATE.longIdle && this.healthState != HEALTH_STATE.longIdle
            || value != HEALTH_STATE.longIdle && this.healthState == HEALTH_STATE.longIdle
        ) this.changeOffset();
        super.healthState = value;
    }

    /**
     * Gets all animations for Sharkie.
     * @returns {string[][]} All animations.
     */
    urls() {
        return [
            ImgHelper.urls(ImgHelper.SHARKIE.idle),
            ImgHelper.urls(ImgHelper.SHARKIE.longIdle),
            ImgHelper.urls(ImgHelper.SHARKIE.swim),
            ImgHelper.urls(ImgHelper.SHARKIE['hurt/poison']),
            ImgHelper.urls(ImgHelper.SHARKIE['hurt/electric']),
            ImgHelper.urls(ImgHelper.SHARKIE['dead/poison']),
            ImgHelper.urls(ImgHelper.SHARKIE['dead/electric']),
            ImgHelper.urls(ImgHelper.SHARKIE['attack/slap']),
            ImgHelper.urls(ImgHelper.SHARKIE['attack/bubble/normal']),
            ImgHelper.urls(ImgHelper.SHARKIE['attack/bubble/poison'])
        ]
    }

    /**
     * Loads animations for Sharkie.
     * @overload
     */
    async load() {
        const urls = this.urls();
        const animations = Object.values(this.animations);
        const images = await Promise.all(urls.map(url => this.loadImages(url)));
        animations.forEach((animation, i) => animation.frames = images[i]);
        this.img = this.animations.idle.frames[0];
    }

    /**
     * Checks, if sharkie is dead
     * @returns {boolean} True, if it is dead.
     */
    isDead() { return this.healthState == HEALTH_STATE['dead/poison'] || this.healthState == HEALTH_STATE['dead/electric']; }

    /**
     * Checks if it is idle.
     * @returns {boolean} True if it is idle.
     */
    isIdle() { return this.healthState == HEALTH_STATE.idle || this.healthState == HEALTH_STATE.longIdle; }

    /**
     * Checkes if it is injured.
     * @returns {boolean} True if it is injured.
     */
    isInjured() {return this.healthState == HEALTH_STATE['hurt/poison'] || this.healthState == HEALTH_STATE['hurt/electric']; }

    /**
     * Checks, if Sharkie uses bubble-attack
     * @returns {boolean} True, if Sharkie uses bubble-attack.
     */
    isAttackBubble() {return this.healthState == HEALTH_STATE['attack/bubble/normal'] || this.healthState == HEALTH_STATE['attack/bubble/poison']}

    /**
     * Checks, if Sharkie uses slap-attack.
     * @returns {boolean} True, if Sharkie uses slap-attack.
     */
    isAttackSlap() { return this.healthState == HEALTH_STATE['attack/slap']; }

    /**
     * Checks if it is attack.
     * @returns {boolean} True if it is attack.
     */
    isAttack() { return this.isAttackSlap() || this.isAttackBubble()};

    /** Changes offet for long idle and leave long idle. */
    changeOffset() {
        this.offset = this.healthState == HEALTH_STATE.longIdle ? {
            top: 520,
            right: 160,
            bottom: 250,
            left: 180
        } : {
            top: 600,
            right: 160,
            bottom: 140,
            left: 180
        }
    }

    /**
     * Gets control-data.
     * @returns {{moveX:number,moveY:number, moving:boolean}} Data from control.
     */
    controlImput() {
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

    /**
     * Checkes, if Sharkie can move to position.
     * @param {number} x - X-Pos to check.
     * @param {number} y - y-Pos to check.
     * @returns {boolean}
     */
    canMoveTo(x, y) {
        return !this.#barriers.some(barrier => barrier.collidesAt(this.hitboxAt(x, y), barrier));
    }

    /**
     * Moves to next positon.
     * @param {number} inputX - Horizintally input.
     * @param {number} inputY - Vertically input.
     * @param {number} timedelta - Time to next frame.
     */
    moveToNewPositon(inputX, inputY, timedelta) {
        const speed = 800;
        const newX = this.x + inputX * speed * timedelta / 1000;
        const newY = this.y + inputY * speed * timedelta / 1000;
        if (this.canMoveTo(newX, newY)) {
            this.x = newX;
            this.y = newY;
        }
    }

    /**
     * Updates the movement for Sharkie.
     * @param {number} timedelta - Time to next frame.
     * @override 
     */
    updateMovement(timedelta) {
        if (this.isDead()) return;
        const inputs = this.controlImput();
        this.checkAttack();
        if (inputs.moving) {
            this.mirrorHorzontally = inputs.moveX < 0;
            if (this.isIdle()) this.healthState = HEALTH_STATE.swim;
            this.moveToNewPositon(inputs.moveX, inputs.moveY, timedelta);
        } else if (this.healthState == HEALTH_STATE.swim) this.healthState = HEALTH_STATE.idle;
    }

    /**
     * Updates the health state for Sharkie.
     * @param {number} timedelta - Time to next fame.
     * @override
     */
    updateState(timedelta) {
        super.updateState(timedelta);
        if (this.isAttack() && this.curImg == 8) {
            this.healthState = HEALTH_STATE.idle;
        }
        if (this.isInjured() && !this.invulnerable) this.healthState = HEALTH_STATE.idle;
        if (this.healthState != HEALTH_STATE.idle && this.healthState != HEALTH_STATE.longIdle) this.#longIdleTimer = 0;
        if (this.healthState == HEALTH_STATE.idle) this.#longIdleTimer += timedelta;
        if (this.healthState == HEALTH_STATE.idle && this.#longIdleTimer >= 5000) this.healthState = HEALTH_STATE.longIdle;
    }

    /**
     * Updates the anmation for Sharkie in a loop
     * @override
     */
    animationLoop() {
        this.playAnimation(this.healthState);
        if (this.isAttackBubble() && this.#bubble && this.curImg == 8 && !this.#isBubbleThrown) this.#shotBubble();
        if (this.healthState == HEALTH_STATE['dead/poison'] && this.curImg == 12 || this.healthState == HEALTH_STATE['dead/electric'] && this.curImg == 10)
            this.onDead?.();
    }

    /**
     * Resets the animation for Sharkie.
     * @override
     */
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

    // #region Attack
    /** Checks, if uese any attack. */
    checkAttack() {
        if (this.#ctrl.ctrl.attackSlap) this.attackSlap();
        if (this.#ctrl.ctrl.attackBubble) this.attackBubble();
    }

    /** Executes an attack for slap. */
    attackSlap() {
        if (this.healthState == HEALTH_STATE['dead/electric'] || this.healthState == HEALTH_STATE['dead/poison']) return;
        if (this.healthState != HEALTH_STATE['attack/slap']) this.healthState = HEALTH_STATE['attack/slap'];
    }

    /** Plays sound for slap. */
    playSlap (enemy) {
        if (enemy.healthState != HEALTH_STATE.dead) this.#sndMgr.play('attack/slap');
    }
    // #endregion

    // #region Bubble
    /** Preperes a bubble for shot. */
    async attackBubble() {
        const bubble = this.poison < 5 ? new NormalBubble() : new PoisonousBubble();
        this.healthState = this.poison < 5 ? HEALTH_STATE['attack/bubble/normal'] : HEALTH_STATE['attack/bubble/poison'];
        await bubble.load();
        this.#bubble = bubble;
    }

    /** Sets the bubble data */
    #setBubble() {
        if (!this.#bubble) return;
        const direction = this.mirrorHorzontally ? DIRECTION.WEST : DIRECTION.EAST;
        const x = this.mirrorHorzontally ? this.hitbox.x : this.hitbox.x + this.hitbox.width;
        this.#bubble.startX = x;
        this.#bubble.x = x;
        this.#bubble.y = (this.hitbox.y + this.hitbox.y + this.hitbox.height) / 2 - 50;
        this.#bubble.direction = direction;
    }

    /** Shots a bubble. */
    #shotBubble() {
        this.#isBubbleThrown = true;
        this.#setBubble();
        this.onShotBubble?.(this.#bubble);
    }

    /** Resets the shot state. */
    #resetBubble() {
        this.#bubble = null;
        this.#isBubbleThrown = false;
    }
    // #endregion

    /**
     * Injures Sharkie by poisonous or electric attacks.
     * @param {'poison' | 'electric'} attactType Type for injure.
     * @param {number} damage - Value of damage in percent of health
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