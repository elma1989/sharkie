/** Manages all user inputs. */
export class Control {
    /** @type{Object<string, boolean>} Map of user inputs.*/
    #controls = {
        up: false,
        right: false,
        down: false,
        left: false,
        attackSlap: false,
        attackBubble: false
    }

    /**
     * Gets a map for all input state.
     * @returns {Object<string, boolean>} Map of input state.
     */
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