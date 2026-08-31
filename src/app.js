import { Game } from "./classes/game.js";
import './classes/ui/overlay-hero.js';
import './classes/ui/overlay-loading.js';
import './classes/ui/overlay-controls.js';
import './classes/ui/overlay-rules.js';
import './classes/ui/overlay-impressum.js';
import './classes/ui/overlay-landscape.js';

let game = new Game();
game.init();