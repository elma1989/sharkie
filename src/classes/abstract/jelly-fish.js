import { Sharkie } from "../model/sharkie.js";
import { DIRECTION, HEALTH_STATE } from "../types.js";
import { Bubble } from "./bubble.js";
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

    /**
     * @override
     * @inheritdoc
     * @param {number} movement
     */
    moveDead(movement) {
        this.y -= movement;
        if (this.y + this.height < 0) this.onDead?.();
    }

    /**
     * @override
     * @inheritdoc
     * @param {number} timedelta
     */
    updateMovement(timedelta) {
        if (this.healthState == HEALTH_STATE.swim) {
            this.moveSwim(this.movement(300, timedelta));
            this.checkDirection();
        } else if(this.healthState == HEALTH_STATE.dead) this.moveDead(this.movement(800, timedelta));
    }

    /**
     * @override
     * @inheritdoc
     * @param {number} timedelta
     */
    updateAnimation(timedelta) {
        this.animationTimer += timedelta;
        if (this.animationTimer >= this.durationFrame) {
            if (this.healthState == HEALTH_STATE.swim) this.playAnimation('swim');
            else if (this.healthState == HEALTH_STATE.dead) this.playAnimation('dead');
            this.animationTimer -= this.durationFrame;
        }
    }

    /**
     * @override
     * @inheritdoc
     * @param {Sharkie} sharkie
     */
    hit(sharkie) {
        sharkie.injure(10, 'electric');
    }

    /**
     * @override
     * @inheritdoc
     * @param {Bubble} bubble
     */
    blubb(bubble) {
        this.injure(100);
    }
}