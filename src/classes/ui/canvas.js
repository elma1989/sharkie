import { HTMLCustomElement } from "./html-custom.js";

export class Canvas extends HTMLCustomElement {
    static cvs = null;
    static ctx = null;

    constructor() {
        super('canvas');
        this.cvs = this.element;
        if (this.cvs) this.ctx = this.cvs.getContext('2d');
    }
}