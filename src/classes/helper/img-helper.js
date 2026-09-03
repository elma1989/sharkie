/** A collection of all images files. */
export class ImgHelper {
    /**
     * All background images of the world.
     * @type {Object<string, string[]>}
     */
    static BACKGROUND = {
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

    /**
     * All images for sharkie.
     * @type {Object<string, string[]>}
     */
    static SHARKIE = {
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
        ],
        'attack/slap': [
            '01_Sharkie/05_attack/slap/1.png',
            '01_Sharkie/05_attack/slap/2.png',
            '01_Sharkie/05_attack/slap/3.png',
            '01_Sharkie/05_attack/slap/4.png',
            '01_Sharkie/05_attack/slap/5.png',
            '01_Sharkie/05_attack/slap/6.png',
            '01_Sharkie/05_attack/slap/7.png',
            '01_Sharkie/05_attack/slap/8.png'
        ],
        'attack/bubble/normal': [
            '01_Sharkie/05_attack/bubble/normal/1.png',
            '01_Sharkie/05_attack/bubble/normal/2.png',
            '01_Sharkie/05_attack/bubble/normal/3.png',
            '01_Sharkie/05_attack/bubble/normal/4.png',
            '01_Sharkie/05_attack/bubble/normal/5.png',
            '01_Sharkie/05_attack/bubble/normal/6.png',
            '01_Sharkie/05_attack/bubble/normal/7.png',
            '01_Sharkie/05_attack/bubble/normal/8.png'
        ],
        'attack/bubble/poison': [
            '01_Sharkie/05_attack/bubble/poison/1.png',
            '01_Sharkie/05_attack/bubble/poison/2.png',
            '01_Sharkie/05_attack/bubble/poison/3.png',
            '01_Sharkie/05_attack/bubble/poison/4.png',
            '01_Sharkie/05_attack/bubble/poison/5.png',
            '01_Sharkie/05_attack/bubble/poison/6.png',
            '01_Sharkie/05_attack/bubble/poison/7.png',
            '01_Sharkie/05_attack/bubble/poison/8.png'
        ],
        'bubble/normal': '01_Sharkie/05_attack/bubble/normal/bubble.png',
        'bubble/poison': '01_Sharkie/05_attack/bubble/poison/bubble.png'
    }

