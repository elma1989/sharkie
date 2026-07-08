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

    moveSwim(movement) {
        this.y += this.direction == DIRECTION.SOUTH ? movement : -movement;
    }
}