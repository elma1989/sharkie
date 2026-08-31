import { Overlay } from "../abstract/overlay.js";

/**
 * Overlay for show, if loading not jet complete
 * @extends Overlay
 */
class LoadingSpinner extends Overlay {
    constructor() {
        super('loading');
    }

    /**
     * Shows the loading spinner.
     * @override
     */
    show() {
        super.show();
        this.classList.add('waiting');
    }

    /**
     * Hides the loading spinner.
     * @override
     */
    hide() {
        super.hide();
        this.classList.remove('waiting');
    }
}

customElements.define('overlay-loading', LoadingSpinner);