export class ImgHelper {
    static #BACKGROUND = {
        water: [
            '00_Background/00_water/D1.png',
            '00_Background/00_water/D2.png'
        ]
    }

    static get background() { return this.#BACKGROUND; }

    /**
     * Gets url from file.
     * @param {string} file - Name from ImgHeloper-Getter.
     * @returns Complete url.
     */
    static url(file) {
        const host = location.hostname;
        const local = host == 'localhost' || '127.0.0.1';
        const daServer = host.endsWith('developerakademie.net');
        const prefix = local ? '/' : (daServer ? '/sharkie/' : '/static/sharkie/');
        return prefix + 'assets/img/' + file;
    }
}