import { HTMLCustomElement } from "./html-custom.js";

export class Canvas extends HTMLCustomElement {
    static cvs = null;
    static ctx = null;

    constructor() {
        super('canvas');
        const canvas = this.element;
        if (canvas) {
            Canvas.cvs = canvas;
            Canvas.ctx = canvas.getContext('2d');
        }
    }
}