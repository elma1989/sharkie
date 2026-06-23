import { HEALTH_STATE } from "../types.js";
import { CollidingObject } from "./colliding-object.js";

/**
 * @typedef {import('../types.js') Offset} Offset
 * @typedef {import('../types.js') Animation} Animation
 * @typedef {import('../types.js') HealthState} HealthState
 */


/** Represents an movabele object, which has animation. */
export class AnimatedObject extends CollidingObject {

    /** @type {Object.<string, Animation>} */
    #animations;
    #currentImg = 0;
    #currentAnimation = null;
    animationTimer = 0;
    /** @type {HealthState} */
    #healthState = HEALTH_STATE.idle
    /**
     * Crates an animated object.
     * @param {number} x - X-Pos of object.
     * @param {number} y - Y-Pos of object.
     * @param {number} width - Width of object.
     * @param {number} height - Height of object.
     * @param {Offset} offset - Offset of object.
     * @param {Ojbect.<string, Animation>} animations - Animations of object.
     */
    constructor(x, y, width, height, offset, animations) {
        super(x, y, width, height, offset);
        this.#animations = animations;
    }

    // #region Methods
    get animations() {return this.#animations};

    get durationFrame() {
        if (!this.#currentAnimation) return 0;
        return this.#animations[this.#currentAnimation].duration / this.#animations[this.#currentAnimation].frames.length
    }

    get curImg() { return this.#currentImg; }

    set curImg(value) {
        if (!this.#currentAnimation) return;
        if (value < 0 || value > this.#animations[this.#currentAnimation].length) return;
        this.#currentImg = value;
    }

    get healthState() { return this.#healthState; }

    set healthState(value) {
        const validValues = ['idle', 'longIdle', 'swim', 'hurt/poison', 'hurt/electric', 'dead/poison', 'dead/electric', 'attack/slap', 'attack/bubble/normal', 'attack/bubble/poison'];
        if (validValues.includes(value) && this.healthState != value) this.#healthState = value;
    }

    // #region Animaiton
    /**
     * Gets a list of images from urls
     * @param {string[]} urls - Urls for animation.
     * @returns {Promise<HTMLImageElement[]>}
     */
    async loadAnimations(urls) {
        return await Promise.all(urls.map(url => this.loadImage(url)));
    }

    /** Changes to next image. */
    #changeImage() {
        if (!this.#currentAnimation) return;
        if (this.#currentImg >= this.#animations[this.#currentAnimation].frames.length) return;
        this.img = this.#animations[this.#currentAnimation].frames[this.curImg++];
    }

    /** Resets an animation. */
    resetAnimation() {
        if (this.curImg >= this.#animations[this.#currentAnimation].frames.length && this.#animations[this.#currentAnimation].loop) this.curImg = 0;
    }

    /**
     * Plays a single animation
     * @param {string} name - Name of animation.
     */
    playAnimation(name) {
        if (!(name in this.#animations)) return;
        if (this.#currentAnimation != name) {
            this.curImg = 0;
            this.#currentAnimation = name;
        }
        this.#changeImage();
        this.resetAnimation();
    }
    // #endregion

    // #region Update
    /**
     * Update the state.
     * @param {number} timedelta - Time to next frame.
     */
    updateState(timedelta) {}

    /**
     * Updates the animation.
     * @param {number} timedelta - Time to next frame.
     */
    updateAnimation(timedelta) {}

    /**
     * Updates an object.
     * @param {number} timedelta - Time to next frame.
     */
    update(timedelta) {
        this.updateState(timedelta);
        this.updateAnimation(timedelta);
    }
    // #endregion
    // #endregion
}