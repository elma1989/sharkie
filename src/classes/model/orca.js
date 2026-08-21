import { Enemy } from "../abstract/enemy.js";
import { GameConfig } from "../game-config.js";
import { ORCA } from "../helper/animation.js";
import { ImgHelper } from "../helper/img-helper.js";
import { SoundManager } from "../helper/snd-mgr.js";
import { DIRECTION, HEALTH_STATE } from "../types.js";
import { PoisonousBubble } from "./poison-bubble.js";

export class Orca extends Enemy {
    #attackTimer = 0;
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

    approach() {
        this.healthState = HEALTH_STATE.spawn;
        this.#sndMgr.play('approach');
    }

    updateState(timedelta) {
        super.updateState(timedelta);
        this.#attackTimer += timedelta;
        if (this.#attackTimer >= 5000 && this.healthState == HEALTH_STATE.swim) this.healthState = HEALTH_STATE.attack;
    }

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
    #handleAtttack() {
        this.playAnimation('attack');
        if (this.curImg == 6) {
            this.#attackTimer = 0;
            this.healthState = HEALTH_STATE.swim;
        }
    }

    #handleHurt() {
        this.playAnimation('hurt');
        if (this.curImg == 4) {
            this.healthState = HEALTH_STATE.swim;
        }
    }

    #chooseAnimation() {
        switch(this.healthState) {
            case HEALTH_STATE.spawn:
                this.playAnimation('spawn');
                if (this.curImg == 10) this.healthState = HEALTH_STATE.swim;
                break;
            case HEALTH_STATE.swim:
                this.playAnimation('swim');
                break;
            case HEALTH_STATE.attack:
                this.#handleAtttack();
                break;
            case HEALTH_STATE.hurt:
                this.#handleHurt();
                break;
            case HEALTH_STATE.dead:
                this.playAnimation('dead');
        }
    }

    animationLoop() {
        this.#chooseAnimation();
        if (this.deathState() && this.curImg == this.lengthAnimation) this.onDead?.();
    }
    // #endregion
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

    prepareDeath() {
        this.healthState = HEALTH_STATE.dead;
    }

    hit(sharkie) {
        sharkie.injureBy('poison', 20);
    }

    blubb(bubble) {
        if (bubble instanceof PoisonousBubble) this.injure(20);
    }
}