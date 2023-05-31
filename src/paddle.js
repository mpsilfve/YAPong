import * as constants from "./constants.js";
import * as utils from "./utils.js";
Object.assign(window, constants);
Object.assign(window, utils);

export class Paddle {
    reset(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.dir = NODIR;
    }
    draw(ctx) 
    { ctx.strokeRect(this.x, this.y, this.width, this.height); }
    updateDir(ball) {}
    move() {
        this.y += this.dir * PADDLEV;
        this.y = restrictY(PADDLEMARGIN, PADDLEMARGIN+PADDLEHEIGHT, this.y);
    }
    collide(x, y, vx, vy) {
      /* 
         Slightly crazy update rule for the velocity of the ball after a 
         collision with a paddle. 
      
         Based on this thread:
         https://gamedev.stackexchange.com/questions/4253/in-pong-how-do-you-calculate-the-balls-direction-when-it-bounces-off-the-paddl

         Essentially, we will completely forget about the original angle of the
         velocity and determine the new angle solely based on where the ball 
         hits the paddle. The closer to the middle, the closer to 0 the new 
         angle of the velocity will be and at maximal displacement, the new 
         angle is MAXANGLE. 
         
         The speed of the ball never changes. 
      */
      let v = (vx**2 + vy**2)**.5;
      let mid = this.y + PADDLEHEIGHT/2 ;
      let angle = MAXANGLE * 2 * (y - mid) / PADDLEHEIGHT; 
      return [Math.sign(x - this.x) * v * Math.cos(angle), 
              v * Math.sin(angle)];
    }
}

export class PlayerPaddle extends Paddle {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        document.addEventListener(
            "keydown",
            (event) => {
		const keyName = event.key;

              if (keyName === "ArrowUp") {
                console.log(`Key press ${keyName}`)
                this.dir = UP;
	        event.preventDefault();
              }
              else if (keyName === "ArrowDown") {
                console.log(`Key press ${keyName}`)
                this.dir = DOWN;
		event.preventDefault();  
              }
            }, false);
        document.addEventListener(
            "keyup",
            (event) => { 
              const keyName = event.key;
              if (keyName === "ArrowUp" || keyName === "ArrowDown") {
                console.log(`Key up ${keyName}`); 
                this.dir = NODIR; 
              }
            }, false);
    }
}

export class OSPaddle extends Paddle {
    updateDir(ball) {
      let mid = this.y + PADDLEHEIGHT/2;
      let dist = Math.abs(mid - ball.y)
      if (dist > OSPADDLETH) {  
        if (mid > ball.y)
          this.dir = UP;
        else
          this.dir = DOWN;
      }
      else
        this.dir = NODIR;
    }
}
