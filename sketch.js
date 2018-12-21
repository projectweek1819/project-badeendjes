//pong clone
//mouse to control both paddles

var MAX_SPEED = 20;
var speed=10;
var paddleA;
var paddleB;
var ball;
var wallTop;
var wallBottom;
var score1= 0;
var score2= 0;
var img1;
var img2;
var img3;
var keyLeft = 200;
var keyRight = 200;
var pauze = false;
var level = 1;
function preload() {
    img1 = loadImage('images/round.png');
    img2 = loadImage('images/round2.png');
    img3 = loadImage('images/round3.png');
}
function setup() {
    createCanvas(800, 400);
    //frameRate(6);

    paddleA = createSprite(30, height/2, 10, 100);
    paddleA.immovable = true;

    paddleB = createSprite(width-28, height/2, 10, 100);
    paddleB.immovable = true;

    wallTop = createSprite(width/2, -30/2, width, 30);
    wallTop.immovable = true;

    wallBottom = createSprite(width/2, height+30/2, width, 30);
    wallBottom.immovable = true;

    ball = createSprite(width/2, height/2, 10, 10);
    ball.addImage(img1);
    ball.scale=0.15;
    ball.maxSpeed = MAX_SPEED;


    paddleA.shapeColor =color(254, 127, 45);
    paddleB.shapeColor = color(252, 202, 70);

    ball.setSpeed(speed, -180);

    /*keys*/
}

function draw() {
    background(35,61,77);

    paddleA.position.y = constrain(keyLeft, paddleA.height/2, height-paddleA.height/2);
    paddleB.position.y = constrain(keyRight, paddleA.height/2, height-paddleA.height/2);

    ball.bounce(wallTop);
    ball.bounce(wallBottom);


    var swing;
    if(ball.bounce(paddleA)) {
        swing = (ball.position.y-paddleA.position.y)/3;
        ball.setSpeed(speed, ball.getDirection()+swing);

    }

    if(ball.bounce(paddleB)) {
        swing = (ball.position.y-paddleB.position.y)/3;
        ball.setSpeed(speed, ball.getDirection()-swing);

    }

    if(ball.position.x<0) {
        ball.position.x = width/2;
        ball.position.y = height/2;
        ball.setSpeed(0 , 0);
        score2++;
    }

    if(ball.position.x>width) {
        ball.position.x = width/2;
        ball.position.y = height/2;
        ball.setSpeed(0, 180);
        score1++;

    }
    drawSprites();

//punten spelers

    fill(161,193,129);
    textSize(24);
    text(score1, 100, 350);

    fill(87,156,135);
    textSize(24);
    text(score2, 600, 350);

    // levels
    fill(80, 150, 130);
    textSize(20);
    text("Level: " , 350, 50);

    fill(80, 150, 130);
    textSize(24);
    text(level, 410, 50);

    if(pauze === false){
        fill(252,202,70);
        textSize(14);
        text("Level 1= '1'   Level 2= '2'    Level 3= '3'    Pauze= 'p'", 220, 380);
    }
    if (pauze === true){
        fill(252,202,70);
        textSize(14);
        text("Play= 'SPACE'", 350, 380);
        textSize(30);
        text("Game Paused", 300,200);
    }


    if(score1 > score2+1 && score1 >=5){
        textSize(30);
        text("Speler 1 heeft gewonnen!", 260,150);
    }
    if(score2 > score1+1 && score2 >=5){
        textSize(30);
        text("Speler 2 heeft gewonnen!", 260,150);
    }

    var balRichting;
    balRichting = ball.getDirection();

    if(keyIsDown(UP_ARROW)){
        keyRight-=5;
    }
    if(keyIsDown(DOWN_ARROW)){
        keyRight+=5;
    }
    if(keyIsDown(90)){
        keyLeft-=5;
    }
    if(keyIsDown(83)){
        keyLeft+=5;
    }
}
function keyPressed() {
    if (keyCode === 80) {
        balRichting = ball.getDirection();
        ball.setSpeed(0, 0);
        pauze = true;
    }
    if(keyCode === 32){
        ball.setSpeed(speed,balRichting);
        pauze = false;
    }
    if (keyCode===50){
        level = 2;
        speed = 13;
        ball.addImage(img2);
        ball.scale=0.1;
    }
    if (keyCode===49){
        level = 1;
        speed = 10;
        ball.addImage(img1);
        ball.scale=0.15;

    }
    if (keyCode===51){
        level = "max";
        speed = MAX_SPEED;
        ball.addImage(img3);
        ball.scale=0.05;
    }
}

