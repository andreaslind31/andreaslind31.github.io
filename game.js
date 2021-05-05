"use strict";
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 3;
let dy = -3;
let dxMedium = 5;
let dyMedium = -5;
let dxHard = 7;
let dyHard = -7;
let ballRadius = 8;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let score = 0;
let twoLives = 2;
let oneLife = 1;
let bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
let attached = false;
//bool gällande om darkmode är aktiv. TODO: ändras automatiskt till light mode vid spelets slut som det är nu.

const element = document.getElementById("darkmode");
document.getElementById("startEasy").addEventListener("click", startEasy);
document.getElementById("startMedium").addEventListener("click", startMedium);
document.getElementById("startHard").addEventListener("click", startHard);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.getElementById("darkmode").addEventListener("click", darkMode);
document.getElementById("lightmode").addEventListener("click", lightMode);

window.onload = function()
{
 var txtbox = document.getElementById("darkmode");

 if (window.addEventListener)
 {
  txtbox.addEventListener('change', changeToDarkmode, false);
 }
 else if(window.attachEvent)
 {
  txtbox.attachEvent('onchange', changeToDarkmode);
 }
}

function lightMode() {
    changeToLightmode()
}
function darkMode() {
    changeToDarkmode()
}
function changeToDarkmode() {
    attached = true;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("styles").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "txtfiles/darkmode.txt", true);
    xhttp.send();

}
function changeToLightmode() {
    attached = false;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("styles").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "txtfiles/lightmode.txt", true);
    xhttp.send();

}
function startEasy() {
    drawEasy();
}
function startMedium() {

    drawMedium();
}
function startHard() {

    drawHard();
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}
function drawLives(lives) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}
function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "rgb(82, 54, 12)";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawEasy() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives(twoLives);
    collisionDetection();
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            twoLives--;
            if (!twoLives) {
                alert("GAME OVER at easy difficulty. You got: " + score + " points");
                document.location.reload();
                if (element.getAttribute('listener') !== 'true') {
                    element.addEventListener('click', function (e) {
                        const elementClicked = e.target;
                        elementClicked.setAttribute('listener', 'true');
                        changeToDarkmode();
                    });
                }
            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }
    x += dx;
    y += dy;
    if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
    requestAnimationFrame(drawEasy);
}
function drawMedium() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives(oneLife);
    collisionDetectionMedium();
    ballRadius = 7;
    if (x + dxMedium > canvas.width - ballRadius || x + dxMedium < ballRadius) {
        dxMedium = -dxMedium;
    }
    if (y + dyMedium < ballRadius) {
        dyMedium = -dyMedium;
    } else if (y + dyMedium > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dyMedium = -dyMedium;
        }
        else {
            oneLife--;
            if (!oneLife) {
                alert("GAME OVER at medium difficulty. You got: " + score + " points");
                document.location.reload();
                if (document.getElementById("darkmode").addEventListener("click", darkMode) == true) {
                    changeToDarkmode()
                }
            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dxMedium = 5;
                dyMedium = -5;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }
    x += dxMedium;
    y += dyMedium;
    if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
    requestAnimationFrame(drawMedium);
}
function drawHard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives(oneLife);
    collisionDetectionHard();
    ballRadius = 6;
    if (x + dxHard > canvas.width - ballRadius || x + dxHard < ballRadius) {
        dxHard = -dxHard;
    }
    if (y + dyHard < ballRadius) {
        dyHard = -dyHard;
    } else if (y + dyHard > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dyHard = -dyHard;
        }
        else {
            oneLife--;
            if (!oneLife) {
                alert("GAME OVER at hard difficulty. You got: " + score + " points");
                document.location.reload();
            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dxHard = 7;
                dyHard = -7;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }
    x += dxHard;
    y += dyHard;
    if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
    requestAnimationFrame(drawHard);
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}
function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    paddleWidth = paddleWidth - 2;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("You won! Congrats! Try the more difficult versions. You got: " + score + " points at easy");
                        document.location.reload();
                        if (element.getAttribute('listener') !== 'true') {
                            element.addEventListener('click', function (e) {
                                const elementClicked = e.target;
                                elementClicked.setAttribute('listener', 'true');
                            });
                            changeToDarkmode();
                        }
                    }
                }
            }
        }
    }
}
function collisionDetectionMedium() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dyMedium = -dyMedium;
                    b.status = 0;
                    score++;
                    paddleWidth = paddleWidth - 3;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WON, CONGRATULATIONS! Next up: hard. You got: " + score + " points at medium");
                        document.location.reload();
                        if (element.getAttribute('listener') !== 'true') {
                            element.addEventListener('click', function (e) {
                                const elementClicked = e.target;
                                elementClicked.setAttribute('listener', 'true');
                                changeToDarkmode();
                            });
                        }
                    }
                }
            }
        }
    }
}
function collisionDetectionHard() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dyHard = -dyHard;
                    b.status = 0;
                    score++;
                    paddleWidth = paddleWidth - 3;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("HOOOLY SHIT!! You got some skills! CONGRATULATIONS! You got: " + score + " points at hard");
                        document.location.reload();
                        if (element.getAttribute('listener') !== 'true') {
                            element.addEventListener('click', function (e) {
                                const elementClicked = e.target;
                                elementClicked.setAttribute('listener', 'true');
                                changeToDarkmode();
                            });
                        }
                    }
                }
            }
        }
    }
}

