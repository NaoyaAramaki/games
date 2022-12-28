// // canvas要素への参照を保存するための変数
// var canvas = document.getElementById("myCanvas");
// // 2Dコンテキストを保存するための変数
// var ctx = canvas.getContext("2d");

// // 赤い四角形をキャンバス上に表示する
// // （すべてのメソッドはbeginPath ~ closePath間に記述）
// ctx.beginPath();
// // 四角形を定義
// // （最初の二つの要素で左上の角の座標を指定。後ろ二つで幅と高さを指定）
// ctx.rect(20, 40, 50, 50);
// // fillメソッドで用いられる色
// ctx.fillStyle = "#f00";
// ctx.fill();
// ctx.closePath();

// // 緑色の円をキャンバス上に表示する
// ctx.beginPath();
// // arc(円中心のx,y座標,円の半径,開始角度,終了角度,描く方向(時計回りはfalse))
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// // 図形を描画後,縁だけ色を付ける
// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
// ctx.stroke();
// ctx.closePath();



// var canvas = document.getElementById("myCanvas");
// var ctx = canvas.getContext("2d");

// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
// ctx.stroke();
// ctx.closePath();

// // 開始位置を中央下端として定義
// let x = canvas.width / 2;
// let y = canvas.hight - 30;

// // ボールに動きをつける
// let dx = 2;
// let dy = -2;

// function draw() {
//     // ボールを描画
//     ctx.beginPath()
//     ctx.arc(x, y, 10, 0, Math.PI*2);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
//     x += dx;
//     y += dy;
// }

// setInterval(draw, 10);



onload = function() {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    // Difine Ball
    const ballRadius = 5; // Ball Size
    let dx = 1;           // Ball Speed 横方向
    let dy = -1;          // Ball Speed 縦方向
    // Difine Paddle
    const paddleHeight = 5;
    const paddleWidth = 75;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let rightPressed = false;
    let leftPressed = false;
    const brickRowCount = 3;
    const brickColumnCount = 6;
    const brickWidth = 35;
    const brickHeight = 10;
    const brickPadding = 10;
    const brickOffsetTop = 15;
    const brickOffsetLeft = 20;
    const bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1};
        }
    }

    let score = 0;
    let lives = 3;

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    this.document.addEventListener("mousemove", mouseMoveHandler, false);

    function keyDownHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = true;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = false;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            leftPressed = false;
        }
    }

    function mouseMoveHandler(e) {
        const relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }

    function collisionDetection() {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                const b = bricks[c][r];
                if (b.status === 1) {
                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if (score === brickRowCount * brickColumnCount) {
                            alert("You Win, Congratulations!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }

    function drawScore() {
        ctx.fot = "10px Arial";
        ctx.fillStyle - "#0095DD";
        ctx.fillText(`Score: ${score}`, 5, 11);
    }

    function drawLives() {
        ctx.font = "10px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText(`Lives: ${lives}`, canvas.width - 50, 11);
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095dd";
        ctx.fill();
        ctx.closePath();
    }

    function drawBricks() {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                if ( bricks[c][r].status === 1) {
                    const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#0095dd";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095dd";
        ctx.fill();
        ctx.closePath();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();
        drawBricks();
        collisionDetection();
        drawScore();
        drawLives();

        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }

        if (y + dy < ballRadius) {
            dy = -dy;
        } else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            } else {
                lives--;
                if (!lives) {
                    alert("GAME OVER");
                    document.location.reload();
                } else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = 2;
                    dy = -2;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }
            }
        }

        if (rightPressed) {
            paddleX =Math.min(paddleX + 7, canvas.width - paddleWidth);
        } else if (leftPressed) {
            paddleX = Math.max(paddleX - 7, 0);
        }

        x += dx;
        y += dy;
        requestAnimationFrame(draw);
    }

    draw();
}