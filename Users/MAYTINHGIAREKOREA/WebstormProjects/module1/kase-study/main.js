let canvas = document.getElementById('myGame');
let context = canvas.getContext('2d');
let scoreShow = document.getElementById("score");
let birdImg = new Image();
let display = new Image();
let columnUp = new Image();
let columnDown = new Image();
birdImg.src = "bird.png";
display.src = "nenchinh.png";
columnDown.src = "ongduoi.png";
columnUp.src = "ongtren.png";
let score = 0;
let distanceColumn = 140;
let distance;
let bird = {
    x: display.width / 5,
    y: display.height / 2
}
let pillar = [];
pillar[0] = {
    x: canvas.width,
    y: 0
}

function start() {
    context.drawImage(display, 0, 0);
    context.drawImage(birdImg, bird.x, bird.y);
    for (let i = 0; i < pillar.length; i++) {
        distance = columnUp.height + distanceColumn;
        context.drawImage(columnUp, pillar[i].x, pillar[i].y);
        context.drawImage(columnDown, pillar[i].x, pillar[i].y + distance);
        pillar[i].x -= 5; // để ống có thể di chuyển
        if (pillar[i].x === canvas.width / 2) {
            pillar.push({
                x: canvas.width,
                y: Math.floor(Math.random() * columnUp.height) - columnUp.height
            })
        }
        if (pillar[i].x === 0) {
            pillar.splice(0, 1)
        }
        if (pillar[i].x === bird.x)
            score += 1;
        if (bird.y + birdImg.height === canvas.height ||
            bird.x + birdImg.width >= pillar[i].x && bird.x <= pillar[i].x + columnUp.width
            && (bird.y <= pillar[i].y + columnUp.height ||
                bird.y + birdImg.height >= pillar[i].y + distance)
        ) {
            return;
        }

    }
    scoreShow.innerHTML = "score: " + score;
    bird.y += 2;
    requestAnimationFrame(start)
}

document.addEventListener("keydown", function () {
    bird.y -= 60;
})

start();