    /** 
     * All images for enemies.
     * @type {Object<string, string[]>}
     */
    static ENEMY = {
        'pufferfish/green/swim/empty': [
            '02_Enemy/01_puffer_fish/green/swim/empty/1.png',
            '02_Enemy/01_puffer_fish/green/swim/empty/2.png',
            '02_Enemy/01_puffer_fish/green/swim/empty/3.png',
            '02_Enemy/01_puffer_fish/green/swim/empty/4.png',
            '02_Enemy/01_puffer_fish/green/swim/empty/5.png'
        ],
        'pufferfish/green/swim/transition': [
            '02_Enemy/01_puffer_fish/green/swim/transition/1.png',
            '02_Enemy/01_puffer_fish/green/swim/transition/2.png',
            '02_Enemy/01_puffer_fish/green/swim/transition/3.png',
            '02_Enemy/01_puffer_fish/green/swim/transition/4.png',
            '02_Enemy/01_puffer_fish/green/swim/transition/5.png'
        ],
        'pufferfish/green/swim/full': [
            '02_Enemy/01_puffer_fish/green/swim/full/1.png',
            '02_Enemy/01_puffer_fish/green/swim/full/2.png',
            '02_Enemy/01_puffer_fish/green/swim/full/3.png',
            '02_Enemy/01_puffer_fish/green/swim/full/4.png',
            '02_Enemy/01_puffer_fish/green/swim/full/5.png'
        ],
        'pufferfish/green/dead/empty': '02_Enemy/01_puffer_fish/green/dead/empty.png',
        'pufferfish/green/dead/transition': '02_Enemy/01_puffer_fish/green/dead/transition.png',
        'pufferfish/green/dead/full': '02_Enemy/01_puffer_fish/green/dead/full.png',
        'pufferfish/orange/swim/empty': [
            '02_Enemy/01_puffer_fish/orange/swim/empty/1.png',
            '02_Enemy/01_puffer_fish/orange/swim/empty/2.png',
            '02_Enemy/01_puffer_fish/orange/swim/empty/3.png',
            '02_Enemy/01_puffer_fish/orange/swim/empty/4.png',
            '02_Enemy/01_puffer_fish/orange/swim/empty/5.png'
        ],
        'pufferfish/orange/swim/transition': [
            '02_Enemy/01_puffer_fish/orange/swim/transition/1.png',
            '02_Enemy/01_puffer_fish/orange/swim/transition/2.png',
            '02_Enemy/01_puffer_fish/orange/swim/transition/3.png',
            '02_Enemy/01_puffer_fish/orange/swim/transition/4.png',
            '02_Enemy/01_puffer_fish/orange/swim/transition/5.png'
        ],
        'pufferfish/orange/swim/full': [
            '02_Enemy/01_puffer_fish/orange/swim/full/1.png',
            '02_Enemy/01_puffer_fish/orange/swim/full/2.png',
            '02_Enemy/01_puffer_fish/orange/swim/full/3.png',
            '02_Enemy/01_puffer_fish/orange/swim/full/4.png',
            '02_Enemy/01_puffer_fish/orange/swim/full/5.png'
        ],
        'pufferfish/orange/dead/empty': '02_Enemy/01_puffer_fish/orange/dead/empty.png',
        'pufferfish/orange/dead/transition': '02_Enemy/01_puffer_fish/orange/dead/transition.png',
        'pufferfish/orange/dead/full': '02_Enemy/01_puffer_fish/orange/dead/full.png',
        'pufferfish/pink/swim/empty': [
            '02_Enemy/01_puffer_fish/pink/swim/empty/1.png',
            '02_Enemy/01_puffer_fish/pink/swim/empty/2.png',
            '02_Enemy/01_puffer_fish/pink/swim/empty/3.png',
            '02_Enemy/01_puffer_fish/pink/swim/empty/4.png',
            '02_Enemy/01_puffer_fish/pink/swim/empty/5.png'
        ],
        'pufferfish/pink/swim/transition': [
            '02_Enemy/01_puffer_fish/pink/swim/transition/1.png',
            '02_Enemy/01_puffer_fish/pink/swim/transition/2.png',
            '02_Enemy/01_puffer_fish/pink/swim/transition/3.png',
            '02_Enemy/01_puffer_fish/pink/swim/transition/4.png',
            '02_Enemy/01_puffer_fish/pink/swim/transition/5.png'
        ],
        'pufferfish/pink/swim/full': [
            '02_Enemy/01_puffer_fish/pink/swim/full/1.png',
            '02_Enemy/01_puffer_fish/pink/swim/full/2.png',
            '02_Enemy/01_puffer_fish/pink/swim/full/3.png',
            '02_Enemy/01_puffer_fish/pink/swim/full/4.png',
            '02_Enemy/01_puffer_fish/pink/swim/full/5.png'
        ],
        'pufferfish/pink/dead/empty': '02_Enemy/01_puffer_fish/pink/dead/empty.png',
        'pufferfish/pink/dead/transition': '02_Enemy/01_puffer_fish/pink/dead/transition.png',
        'pufferfish/pink/dead/full': '02_Enemy/01_puffer_fish/pink/dead/full.png',
        'jellyfish/green/swim': [
            '02_Enemy/02_jelly_fish/green/swim/1.png',
            '02_Enemy/02_jelly_fish/green/swim/2.png',
            '02_Enemy/02_jelly_fish/green/swim/3.png',
            '02_Enemy/02_jelly_fish/green/swim/4.png'
        ],
        'jellyfish/green/dead': [
            '02_Enemy/02_jelly_fish/green/dead/1.png',
            '02_Enemy/02_jelly_fish/green/dead/2.png',
            '02_Enemy/02_jelly_fish/green/dead/3.png',
            '02_Enemy/02_jelly_fish/green/dead/4.png'
        ],
        'jellyfish/purple/swim': [
            '02_Enemy/02_jelly_fish/purple/swim/1.png',
            '02_Enemy/02_jelly_fish/purple/swim/2.png',
            '02_Enemy/02_jelly_fish/purple/swim/3.png',
            '02_Enemy/02_jelly_fish/purple/swim/4.png'
        ],
        'jellyfish/purple/dead': [
            '02_Enemy/02_jelly_fish/purple/dead/1.png',
            '02_Enemy/02_jelly_fish/purple/dead/2.png',
            '02_Enemy/02_jelly_fish/purple/dead/3.png',
            '02_Enemy/02_jelly_fish/purple/dead/4.png'
        ],
        'jellyfish/yellow/swim': [
            '02_Enemy/02_jelly_fish/yellow/swim/1.png',
            '02_Enemy/02_jelly_fish/yellow/swim/2.png',
            '02_Enemy/02_jelly_fish/yellow/swim/3.png',
            '02_Enemy/02_jelly_fish/yellow/swim/4.png'
        ],
        'jellyfish/yellow/dead': [
            '02_Enemy/02_jelly_fish/yellow/dead/1.png',
            '02_Enemy/02_jelly_fish/yellow/dead/2.png',
            '02_Enemy/02_jelly_fish/yellow/dead/3.png',
            '02_Enemy/02_jelly_fish/yellow/dead/4.png'
        ],
        'orca/swim': [
            '02_Enemy/03_orca/swim/1.png',
            '02_Enemy/03_orca/swim/2.png',
            '02_Enemy/03_orca/swim/3.png',
            '02_Enemy/03_orca/swim/4.png',
            '02_Enemy/03_orca/swim/5.png',
            '02_Enemy/03_orca/swim/6.png',
            '02_Enemy/03_orca/swim/7.png',
            '02_Enemy/03_orca/swim/8.png',
            '02_Enemy/03_orca/swim/9.png',
            '02_Enemy/03_orca/swim/10.png',
            '02_Enemy/03_orca/swim/11.png',
            '02_Enemy/03_orca/swim/12.png',
            '02_Enemy/03_orca/swim/13.png'
        ],
        'orca/spawn': [
            '02_Enemy/03_orca/spawn/1.png',
            '02_Enemy/03_orca/spawn/2.png',
            '02_Enemy/03_orca/spawn/3.png',
            '02_Enemy/03_orca/spawn/4.png',
            '02_Enemy/03_orca/spawn/5.png',
            '02_Enemy/03_orca/spawn/6.png',
            '02_Enemy/03_orca/spawn/7.png',
            '02_Enemy/03_orca/spawn/8.png',
            '02_Enemy/03_orca/spawn/9.png',
            '02_Enemy/03_orca/spawn/10.png'
        ],
        'orca/attack': [
            '02_Enemy/03_orca/attack/1.png',
            '02_Enemy/03_orca/attack/2.png',
            '02_Enemy/03_orca/attack/3.png',
            '02_Enemy/03_orca/attack/4.png',
            '02_Enemy/03_orca/attack/5.png',
            '02_Enemy/03_orca/attack/6.png'
        ],
        'orca/hurt': [
            '02_Enemy/03_orca/hurt/1.png',
            '02_Enemy/03_orca/hurt/2.png',
            '02_Enemy/03_orca/hurt/3.png',
            '02_Enemy/03_orca/hurt/4.png'
        ],
        'orca/dead': [
            '02_Enemy/03_orca/dead/1.png',
            '02_Enemy/03_orca/dead/2.png',
            '02_Enemy/03_orca/dead/3.png',
            '02_Enemy/03_orca/dead/4.png',
            '02_Enemy/03_orca/dead/5.png',
            '02_Enemy/03_orca/dead/6.png'
        ]
    }

