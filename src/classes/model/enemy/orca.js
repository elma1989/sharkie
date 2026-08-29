import { Bubble } from "../../abstract/bubble.js";
import { Enemy } from "../../abstract/enemy.js";
import { GameConfig } from "../../game-config.js";
import { ORCA } from "../../helper/animation.js";
import { ImgHelper } from "../../helper/img-helper.js";
import { SoundManager } from "../../helper/snd-mgr.js";
import { DIRECTION, HEALTH_STATE } from "../../types.js";
import { PoisonousBubble } from "../poison-bubble.js";
import { Sharkie } from "../sharkie.js";

/**
 * It's the endboss of the game.
 * @extends Enemy
 */
export class Orca extends Enemy {
    /**
     * A timer for execte the attack procedure.
     * @type {number}
     */
    #attackTimer = 0;
    /**
     * Instance of SondManager for play Orca's sounds.
     * @type {SoundManager}
     */
    #sndMgr

    /**
     * Creates Oraca.
     * @param {SoundManager} sndMgr - Sound-Manger for control of sound.
     */
    constructor(sndMgr) {
        super(GameConfig.WIDTH * 3 + 450, 0, 1041, 1216, {
            top: 600,
            right: 250,
            bottom: 270,
            left: 100
        }, ORCA, DIRECTION.WEST, {
            minX: GameConfig.WIDTH * 3,
            maxX: GameConfig.WIDTH * 4 - 450,
            minY: 0,
            maxY: GameConfig.HEIGHT
        });
        this.#sndMgr = sndMgr;
    }

    get healthState() { return super.healthState; }

    set healthState(value) {
        super.healthState = value;
        if (value == HEALTH_STATE.attack) this.#sndMgr.play('attack/orca');
    }

    /**
     * Loads images for Orca.
     * @override
     */
    async load() {
        const [spawn, swim, attack, hurt, dead] = await Promise.all([
            this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["orca/spawn"])),
            this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["orca/swim"])),
            this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["orca/attack"])),
            this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["orca/hurt"])),
            this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["orca/dead"]))
        ]);
        this.animations.spawn.frames = spawn;
        this.animations.swim.frames = swim;
        this.animations.attack.frames = attack;
        this.animations.hurt.frames = hurt;
        this.animations.dead.frames = dead;
        this.img = spawn[0];
    }

    /** Action, which will be executed once Sharkie calls Orca. */
    approach() {
        this.healthState = HEALTH_STATE.spawn;
        this.#sndMgr.play('approach');
    }

    /**
     * Updates healthState for Orca.
     * @override
     * @param {number} timedelta - Time to next frame in ms.
     */
    updateState(timedelta) {
        super.updateState(timedelta);
        this.#attackTimer += timedelta;
        if (this.#attackTimer >= 5000 && this.healthState == HEALTH_STATE.swim) this.healthState = HEALTH_STATE.attack;
    }

    /**
     * Updates the movement for Orca.
     * @override
     * @param {number} timedelta - Time to next frame in ms.
     */
    updateMovement(timedelta) {
        let movement = this.movement(400, timedelta);
        if (this.healthState == HEALTH_STATE.attack) {
            this.x -= 2 * movement;
            this.y -= movement;
        } else {
            movement /= 4;
            if (this.x + 2 * movement <= GameConfig.WIDTH * 3 + 450) {
                this.x += 2 * movement;
                this.y += movement;
            }
        }
    }

    // #region Animation
    /** Manages the attack procedure. */
    handleAtttack() {
        this.playAnimation('attack');
        if (this.curImg == 6) {
            this.#attackTimer = 0;
            this.healthState = HEALTH_STATE.swim;
        }
    }

    /** Manages the hurt procedure. */
    handleHurt() {
        this.playAnimation('hurt');
        if (this.curImg == 4) {
            this.healthState = HEALTH_STATE.swim;
        }
    }

    /** Swisches any animations depends on healthState. */
    chooseAnimation() {
        switch(this.healthState) {
            case HEALTH_STATE.spawn:
                this.playAnimation('spawn');
                if (this.curImg == 10) this.healthState = HEALTH_STATE.swim;
                break;
            case HEALTH_STATE.swim:
                this.playAnimation('swim');
                break;
            case HEALTH_STATE.attack:
                this.handleAtttack();
                break;
            case HEALTH_STATE.hurt:
                this.handleHurt();
                break;
            case HEALTH_STATE.dead:
                this.playAnimation('dead');
        }
    }

    /**
     * Executes animations in a loop for Orca.
     * @override
     */
    animationLoop() {
        this.chooseAnimation();
        if (this.deathState() && this.curImg == this.lengthAnimation) this.onDead?.();
    }
    // #endregion
    /**
     * Injures Orca.
     * @override
     * @param {number} damage - Value of injury in percent of helth.
     */
    injure(damage) {
        const health = this.health;
        super.injure(damage);
        if (this.health < health) {
            this.#attackTimer = 0;
            this.#sndMgr.play('hurt/orca');
            this.onInjure?.(this.health);
        }
        if (this.health >= 0) this.healthState = HEALTH_STATE.hurt;
        else this.prepareDeath();
    }

    /**
     * Prepares death of Orca.
     * @override
     */
    prepareDeath() {
        this.healthState = HEALTH_STATE.dead;
    }

    /**
     * Action on Orca hits Sharkie.
     * @overide
     * @param {Sharkie} sharkie - Instance of main-character.
     */
    hit(sharkie) {
        sharkie.injureBy('poison', 20);
    }

    /**
     * Action for collision bubble with Orca.
     * @override
     * @param {Bubble} bubble - Bubble of collision.
     */
    blubb(bubble) {
        if (bubble instanceof PoisonousBubble) this.injure(20);
    }
}