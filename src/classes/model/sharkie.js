import { ImgHelper } from '../helper/img-helper.js';
import { MovableObject } from '../abstract/moveable-object.js';

export class Sharkie extends MovableObject {

    /** @type{Level} */
    #level;
    #ctrl;

    constructor(level, ctrl) {
        super(0, 0, 815, 1000, {
            top: 600,
            right: 250,
            bottom: 300,
            left: 250
        });
        this.#level = level;
        this.#ctrl = ctrl;
    }

    get x() { return super.x; }

    set x(value) {
        const newX = this.x + value;
        if (newX < -280 || newX > 13300) return;
        super.x = value;
        this.onMoveX?.(this.x);
    }

    get y() { return super.y; }

    set y(value) {
        const newY = this.y + value;
        if (newY < -920 || newY > 655) return;
        super.y = value;
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.sharkie.idle[0]));
    }

    update(timedelta) {
        const speed = 800;
        let moveX = 0;
        let moveY = 0;

        if (this.#ctrl.ctrl.left) moveX = -1;
        if (this.#ctrl.ctrl.right) moveX = 1;
        if (this.#ctrl.ctrl.up) moveY = -1;
        if (this.#ctrl.ctrl.down) moveY = 1;

        const length = Math.hypot(moveX, moveY);
        if (length > 0) {
            moveX /= length;
            moveY /= length;
        }

        const nextX = this.x + moveX * speed * timedelta / 1000;
        const nextY = this.y + moveY * speed * timedelta / 1000;
        if (this.#level.canMoveTo(this, nextX, nextY)) {
            this.x = nextX;
            this.y = nextY;
        }
    }
}