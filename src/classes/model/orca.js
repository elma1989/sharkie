import { Enemy } from "../abstract/enemy.js";
import { GameConfig } from "../game-config.js";
import { ORCA } from "../helper/animation.js";
import { ImgHelper } from "../helper/img-helper.js";
import { DIRECTION, HEALTH_STATE } from "../types.js";
import { PoisonousBubble } from "./poison-bubble.js";

export class Orca extends Enemy {
    #attackTimer = 0;

    constructor() {
        super(GameConfig.WIDTH * 3 + 450, 0, 1041, 1216, {
            top: 750,
            right: 300,
            bottom: 270,
            left: 150
        }, ORCA, DIRECTION.WEST, {
            minX: GameConfig.WIDTH * 3,
            maxX: GameConfig.WIDTH * 4 - 450,
            minY: 0,
            maxY: GameConfig.HEIGHT
        });
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.ENEMY["orca/spawn"][0]));
        this.animations.spawn.frames = await this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["orca/spawn"]));
        this.animations.swim.frames = await this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["orca/swim"]));
        this.animations.attack.frames = await this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["orca/attack"]));
        this.animations.hurt.frames = await this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["orca/hurt"]));
        this.animations.dead.frames = await this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["orca/dead"]));
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

    playInjureSound(sndMgr) {
        sndMgr.play('hurt/orca');
    }

    injure(damage, sndMgr) {
        super.injure(damage, sndMgr);
        this.onInjure?.(this.health);
        this.#attackTimer = 0;
        if (this.health >= 0) this.healthState = HEALTH_STATE.hurt;
        else this.prepareDeath();
    }

    prepareDeath() {
        this.healthState = HEALTH_STATE.dead;
    }

    blubb(bubble, sndMgr) {
        if (bubble instanceof PoisonousBubble) this.injure(20, sndMgr);
    }
}