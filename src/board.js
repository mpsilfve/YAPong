import * as constants from "./constants.js";
import * as utils from "./utils.js";
import * as paddle from "./paddle.js"
import * as ball from "./ball.js"
Object.assign(window, constants);
Object.assign(window, utils);
Object.assign(window, paddle);
Object.assign(window, ball);

export class Board {
    constructor(ctx) {
        this.started = false;
        this.playerScore = 0;
        this.osScore = 0;
        this.ctx = ctx;
        this.playerPaddle = new PlayerPaddle();
        this.osPaddle = new OSPaddle();
        this.ball = new Ball();
        this.reset();
        this.configCtx();
        this.draw();

        canvas.addEventListener(
            "click",
            (event) => {
                console.log("Start game");
                this.start();
            }, false);
    }
    reset() {
        this.playerPaddle.reset(PADDLEWIDTH,
                                CenteredY(PADDLEHEIGHT),
                                PADDLEWIDTH,
                                PADDLEHEIGHT);
        this.osPaddle.reset(screenwidth - 2 * PADDLEWIDTH,
                            CenteredY(PADDLEHEIGHT),
                            PADDLEWIDTH,
                            PADDLEHEIGHT);
        this.ball.reset(CenteredX(BALLSIZE), CenteredY(BALLSIZE),BALLSIZE);
        this.displayScore();
    }
    displayScore() {
	    let pscore = this.playerScore.toString().padStart(2,"0");
	    let osscore = this.osScore.toString().padStart(2,"0");
        pPlayerScore.innerHTML = `player ${pscore}`;
        pOSScore.innerHTML = `computer ${osscore}`;
	    console.log(pscore +" "+ osscore);
    }
    configCtx() {
        this.ctx.fillStyle = BOARDCOLOR;
        this.ctx.lineWidth = STROKEWIDTH;
        this.ctx.shadowBlur = SHADOWBLUR;
        this.ctx.shadowColor = SHADOWCOLOR;
        this.ctx.strokeStyle = STROKECOLOR;
    }
    draw() {
        this.ctx.fillRect(0,0,screenwidth,screenheight);
        for (let i=0;i<SHADOWITER;i++) {
            this.playerPaddle.draw(this.ctx);
            this.osPaddle.draw(this.ctx);
            if (this.started)
                this.ball.draw(this.ctx);
        }
    }
    gameLoop(timeStamp){
        // Move all objects and draw on canvas.
        this.playerPaddle.updateDir(this.ball);
        this.osPaddle.updateDir(this.ball);
        this.playerPaddle.move(this.ball);
        this.osPaddle.move(this.ball);
        switch (this.ball.move(screenwidth, 
                               screenheight, 
                               [this.playerPaddle, this.osPaddle])) {
            case PLAYERSCORE:
                this.playerScore += 1;
                this.reset();
                break;
            case OSSCORE:
                this.osScore += 1;
                this.reset();
                break;
        }
        this.draw();
        // Keep requesting new frames.
        window.requestAnimationFrame(this.gameLoop.bind(this));
    }
    start() {
        if (!this.started) {
            this.started = true;
            window.requestAnimationFrame(this.gameLoop.bind(this));
        } 
    }
}
