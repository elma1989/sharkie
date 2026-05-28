import { Canvas } from "../ui/canvas.js";
import { DrawableObject } from "./drawable-object.js";

export class Barrier extends DrawableObject {
    
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }
}