import { ImgHelper } from "../helper/img-helper.js";
import { Button } from "./button.js";

/** Abutton which has two icon for on and off. */
export class IconButton extends Button {
    #icons;
    #active;

    /**
     * Creates an icon button
     * @param {string} id - Id of HTML-Element
     */
    constructor(id) {
        super(id, false);
        this.#icons = null;
        this.#active = true;
    }

    get icons() { return this.#icons; }

    set icons (icons) {
        const keys = Object.keys(icons);
        if (!keys.includes('on') || !keys.includes('off')) return;
        this.#icons = icons;
    }

    get active() { return this.#active; }

    set active(state) {
        if (typeof state != 'boolean' || !this.element) return;
        const key = state ? 'on' : 'off';
        this.element.innerHTML = '';
        this.element.appendChild(this.icons[key]);
        this.onChange?.(state);
        this.#active = state;
    }

    // #region Load
    /**
     * Gets icom from url.
     * @param {string} url - URL for image.
     * @returns {Promise<Image>} Image from url.
     */
    async #icon(url) {
        return new Promise(resolve => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(img);
        });
    }

    /**
     * Loads image from url.
     * @param {string} url - URL for image
     * @returns {Promise<image>} Image from url.
     */
    async #loadIcon(url) {
        const resp = await fetch(url);
        if (!resp.ok) return null;
        return this.#icon(url);
    }

    /**
     * Puts images in a map for buttton.
     * @param {string} name - Name of button.
     * @returns {{on: Image | null, off: Image | null}} Map of images.
     */
    async loadIcons(name) {
        if (!Object.keys(ImgHelper.ICONS).includes(name)) return null;
        return {
            on: await this.#loadIcon(ImgHelper.url(ImgHelper.ICONS[name][0], true)),
            off: await this.#loadIcon(ImgHelper.url(ImgHelper.ICONS[name][1], true))
        }
    }

    /** Manages the load-process. */
    async load() {

    }
    // #endregion

    /** Changes active state. */
    toggle() {
        this.active = !this.active;
    }
}