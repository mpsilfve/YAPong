import * as constants from "./constants.js";
Object.assign(window, constants);

// Functions for setting coordinates
export const CenteredX = (width) => (screenwidth - width)/2;
export const CenteredY = (height) => (screenheight - height)/2;
export const restrictX = (minMargin, maxMargin, x) => Math.max(minMargin, Math.min(screenwidth-maxMargin, x));
export const restrictY = (minMargin, maxMargin, y) => Math.max(minMargin, Math.min(screenheight-maxMargin, y));

// Return the type of collision between the ball and a paddle.
export function collision(rect1, rect2) {
    let xOverlap = (rect1.x <= rect2.x && rect1.width - (rect2.x - rect1.x)) ||
                   (rect2.x <= rect1.x && rect2.width - (rect1.x - rect2.x)) || 
                   -1;
    let yOverlap = (rect1.y <= rect2.y && rect1.height - (rect2.y - rect1.y)) ||
                   (rect2.y <= rect1.y && rect2.height - (rect1.y - rect2.y)) ||
                   -1;
    if (xOverlap >= 0 && yOverlap >= 0) {
        if (xOverlap < yOverlap) 
            return HORIZONTAL;
        if (xOverlap > yOverlap)
            return VERTICAL; 
        if (xOverlap === yOverlap)
            return SINGULAR;
    }
    return NOCOLLISION; 
}