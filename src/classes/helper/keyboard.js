import { Control } from "./control.js";

export class Keyboard {
    #ctrl;

    /**
     * Creates a Keyboad
     * @param {Control} ctrl - Contorl for character.
     */
    constructor(ctrl) {
        this.#ctrl = ctrl;
        this.#addKeyDownListener();
        this.#addKeyUpListener();
    }

    /** Adds key-down-event. */
    #addKeyDownListener() {
        window.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'ArrowLeft':
                    this.#ctrl.setCtrl('left', true);
                    break;

                case 'ArrowRight':
                    this.#ctrl.setCtrl('right', true);
                    break;

                case 'ArrowUp':
                    this.#ctrl.setCtrl('up', true);
                    break;

                case 'ArrowDown':
                    this.#ctrl.setCtrl('down', true);
                    break;

                case 'Space':
                    this.#ctrl.setCtrl('attack', true);
            }
        });
    }

    /** Adds key-up-event. */
    #addKeyUpListener() {
        window.addEventListener('keyup', (e) => {
            switch(e.code) {
                case 'ArrowLeft':
                    this.#ctrl.setCtrl('left', false);
                    break;

                case 'ArrowRight':
                    this.#ctrl.setCtrl('right', false);
                    break;

                case 'ArrowUp':
                    this.#ctrl.setCtrl('up', false);
                    break;

                case 'ArrowDown':
                    this.#ctrl.setCtrl('down', false);
                    break;

                case 'Space':
                    this.#ctrl.setCtrl('attack', false);
            }
        });
    }
}