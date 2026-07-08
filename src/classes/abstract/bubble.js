import { GameConfig } from "../game-config.js";
import { DIRECTION } from "../types.js";
import { MovableObject } from "./moveable-object.js";

/**
 * @typedef {import('../types.js').Direction} Direction
 */

/** Represents a bubble. */
export class Bubble extends MovableObject {
    #startX = 0;
    #direction;
    #bubbleDistanceReached = false;
    /**
     * Creates ab bubble
     * @param {Direction} direction - Direction of bubble
     */
    constructor(direction) {
        super(0, 0, 96, 96, {
            top: 12,
            right: 12,
            bottom: 12,
            left: 12
        });
        this.#direction = direction;
    }

    updateMovement(timedelta) {
        const speed = (this.#direction == DIRECTION.EAST ? 1 : -1) * 1200;
        this.x += speed * timedelta / 1000;
        if (this.x < -100) this.onBurst?.();
        if (this.x > this.#startX + 200 && !this.#bubbleDistanceReached) {
            this.#bubbleDistanceReached = true;
            this.onDistanceSharkie?.();
        }
    }
}