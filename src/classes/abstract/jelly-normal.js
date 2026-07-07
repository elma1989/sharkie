import { DIRECTION, HEALTH_STATE } from "../types.js";
import { JellyFish } from "./jelly-fish.js";

/** A easy going jelly fish */
export class NormalJellyFish extends JellyFish {

    /**
     * Creats a  normal jelly fish.
     * @param {number} x - X-Position of object.
     * @param {number} y - Y-Position of object.
     * @param {number} minY - Minmum Y-Position of object.
     * @param {number} maxY - Maximum Y-Position of object.
     */
    constructor(x, y, minY, maxY) {
        super(x, y, DIRECTION.SOUTH, {
            minX: x - 10,
            maxX: x + 200,
            minY: minY,
            maxY: maxY
        });
    }

    changeDirection() {
        this.direction = this.direction == DIRECTION.SOUTH ? DIRECTION.NORTH : DIRECTION.SOUTH;
    }

    updateMovement(timedelta) {
        const speed = 300;
        const movement = speed * timedelta / 1000;
        if (this.healthState == HEALTH_STATE.swim) {
            this.y += this.direction == DIRECTION.SOUTH ? movement : -movement;
            this.checkDirection();
        } else if (this.healthState == HEALTH_STATE.dead) {
            this.y -= 500 * timedelta / 1000;
            if (this.y <= -this.height) this.onDead?.();
        }
    }
}