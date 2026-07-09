import { Enemy } from "../abstract/enemy.js";
import { GameConfig } from "../game-config.js";
import { ORCA } from "../helper/animation.js";
import { ImgHelper } from "../helper/img-helper.js";
import { DIRECTION, HEALTH_STATE } from "../types.js";

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
        this.animations.spawn.frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.ENEMY["orca/spawn"]));
        this.animations.swim.frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.ENEMY["orca/swim"]));
        this.animations.attack.frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.ENEMY["orca/attack"]));
        this.animations.hurt.frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.ENEMY["orca/hurt"]));
        this.animations.dead.frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.ENEMY["orca/dead"]));
    }

    bringToLife() {
        this.healthState = HEALTH_STATE.spawn;
    }

    updateState(timedelta) {
        super.updateState(timedelta);
        this.#attackTimer += timedelta;
        if (this.#attackTimer >= 5000 && this.healthState == HEALTH_STATE.swim) this.healthState = HEALTH_STATE.attack;
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

    updateAnimation(timedelta) {
        this.animationTimer += timedelta;
        const duration = this.durationFrame;
        if (this.animationTimer >= duration) {
            this.#chooseAnimation();
            this.animationTimer -= duration;
        }
    }
    // #endregion

}