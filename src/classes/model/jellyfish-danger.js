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
        super(pos.x, pos.y, DIRECTION.EAST, limits);
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
        this.animations.swim.frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.ENEMY["jellyfish/green/swim"]));
        this.animations.dead.frames = await this.loadAnimations(ImgHelper.urls(ImgHelper.ENEMY["jellyfish/green/dead"]));
    }

    /**
     * Gets movement data.
     * @param {number} timedelta - Time to next frame.
     * @returns {{moveX: number, moveY: number}} Data of movement.
     */
    #movedata(timedelta) {
        const speed = 300;
        const movement = speed * timedelta / 1000;
        let moveX = 0;
        let moveY = 0;
        if (this.healthState == HEALTH_STATE.swim) {
            switch(this.direction) {
                case DIRECTION.SOUTH:
                    moveX = -movement;
                    moveY = movement;
                    break;

                case DIRECTION.WEST:
                    moveX = -movement;
                    moveY = -movement;
                    break;

                case DIRECTION.NORTH:
                    moveX = movement;
                    moveY = -movement;
                    break;

                case DIRECTION.EAST:
                    moveX = movement;
                    moveY = movement;
            }
        } else if (this.healthState == HEALTH_STATE.dead) moveY = -timedelta / 2;
        return {moveX, moveY}
    }

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

    updateMovement(timedelta) {
        const movement = this.#movedata(timedelta);
        this.x += movement.moveX;
        this.y += movement.moveY;
        this.checkDirection();
    }

    hit(sharkie) {
        sharkie.injure(20, 'electric');
    }

    blubb(bubble) {
        this.injure(50);
    }
}