    /**
     *  All images for collecables.
     *  @type {Object<string, string[]>} 
     */
    static COLLECTABLE = {
        poison: [
            '03_Collectable/01_poison/1.png',
            '03_Collectable/01_poison/2.png',
            '03_Collectable/01_poison/3.png',
            '03_Collectable/01_poison/4.png',
            '03_Collectable/01_poison/5.png',
            '03_Collectable/01_poison/6.png',
            '03_Collectable/01_poison/7.png',
            '03_Collectable/01_poison/8.png'
        ],
        coin: [
            '03_Collectable/02_coin/1.png',
            '03_Collectable/02_coin/2.png',
            '03_Collectable/02_coin/3.png',
            '03_Collectable/02_coin/4.png'
        ]
    }

    /**
     * Images for win- and lose-screen. 
     * @type {Object<string,string>}
     */
    static SCREEN = {
        win: '04_Screen/win.png',
        lose: '04_Screen/lose.png'
    }

    /**
     * All images for status bars.
     * @type {Object<string, string[]>}
     */
    static STATUS = {
        'health/sharkie': [
            '05_Status/01_health_sharkie/00.png',
            '05_Status/01_health_sharkie/20.png',
            '05_Status/01_health_sharkie/40.png',
            '05_Status/01_health_sharkie/60.png',
            '05_Status/01_health_sharkie/80.png',
            '05_Status/01_health_sharkie/100.png'
        ],
        'health/orca': [
            '05_Status/02_health_orca/00.png',
            '05_Status/02_health_orca/20.png',
            '05_Status/02_health_orca/40.png',
            '05_Status/02_health_orca/60.png',
            '05_Status/02_health_orca/80.png',
            '05_Status/02_health_orca/100.png'
        ],
        coin: [
            '05_Status/03_coin/00.png',
            '05_Status/03_coin/20.png',
            '05_Status/03_coin/40.png',
            '05_Status/03_coin/60.png',
            '05_Status/03_coin/80.png',
            '05_Status/03_coin/100.png'
        ],
        posion: [
            '05_Status/04_poison/00.png',
            '05_Status/04_poison/20.png',
            '05_Status/04_poison/40.png',
            '05_Status/04_poison/60.png',
            '05_Status/04_poison/80.png',
            '05_Status/04_poison/100.png'
        ]
    }

    /**
     * Gets url from file.
     * @param {string} file - Name from ImgHeloper-Getter.
     * @param {boolean} icon - True, if it is icon (Default: false)
     * @returns {string} Complete url.
     */
    static url(file, icon = false) {
        const host = location.hostname;
        const port = location.port;
        const liveServer = port == '8080';
        const local = host == 'localhost' || host == '127.0.0.1';
        const daServer = host.endsWith('developerakademie.net');
        const flaskPrefix = '/projects/sharkie/'
        const prefix = local
            ? (liveServer ? '/' : flaskPrefix)
            : (daServer ? '/sharkie/' : flaskPrefix);
        const base = 'assets/' + (icon ? 'icons/' : 'img/');
        return prefix + base + file;
    }

    /**
     * Gets urls form files.
     * @param {string[]} files - Files for urls
     * @returns {string[]} Array of paths.
     */
    static urls(files) {
        return files.map(file => ImgHelper.url(file));
    }
}