import { Bubble } from "../../abstract/bubble.js";
import { JellyFish } from "../../abstract/jelly-fish.js";
import { ImgHelper } from "../../helper/img-helper.js";
import { DIRECTION } from "../../types.js";
import { Sharkie } from "../sharkie.js";

/** 
 * A jelly fish which is very danger.
 * @extends JellyFish
 */
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

    /**
     * Loads image for dangerous jelly fish
     * @override
     */
    async load() {
        const [swim, dead] = await Promise.all([
            this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["jellyfish/green/swim"])),
            this.loadImages(ImgHelper.urls(ImgHelper.ENEMY["jellyfish/green/dead"]))
        ]);
        this.animations.swim.frames = swim;
        this.animations.dead.frames = dead;
        this.img = swim[0];
    }

    // #region Movement
    /**
     * Changes direction of dangerous jelly fish.
     * @override
     */
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

    /**
     * Gets multiplicators for current direction.
     * @returns {{x: number, y:number}} X and y-diretion.
     */
    getDirection() {
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

    /**
     * Updated movement on swim-state for dangerous jelly fish.
     * @param {number} timedelta - Time to next frame in ms.
     */
    moveSwim(timedelta) {
        const speed = 600;
        const vector = this.getDirection();
        const newX = this.x + vector.x * speed * timedelta / 1000;
        const newY = this.y + vector.y * speed * timedelta / 1000;
        if (this.limtitAt(newX, newY)) this.changeDirection();
        else {
            this.x = newX;
            this.y = newY;
        }
    }

    /**
     * Action for dangerous jelly-fish hits Sharkie.
     * @param {Sharkie} sharkie - Instance of main-character.
     */
    hit(sharkie) {
        sharkie.injureBy('electric', 20);
    }

    /**
     * Action for bubble collides with dangerous jelly fish.
     * @param {Bubble} bubble - Bubble for collision.
     */
    blubb(bubble) {
        this.injure(50);
    }
}