var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var sound = document.getElementById('sound');

var isGameOver = false;
var isGameWin = false;
var score = 0;
var weapons = 5;
var isStarted = true;
var gameColor = ['red', 'yellow', 'blue', 'green', 'violet', 'orange'];

var bullet = {
    side: 30,
    r: 15,
    x: canvas.width - 30 + 15,
    y: canvas.height - 30 + 15,
    s: 2,
    color: gameColor[Math.floor(Math.random() * gameColor.length)],
}

//Bricks 2*offset + col*bricks.side + (col-1)*margin
var bricks = {
    side: 30,
    col: 7,
    row: 15,
    offset: 0,
    margin: 0,
};
var maxScore = bricks.col * bricks.row;

var brickList = [];
setUpBrickList(brickList);
function setUpBrickList(list){
    for (var i = 0; i < bricks.row; i++) {
        for (var j = 0; j < bricks.col; j++) {
            brickList.push({
                x: j * (bricks.side + bricks.margin) + bricks.offset,
                y: i * (bricks.side + bricks.margin) + bricks.offset + 50,
                isBroken: false,
                color: gameColor[Math.floor(Math.random() * gameColor.length)]
            });
        }
    }
}

function drawBricks() {
    brickList.forEach(function (yam) {
        if (!yam.isBroken) {
            context.beginPath();
            context.rect(yam.x, yam.y, bricks.side, bricks.side);
            context.stroke();
            context.fillStyle = yam.color;
            context.fill();
            context.closePath();
        }
    });
}

function drawBullet() {
    context.beginPath();
    context.arc(bullet.x, bullet.y, bullet.r, 0, Math.PI * 2);
    // context.rect(bullet.x, bullet.y, bullet.side, bullet.side);
    context.stroke();
    context.fillStyle = bullet.color;
    context.fill();
    context.closePath();
}

document.addEventListener("keyup", function (event) {
    if (event.key == "ArrowUp") {
        clearSomething();
        bullet.y -= 30;
        drawBullet();
    } else if (event.key == "ArrowDown") {
        clearSomething();
        bullet.y += 30;
        drawBullet();
    }
    if (event.key == "ArrowLeft") {
        clearSomething();
        // the bullet will be shooted leftward to the brick
            // if they are the same color, the bullet will break the series of same color brick.
            // if they are not the same color, the bullet will be stuck the the brick wall
        drawBullet();
    } else if (event.key == "ArrowRight") {
        clearSomething();
        bullet.color = gameColor[Math.floor(Math.random() * gameColor.length)];
        weapons--;
        drawBullet();
    }
})

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function clearSomething(){
    context.clearRect(211, 49, canvas.width, canvas.height);
}

function drawScore() {
    context.beginPath();
    context.font = "30px Comic Sans MS";
    context.fillStyle = 'black';
    context.fillText("Score: " + score, 10, 30);
    context.fillText("Weapons: " + weapons, 210, 30);
    context.closePath();
}

function drawIntroduction() {
    if (isStarted && weapons == 5) {
        context.beginPath();
        context.font = "20px Comic Sans MS";
        context.fillStyle = 'black';
        // context.fillText("to control the bullet!", 35, 250);
        context.fillText("Made by Yam and Nam", 170, 50);
        context.closePath();
    }
}

function draw() {
    if (!isGameOver && !isGameWin) {
        clearCanvas();
        drawBullet();
        drawBricks();
        drawScore();
        drawIntroduction();
        moveBullet();
        requestAnimationFrame(draw);
    }
}

draw();