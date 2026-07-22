export class Template {

    /**
     * Gets template string for overlay.
     * @param {string} name - Name of overlay for close-button-id
     * @param {string} title - Title of overlay.
     * @param {string} content - Children as Tag-String.
     * @returns {string} Template for overlay.
     */
    static overlay(name, title, content) {
        return `
            <header>
                <h2 class="font-lucky">${title}</h2>
                <button id="btn-close-${name}" class="btn-close">X</button>
            </header>
            <div class="overlay-content">
                ${content}
            </div>
        `
    }
}