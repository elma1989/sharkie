import { CollidingObject } from '../abstract/colliding-object.js';
import { ImgHelper } from '../helper/img-helper.js';

export class Sharkie extends CollidingObject {

    constructor() {
        super(0, 0, 815, 1000, {
            top: 600,
            right: 250,
            bottom: 300,
            left: 250
        });
    }

    async load() {
        this.img = await this.loadImage(ImgHelper.url(ImgHelper.sharkie.idle[0]));
    }
}