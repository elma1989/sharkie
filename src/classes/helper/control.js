export class Control {
    #controls = {
        up: false,
        right: false,
        down: false,
        left: false,
        attackSlap: false,
        attackBubble: false
    }

    get ctrl() { return this.#controls; }

    /**
     * Sets controls.
     * @param {string} name - Name of control
     * @param {boolean} state - True for active.
     */
    setCtrl(name, state) {
        if (name in this.#controls) this.#controls[name] = state;
    }
}