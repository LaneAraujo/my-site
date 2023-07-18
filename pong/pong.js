const gameboard = document.getElementById("gameboard");
const ctx = gameboard.getContext("2d");



const PADDLESPIN = 1.5; // >= 0.0
const PADDLEFORCE = 1.1; // >= 1.0

let ball;
let paddleL;
let paddleR;
let scoreL=0;
let scoreR=0;
let BOARDHEIGHT = 500;
let BOARDWIDTH = 2000;
var x = document.getElementById("myAudio"); 

function clearBoard () {
    ctx.fillStyle= "black";
    ctx.fillRect(0, 0, BOARDWIDTH, BOARDHEIGHT);
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
    x.play();
}

function resetGame() {
    clearInterval(intervalID);
    resetObjects();
    scoreL=0;
    scoreR=0;
    updateScore();
    nextTick();
}

function removeWidth() {
    ctx.fillStyle= "white";
    ctx.fillRect(0, 0, BOARDWIDTH, BOARDHEIGHT);
    BOARDWIDTH = BOARDWIDTH - 100;
    console.log(BOARDWIDTH);
    clearBoard();
    resetGame();
}

function addWidth() {
    ctx.fillStyle= "white";
    ctx.fillRect(0, 0, BOARDWIDTH, BOARDHEIGHT);
    BOARDWIDTH = BOARDWIDTH + 100;
    console.log(BOARDWIDTH);
    clearBoard();
    resetGame();
    ctx.fillStyle= "black";
    ctx.fillRect(0, 0, BOARDWIDTH, BOARDHEIGHT);
}


const UPARROW = 38; 
const DOWNARROW = 40;   
const WKEY = 87;
const SKEY = 83;
const PADDLEVELEOCITY = 5;

window.addEventListener("keydown", keyDown);  

function resetObjects() {
    ball = new Ball(BOARDWIDTH/2, 250, 1, 1, 12.5);
    paddleL = new Paddle(0, 0, 100, 25, "white");
    paddleR = new Paddle(BOARDWIDTH-25.5, 0, 100, 25, "white");
    x.pause(); 
}

function keyDown(event){
    const key = event.keyCode;
    console.log('KEYDOWN: ${key}');  
    switch(key) {
        case (UPARROW):
            paddleR.vy = -PADDLEVELEOCITY;
            break;  
        case (DOWNARROW):  
            paddleR.vy = PADDLEVELEOCITY;
            break;  
        case (WKEY):
            paddleL.vy = -PADDLEVELEOCITY;
            break;
        case (SKEY):
            paddleL.vy = PADDLEVELEOCITY;
            break;
    }        
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