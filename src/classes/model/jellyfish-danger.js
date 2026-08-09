import { JellyFish } from "../abstract/jelly-fish.js";
import { ImgHelper } from "../helper/img-helper.js";
import { DIRECTION, HEALTH_STATE } from "../types.js";

/**
 * @typedef {import('../types.js').Limits} Limits
 */

/** A jelly fish which is very danger. */
export class DangerousJellyFish extends JellyFish {
    constructor() {
        const limits = {
            minX: 3700,
            maxX: 4400,
            minY: 200,
            maxY: 1000
        }
        const pos = DangerousJellyFish.startPos(limits);
        super(pos.x, pos.y, DIRECTION.SOUTH, limits);
    }

    /**
     * Calculates start position of danger jelly fish.
     * @param {Limits} limits - Limits for movement.
     * @returns {{x: number, y:number}} Position of object.
     */
    static startPos(limits) {
        return {
            x: (limits.minX + limits.maxX) / 2 - 111 / 2 + 1,
            y: limits.minY + 1
        }
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.ENEMY["jellyfish/green/swim"][0]));
        this.animations.swim.frames = await this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["jellyfish/green/swim"]));
        this.animations.dead.frames = await this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["jellyfish/green/dead"]));
    }

    // #region Movement
    changeDirection() {
        switch(this.direction) {
            case DIRECTION.SOUTH:
                this.direction = DIRECTION.WEST;
                break;

            case DIRECTION.WEST:
                this.direction = DIRECTION.NORTH;
                break;

            case DIRECTION.NORTH:
                this.direction = DIRECTION.EAST;
                break;

            case DIRECTION.EAST:
                this.direction = DIRECTION.SOUTH;
        }
    }

    #getDirection() {
        let x,y;
        switch(this.direction) {
            case DIRECTION.NORTH:
                x = 1;
                y = -1;
                break;

            case DIRECTION.EAST:
                x = 1;
                y = 1;
                break;

            case DIRECTION.SOUTH:
                x = -1;
                y = 1;
                break;

            case DIRECTION.WEST:
                x = -1;
                y = -1;
        }
        return {x, y};
    }

    moveSwim(timedelta) {
        const speed = 600;
        const vector = this.#getDirection();
        const newX = this.x + vector.x * speed * timedelta / 1000;
        const newY = this.y + vector.y * speed * timedelta / 1000;
        if (this.limtitAt(newX, newY)) this.changeDirection();
        else {
            this.x = newX;
            this.y = newY;
        }
    }

    hit(sharkie) {
        sharkie.injureBy('electric', 20);
    }

    blubb(bubble) {
        this.injure(50);
    }
}