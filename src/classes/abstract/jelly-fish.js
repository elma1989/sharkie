import { DIRECTION, HEALTH_STATE } from "../types.js";
import { Enemy } from "./enemy.js";

/**
 * @typedef {import('../types.js').Limits} Limits
 * @typedef {import('../types.js').Direction} Direction
 */

/** A enemy, who is a jelly fish. */
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
        }, direction, limits)
    }

    updateAnimation(timedelta) {
        this.animationTimer += timedelta;
        if (this.animationTimer >= this.durationFrame) {
            if (this.healthState == HEALTH_STATE.swim) this.playAnimation('swim');
            else if (this.healthState == HEALTH_STATE.dead) this.playAnimation('dead');
            this.animationTimer -= this.durationFrame;
        }
    }
}