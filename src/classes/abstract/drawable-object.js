import { Canvas } from "../ui/canvas.js";

/** An Object to draw. */
export class DrawableObject {
    #x;
    #y;
    #width;
    #height;
    #img = null;

    /**
     * Creates an drawable object
     * @param {number} x - X-Pos of object.
     * @param {number} y - Y-Pos of object.
     * @param {number} width - Width of object.
     * @param {number} height - Height of object.
     */
    constructor(x, y, width, height) {
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
    }

    // #region Methods
    get x() { return this.#x; }

    set x(value) { this.#x = value; }

    get y() { return this.#y; }

    set y(value) {this.#y = value;}

    get width() { return this.#width; }

    get height() { return this.#height; }

    get img() { return this.#img; }

    set img(img) {
        if (img instanceof Image) this.#img = img;
    }

    // #region
    /** Loads assests of an oject, must be modified by child. */
    async load() {

    }

    /**
     * Loads an image.
     * @param {string} url - Url from image.
     * @returns {Promise<Image>} Image after load.
     */
    async #getImage(url) {
        const img = new Image();
        return new Promise(resolve => {
            img.src = url;
            img.onload = () => resolve(img);
        });
    }

    /**
     * Checks url of image and load it.
     * @param {string} url - Url from image.
     * @returns {Promise<Image>} Image after load.
     */
    async loadImage(url) {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP-Error: ${resp.status}, url: ${url}`);
        return this.#getImage(url);
    }

    /**
     * Gets a list of images from urls
     * @param {string[]} urls - Urls for animation.
     * @returns {Promise<HTMLImageElement[]>}
     */
    async loadImages(urls) {
        return Promise.all(urls.map(url => this.loadImage(url)));
    }
    // #endregion

    /** Draws an object. */
    draw(ctx) {
        if (ctx) ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    // #endregion
}