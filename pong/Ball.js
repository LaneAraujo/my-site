class Ball {
    constructor(x,y,vx,vy,r) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = r;
    }
    
    draw() {
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.linewidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
    
    bounceWall() {
        //top wall
        if (this.y < this.r) {
            this.vy = Math.abs(this.vy);
            console.log(this.vy);
        }
        //bottom wall
        if (this.y > BOARDHEIGHT - this.r) {
            this.vy = -1 * Math.abs(this.vy);
            console.log(this.vy);
        }
    }
    
    bouncePaddleL(paddle) {
        //NOT BOUNCING OFF PADDLE   
        if (this.x - this.r > paddle.w) return false;
        //BALL HIGHER THAN PADDLE
        if (this.y < paddle.y) return true;
        //BALL LOWER THAN PADDLE
        if (this.y > paddle.y + paddle.l) return true;
        
        //BALL HIT PADDLE
        this.vx = PADDLEFORCE * Math.abs(this.vx);
        let paddlePos= (this.y - paddle.y - paddle.l/2) / paddle.l * 2; // between -1.0 and 1.0
        this.vy = this.vy; + paddlePos*PADDLESPIN;
        
        return false;
    }
    
    bouncePaddleR(paddle) {
        //NOT BOUNCING OFF PADDLE   
        if (this.x + this.r < paddle.x) return false;
        //BALL HIGHER THAN PADDLE
        if (this.y < paddle.y) return true;
        //BALL LOWER THAN PADDLE
        if (this.y > paddle.y + paddle.l) return true;
        
        //BALL HIT PADDLE
        this.vx = -PADDLEFORCE * Math.abs(this.vx);
        let paddlePos= (ball.y - paddle.y - paddle.l/2) / paddle.l * 2; // between -1.0 and 1.0
        this.vy = this.vy; +paddlePos*PADDLESPIN;
        
        return false;
        
    }
    
    move() {
        this.x += this.vx;
        this.y += this.vy;
    }
}