import { Canvas } from "./canvas.js";
import { ControlsOverlay } from "./overlay-controls.js";
import { HeroOverlay } from "./overlay-hero.js";
import { ImpressumOverlay } from "./overlay-impressum.js";
import { RulesOverlay } from "./overlay-rules.js";

/**
 * @typedef {Object} ButtonMap
 * @property {Object} main - Collection main control buttons.
 * @property {Object} close - Collection for close overlay buttons.
 * @property {Object} snd - Collection for sound control buttons.
 * @property {Object} mobctrl - Collection for mobile control buttons.
 */

/**
 * @typedef {Object} OvelrayMap
 * @property {HeroOverlay} hero - Overlay for title screen.
 * @property {ControlsOverlay} ctrl - Overlay for show the controls.
 * @property {RulesOverlay} rules - Overlay for show game rules.
 * @property {ImpressumOverlay} inprint - Overlay for show impressum.
 * @property {LandscapeOverlay} landscape - Overlay for device on portrait.
 */

/** Manage total user interface. */
export class UI {
    /**
     * Canvas for drwawijng
     * @type {Canvas}
     */
    #canvas;
    /**
     * Elements which includes mobile control buttons.
     * @type {NodeListOf<Element>}
     */
    #mobControlAreas;
    /**
     * Collection of all buttons.
     * @type {ButtonMap}
     */
    #btns;
    /**
     * Colleecion of all overlays
     * @type {OvelrayMap}
     */
    #overlays;
    /**
     * Element, which includes sound control buttons.
     * @type {Element?}
     */
    #sndCtrl;
    /**
     * Flag for running game.
     * @type {boolean}
     */
    #running = false;
    /**
     * Timer in ms after resize-event for time out.
     * @type {number}
     */
    #resizeTimer = 0;

    constructor() {
        this.#canvas = new Canvas();
        this.#mobControlAreas = document.querySelectorAll('.mob-ctrl');
        this.#btns = this.createButtons();
        this.#overlays = this.createOverlays();
        this.#sndCtrl = document.querySelector('.snd-ctrl');
        this.checkPortait();
        this.addEvents();
    }

    get canvas() { return this.#canvas; }

    get btns() {return this.#btns; }

    get overlays() { return this.#overlays; }

    /**
     * Creates a collection for all buttons.
     * @returns {ButtonMap} Map of buttons.
     */
    createButtons() {
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
            },
            mobctrl: {
                left: document.getElementById('btn-mobctrl-left'),
                right: document.getElementById('btn-mobctrl-right'),
                up: document.getElementById('btn-mobctrl-up'),
                down: document.getElementById('btn-mobctrl-down'),
                attackBubble: document.getElementById('btn-mobctrl-bubble'),
                attackSlap: document.getElementById('btn-mobctrl-slap')
            }
        }
    }

    /**
     * Creates a collesct of all overlays.
     * @returns {OvelrayMap} Map with overlays.
     */
    createOverlays() {
        return {
            hero: document.querySelector('overlay-hero'),
            ctrl: document.querySelector('overlay-controls'),
            rules: document.querySelector('overlay-rules'),
            inprint: document.querySelector('overlay-inprint'),
            landscape: document.querySelector('overlay-landscape')
        }
    }

    // #region Button-Control
    /**
     * Renames the run button.
     * @param {string} name - new name for Run-Button.
     */
    setRunButtonName(name) {
        this.btns.main.run.innerText = name;
    }

    /**
     * Sets sound button state.
     * @param {string} group - Name of button-group.
     * @param {'music' | 'sfx'} name - Music or Sfx for button name.
     * @param {boolean} state - True for on and false for off.
     */
    setButton(group, name, state) {
        const images = this.btns[group][name].children;
        images[0].classList.toggle('d-none', state);
        images[1].classList.toggle('d-none', !state);
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

    /** Shows the mobile control buttons. */
    showMobCtrlButtons() {
        this.#mobControlAreas.forEach(mobctrl => mobctrl.classList.remove('d-none'));
    }

    /** Hides the mobile control buttons. */
    hideMobCtrlButtons() {
        this.#mobControlAreas.forEach(mobctrl => mobctrl.classList.add('d-none'));
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
        this.hideMobCtrlButtons();
    }

    /**
     * Closes an overlay.
     * @param {string} name - Name of overlay.
     */
    closeOverlay(name) {
        if (!Object.keys(this.overlays).includes(name)) return;
        this.overlays[name].hide();
        if (name != 'hero' && !this.#running) {
            this.openOverlay('hero');
            this.showMainButtons();
        } else if (name == 'landscape') this.showMobCtrlButtons();
    }

    /** Goes to main page. */
    goToMenue() {
        const btnMenu = this.btns.main.menu;
        this.openOverlay('hero');
        this.showMainButtons();
        btnMenu.classList.add('d-none');
    }

    /**
     * Checkes if user has Portait-Mode.
     * @returns {boolean} True, if user has portait.
     */
    isPortrait() {
        return window.innerWidth / window.innerHeight <= 1;
    }

    /** Opens and closes landscape overlay. */
    checkPortait() {
        if (this.isPortrait()) this.openOverlay('landscape');
        else this.closeOverlay('landscape');
    }
    // #endregion

    // #region Events
    /** Adds events for buttons */
    addButtonEvents() {
        this.btns.main.rules.addEventListener('pointerdown', () => this.openOverlay('rules'));
        this.btns.close.rules.addEventListener('pointerdown', () => this.closeOverlay('rules'));
        this.btns.main.ctrl.addEventListener('pointerdown', () => this.openOverlay('ctrl'));
        this.btns.close.ctrl.addEventListener('pointerdown', () => this.closeOverlay('ctrl'));
        this.btns.main.inprint.addEventListener('pointerdown', () => this.openOverlay('inprint'));
        this.btns.close.inprint.addEventListener('pointerdown', () => this.closeOverlay('inprint'));
        this.btns.main.menu.addEventListener('pointerdown', () => this.goToMenue());
    }

    /** Addds events vor resize. */
    addResizeEvent() {
        window.addEventListener('resize', () => {
            clearTimeout(this.#resizeTimer);
            this.#resizeTimer = setTimeout(() => {
                this.checkPortait();
            }, 700);
        });
    }

    /** Adds all events. */
    addEvents() {
        this.addButtonEvents();
        this.addResizeEvent();
    }
}