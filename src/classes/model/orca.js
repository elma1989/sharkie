import { Enemy } from "../abstract/enemy.js";
import { GameConfig } from "../game-config.js";
import { ORCA } from "../helper/animation.js";
import { ImgHelper } from "../helper/img-helper.js";
import { DIRECTION } from "../types.js";

export class Orca extends Enemy {
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
        })
    }

    async load() {
        this.animations.spawn.frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.ENEMY["orca/spawn"]));
        this.animations.swim.frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.ENEMY["orca/swim"]));
        this.animations.attack.frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.ENEMY["orca/attack"]));
        this.animations.hurt.frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.ENEMY["orca/hurt"]));
        this.animations.dead.frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.ENEMY["orca/dead"]));
    }
}