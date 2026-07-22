import { Button } from "../abstract/button.js";

/** A Buttton, which closes Controls overlay. */
export class ControlsCloseButton extends Button {
    constructor() {
        super('btn-close-ctrl');
    }
}