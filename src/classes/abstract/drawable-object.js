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

    get y() { return this.#y; }

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
    // #endregion

    /** Draws an object. */
    draw() {
        const canvas = Canvas.cvs;
        if (!canvas || !this.img) return;
        const ctx = Canvas.ctx;
        if (!ctx) return;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    // #endregion
}