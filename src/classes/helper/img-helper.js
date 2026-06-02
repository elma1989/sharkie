export class ImgHelper {
    static #BACKGROUND = {
        water: [
            '00_Background/00_water/D1.png',
            '00_Background/00_water/D2.png'
        ],
        layer0: [
            '00_Background/01_layer0/D1.png',
            '00_Background/01_layer0/D2.png'
        ],
        layer1: [
            '00_Background/02_layer1/D1.png',
            '00_Background/02_layer1/D2.png'
        ],
        floor: [
            '00_Background/03_floor/D1.png',
            '00_Background/03_floor/D2.png'
        ],
        light: [
            '00_Background/04_light/1.png',
            '00_Background/04_light/2.png'
        ],
        barrier: {
            topButton: '00_Background/05_barrier/tb.png',
            bottom: '00_Background/05_barrier/b.png',
            right: '00_Background/05_barrier/r.png'
        }
    }

    static #SHARKIE = {
        idle: [
            '01_Sharkie/00_idle/1.png'
        ]
    }

    static get background() { return this.#BACKGROUND; }

    static get sharkie() { return this.#SHARKIE; }

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