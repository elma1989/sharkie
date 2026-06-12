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
            '01_Sharkie/00_idle/1.png',
            '01_Sharkie/00_idle/2.png',
            '01_Sharkie/00_idle/3.png',
            '01_Sharkie/00_idle/4.png',
            '01_Sharkie/00_idle/5.png',
            '01_Sharkie/00_idle/7.png',
            '01_Sharkie/00_idle/8.png',
            '01_Sharkie/00_idle/9.png',
            '01_Sharkie/00_idle/10.png',
            '01_Sharkie/00_idle/11.png',
            '01_Sharkie/00_idle/12.png',
            '01_Sharkie/00_idle/13.png',
            '01_Sharkie/00_idle/14.png',
            '01_Sharkie/00_idle/15.png',
            '01_Sharkie/00_idle/16.png',
            '01_Sharkie/00_idle/17.png',
            '01_Sharkie/00_idle/18.png'
        ],
        longIdle: [
            '01_Sharkie/01_longidle/1.png',
            '01_Sharkie/01_longidle/2.png',
            '01_Sharkie/01_longidle/3.png',
            '01_Sharkie/01_longidle/4.png',
            '01_Sharkie/01_longidle/5.png',
            '01_Sharkie/01_longidle/6.png',
            '01_Sharkie/01_longidle/7.png',
            '01_Sharkie/01_longidle/8.png',
            '01_Sharkie/01_longidle/9.png',
            '01_Sharkie/01_longidle/10.png',
            '01_Sharkie/01_longidle/11.png',
            '01_Sharkie/01_longidle/12.png',
            '01_Sharkie/01_longidle/13.png',
            '01_Sharkie/01_longidle/14.png'
        ],
        swim: [
            '01_Sharkie/02_swim/1.png',
            '01_Sharkie/02_swim/2.png',
            '01_Sharkie/02_swim/3.png',
            '01_Sharkie/02_swim/4.png',
            '01_Sharkie/02_swim/5.png',
            '01_Sharkie/02_swim/6.png'
        ],
        'hurt/poison': [
            '01_Sharkie/03_hurt/poison/1.png',
            '01_Sharkie/03_hurt/poison/2.png',
            '01_Sharkie/03_hurt/poison/3.png',
            '01_Sharkie/03_hurt/poison/4.png'
        ],
        'hurt/electric': [
            '01_Sharkie/03_hurt/electric/1.png',
            '01_Sharkie/03_hurt/electric/2.png',
            '01_Sharkie/03_hurt/electric/3.png'
        ],
        'dead/poison': [
            '01_Sharkie/04_dead/poison/1.png',
            '01_Sharkie/04_dead/poison/2.png',
            '01_Sharkie/04_dead/poison/3.png',
            '01_Sharkie/04_dead/poison/4.png',
            '01_Sharkie/04_dead/poison/5.png',
            '01_Sharkie/04_dead/poison/6.png',
            '01_Sharkie/04_dead/poison/7.png',
            '01_Sharkie/04_dead/poison/8.png',
            '01_Sharkie/04_dead/poison/9.png',
            '01_Sharkie/04_dead/poison/10.png',
            '01_Sharkie/04_dead/poison/11.png',
            '01_Sharkie/04_dead/poison/12.png'
        ],
        'dead/electric': [
            '01_Sharkie/04_dead/electric/1.png',
            '01_Sharkie/04_dead/electric/2.png',
            '01_Sharkie/04_dead/electric/3.png',
            '01_Sharkie/04_dead/electric/4.png',
            '01_Sharkie/04_dead/electric/5.png',
            '01_Sharkie/04_dead/electric/6.png',
            '01_Sharkie/04_dead/electric/7.png',
            '01_Sharkie/04_dead/electric/8.png',
            '01_Sharkie/04_dead/electric/9.png',
            '01_Sharkie/04_dead/electric/10.png'
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
        const local = host == 'localhost' || host == '127.0.0.1';
        const daServer = host.endsWith('developerakademie.net');
        const prefix = local ? '/' : (daServer ? '/sharkie/' : '/static/sharkie/');
        return prefix + 'assets/img/' + file;
    }
}