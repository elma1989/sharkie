import { TextButton } from "../abstract/button-text.js";

/** A button for rules-overlay. */
export class RulesButton extends TextButton {
    constructor() {
        super('btn-rules', 'Rules');
    }
}