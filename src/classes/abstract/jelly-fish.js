import { Sharkie } from "../model/sharkie.js";
import { HEALTH_STATE } from "../types.js";
import { Bubble } from "./bubble.js";
import { Enemy } from "./enemy.js";

/** 
 * A enemy, who is a jelly fish.
 * @extends Enemy
 */
export class JellyFish extends Enemy {
    /**
     * Creates a jelly fish.
     * @param {number} x - X-Pos of object.
     * @param {number} y - Y-Pos of object.
     * @param {Direction} direction - Direction of object.
     * @param {Limits} limits - Limits of movment from Object.
     */
    constructor(x, y, direction, limits) {
        super(x, y, 211, 300, {
            top: 50,
            right: 50,
            bottom: 30,
            left: 50
        }, {
            swim: {
                frames: [],
                duration: 1500,
                loop: true
            },
            dead: {
                frames: [],
                duration: 1000,
                loop: true
            }
        }, direction, limits);
    }

    /** Updated the animation in a loop for jelly fishes */
    animationLoop() {
        if (this.healthState == HEALTH_STATE.swim) this.playAnimation('swim');
        else if (this.healthState == HEALTH_STATE.dead) this.playAnimation('dead');
    }

    /**
     * Action for jelly fish hits sharkie.
     * @override
     * @param {Sharkie} sharkie
     */
    hit(sharkie) {
        sharkie.injureBy('electric', 10);
    }

    /**
     * Action for bubble collides jelly fish.
     * @override
     * @param {Bubble} bubble
     */
    blubb(bubble) {
        this.injure(100);
    }

    /**
     * Manages the movement on dead
     * @override
     * @param {number} timedelta - Time to next frame in ms.
     */
    moveDead(timedelta) {
        this.y -= 800 * timedelta / 1000;
        super.moveDead(timedelta);
    }
}