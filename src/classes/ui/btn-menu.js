import { TextButton } from "../abstract/button-text.js";

export class MenuButton extends TextButton {
    constructor() {
        super('btn-menu', false, false);
    }
}