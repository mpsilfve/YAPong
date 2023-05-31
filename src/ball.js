import * as constants from "./constants.js";
import * as utils from "./utils.js";
Object.assign(window, constants);
Object.assign(window, utils);

export class Ball {
    reset(x,y,size) {
        this.x = x;
        this.y = y;
        this.width = size;
        this.height = size
        this.vx = -BALLV * Math.cos(INITANGLE);
        this.vy = BALLV * Math.sin(INITANGLE);        
    }
    draw(ctx) {
        ctx.fillStyle = BALLCOLOR;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = BOARDCOLOR;
    }
    move(screenwidth, screenheight, paddles) {
        this.x += this.vx;
        this.y += this.vy;

        // Check collisions with the walls of the board.
        if (this.x <= 0 || this.x >= screenwidth-this.width) {
            console.log(`${HORIZONTAL} wall collision`); 
            missSound.play();
            return (this.x <= 0 && OSSCORE) || PLAYERSCORE; 
        }
        if (this.y <= 0 || this.y >= screenheight-this.height) { 
            console.log(`${VERTICAL} wall collision`);
            this.vy *= -1;
            pongSound.play(); 
        }
        // Check collisions with paddles.
        for (let i=0; i<paddles.length; i++) {
            let paddle = paddles[i];
            const collType = collision(this,paddle);
            switch (collType) {
                case VERTICAL:
                    this.vy *= -1;
                    break;
                case HORIZONTAL:
                    [this.vx, this.vy] = paddle.collide(this.x, 
                                                        this.y, 
                                                        this.vx,
                                                        this.vy);
                    break;
                case SINGULAR:
                    this.vx *= -1;
                    this.vy *= -1;
                    break;
                default:
                    // Skip to next paddle.
                    continue;
            }
            console.log(`${collType} paddle collision`);
            pongSound.play();   
        }
        this.x = restrictX(0,this.width,this.x);
        this.y = restrictY(0,this.height,this.y);
        return NOSCORE;
    }
}