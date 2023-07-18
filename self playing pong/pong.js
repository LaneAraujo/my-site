const gameboard = document.getElementById("gameboard");
const ctx = gameboard.getContext("2d");

const BOARDHEIGHT = 500;
const BOARDWIDTH = 500;
const PADDLESPIN = 1.5; // >= 0.0
const PADDLEFORCE = 1.1; // >= 1.0

let ball;
let paddleL;
let paddleR;
let scoreL=0;
let scoreR=0;

function clearBoard () {
    ctx.fillStyle= "grey";
    ctx.fillRect(0, 0, 500, 500);
}

function updateScore() {
    const scoreboard = document.getElementById("scoreboard");
    scoreboard.innerHTML = `${scoreL} : ${scoreR}`;
} 

function draw() {
    clearBoard();
    paddleL.draw();
    paddleR.draw();
    ball.draw();
}

let intervalID;

function nextTick() {
    intervalID = setTimeout(
        () => {
            paddleL.move();
            paddleR.move();
            if (ball.bouncePaddleL(paddleL)) score("right");;        
            if (ball.bouncePaddleR(paddleR)) score("left");;

            ball.bounceWall();
            ball.move();

            draw();
            nextTick();
        }, 10
    );
}
function score(player){
    if (player == "left") scoreL++;
    if (player == "right") scoreR++;

    ball = new Ball(250, 250, 1, -1, 12.5);
    updateScore();
}

function resetGame() {
    clearInterval(intervalID);
    resetObjects();
    scoreL=0;
    scoreR=0;
    updateScore();
    nextTick();
}

const UPARROW = 38; 
const DOWNARROW = 40;   
const WKEY = 87;
const SKEY = 83;
const PADDLEVELEOCITY = 5;

window.addEventListener("keydown", keyDown);  
function resetObjects() {
    ball = new Ball(250, 250, 1, 1, 12.5);
    paddleL = new Paddle(0, 0, 100, 25, "red");
    paddleR = new Paddle(475, 0, 100, 25, "blue");
}

function paddlemove() {
    //paddleL move up
    if (ball.y < paddleL.y) paddleL.vy = -PADDLEVELEOCITY;
    //paddleL move down
    if (ball.y > paddleL.y) paddleL.vy = PADDLEVELEOCITY;
    //paddleR move up
    if (ball.y < paddleR.y) paddleR.vy = -PADDLEVELEOCITY;
    //paddleR move down
    if (ball.y > paddleR.y) paddleR.vy = PADDLEVELEOCITY;
}




    window.addEventListener("keyup", keyUp);  
    function keyUp(event){
        const key = event.keyCode;
        console.log('KEYUP: ${key}');  
        switch(key) {
            case (UPARROW):
            case (DOWNARROW):  
                paddleR.vy = 0;
                break;  
             case (WKEY):
             case (SKEY):
                paddleL.vy = 0;
                break;
        }  
}