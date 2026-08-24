import { Canvas } from "./canvas.js";

export class UI {
    #canvas;
    #mobControlAreas;
    #btns;
    #overlays;
    #sndCtrl;
    #running = false;
    #resizeTimer;

    constructor() {
        this.#canvas = new Canvas();
        this.#mobControlAreas = document.querySelectorAll('.mob-ctrl');
        this.#btns = this.#createButtons();
        this.#overlays = this.#createOverlays();
        this.#sndCtrl = document.querySelector('.snd-ctrl');
        this.#checkPortait();
        this.#addEvents();
    }

    get canvas() { return this.#canvas; }

    get btns() {return this.#btns; }

    get overlays() { return this.#overlays; }

    #createButtons() {
        return {
            main: {
                rules: document.getElementById('btn-rules'),
                run: document.getElementById('btn-run'),
                ctrl: document.getElementById('btn-controls'),
                inprint: document.getElementById('btn-inprint'),
                menu: document.getElementById('btn-menu')
            },
            close: {
                rules: document.getElementById('btn-close-rules'),
                ctrl: document.getElementById('btn-close-ctrl'),
                inprint: document.getElementById('btn-close-inprint')
            },
            snd: {
                music: document.getElementById('btn-music'),
                sfx: document.getElementById('btn-sfx')
            }
        }
    }

    #createOverlays() {
        return {
            hero: document.querySelector('overlay-hero'),
            ctrl: document.querySelector('overlay-controls'),
            rules: document.querySelector('overlay-rules'),
            inprint: document.querySelector('overlay-inprint'),
            landscape: document.querySelector('overlay-landscape')
        }
    }

    // #region Button-Control
    /** Enables the run button. */
    enableRunButton(name) {
        const btn = this.btns.main.run;
        btn.classList.remove('waiting');
        btn.disabled = false;
        btn.innerText = name;
    }

    /** Disables run button. */
    disableRunButton() {
        const btn = this.btns.main.run;
        btn.disabled = true;
        btn.classList.add('waiting');
        btn.innerText = 'LOADING';
    }

    /**
     * Sets sound button state.
     * @param {'music' | 'sfx'} name - Music or Sfx for button name.
     * @param {boolean} state - True for on and false for off.
     */
    setSndButton(name, state) {
        const imgaes = this.btns.snd[name].children;
        imgaes[0].classList.toggle('d-none', state);
        imgaes[1].classList.toggle('d-none', !state);
    }



    /** Shows main buttons. */
    showMainButtons() {
        const mainBtns = Object.values(this.btns.main);
        mainBtns.forEach(btn => btn.classList.remove('d-none'));
    }

    /** Hides the main control buttons. */
    hideMainButtons() {
        const mainBtns = Object.values(this.btns.main);
        mainBtns.forEach(btn => btn.classList.add('d-none'));
    }

    /** Show some buttons after the game. */
    showAfterGameButtons() {
        const btnsAfter = [this.btns.main.run, this.btns.main.menu];
        btnsAfter.forEach(btn => btn.classList.remove('d-none'));
    }

    /** Shows sound control butttons. */
    showSndBtns() {
        this.#sndCtrl.classList.remove('d-none');
    }

    /** Hides sound control button. */
    hideSndBtns() {
        this.#sndCtrl.classList.add('d-none');
    }
    // #endregion

    // #region Overlay-Control
    /** Action after start game. */
    start() {
        this.#running = true;
    }

    /** Actions after end game. */
    stop() {
        this.#running = false;
    }

    /**
     * Opens an overlay.
     * @param {string} name - Name of overlay
     */
    openOverlay(name) {
        if (!Object.keys(this.overlays).includes(name)) return;
        this.hideMainButtons();
        Object.entries(this.overlays).forEach(([olName, ol]) => {
            if (olName == name) ol.show();
            else ol.hide();
        });
    }

    /**
     * Closes an overlay.
     * @param {string} name - Name of overlay.
     */
    closeOverlay(name) {
        if (!Object.keys(this.overlays).includes(name)) return;
        this.overlays[name].hide();
        if (name != 'hero' && !this.#running) {
            this.overlays.hero.show();
            this.showMainButtons();
        }
    }

    /** Goes to main page. */
    #goToMenue() {
        const btnMenu = this.btns.main.menu;
        this.openOverlay('hero');
        this.showMainButtons();
        btnMenu.classList.add('d-none');
    }

    /**
     * Checkes if user has Portait-Mode.
     * @returns {boolean}
     */
    #isPortrait() {
        return window.innerWidth / window.innerHeight <= 1;
    }

    /** Opens and closes landscape overlay. */
    #checkPortait() {
        if (this.#isPortrait()) this.openOverlay('landscape');
        else this.closeOverlay('landscape');
    }
    // #endregion

    // #region Events
    /** Adds events for buttons */
    #addButtonEvents() {
        this.btns.main.rules.addEventListener('pointerdown', () => this.openOverlay('rules'));
        this.btns.close.rules.addEventListener('pointerdown', () => this.closeOverlay('rules'));
        this.btns.main.ctrl.addEventListener('pointerdown', () => this.openOverlay('ctrl'));
        this.btns.close.ctrl.addEventListener('pointerdown', () => this.closeOverlay('ctrl'));
        this.btns.main.inprint.addEventListener('pointerdown', () => this.openOverlay('inprint'));
        this.btns.close.inprint.addEventListener('pointerdown', () => this.closeOverlay('inprint'));
        this.btns.main.menu.addEventListener('pointerdown', () => this.#goToMenue());
    }

    /** Addds events vor resize. */
    #addResizeEvent() {
        window.addEventListener('resize', () => {
            clearTimeout(this.#resizeTimer);
            this.#resizeTimer = setTimeout(() => {
                this.#checkPortait();
            }, 700);
        });
    }

    /** Adds all events. */
    #addEvents() {
        this.#addButtonEvents();
        this.#addResizeEvent();
    }
}