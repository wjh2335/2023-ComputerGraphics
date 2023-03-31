// 23-03-31
/*
  snake ver.1 
  1) game over
  2) restart
*/

//Delcare Global Variables
let s;
let scl = 20;
let food;
let isGameOver = false;
playfield = 600;

// p5js Setup function - required
function setup() {
  createCanvas(playfield, 640);
  background(51);
  s = new Snake();
  frameRate(10);
  pickLocation();
}

// p5js Draw function - required
function draw() {
  background(51);
  scoreboard();
  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  if (isGameOver) {
    fill(255);
    textSize(50);
    textAlign(CENTER);
    textFont("Georgia");
    text("GAME OVER!", width / 2, height / 2);
    textSize(20);
    fill(0, 255, 20);
    text("Press spacebar to restart!!!", width / 2, height / 2 + 40);
    return;
  }
  s.update();
  s.show();
  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
  // scoreboard();
}

// Pick a location for food to appear
function pickLocation() {
  let cols = floor(playfield / scl);
  let rows = floor(playfield / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);

  // Check the food isn't appearing inside the tail
  for (let i = 0; i < s.tail.length; i++) {
    let pos = s.tail[i];
    let d = dist(food.x, food.y, pos.x, pos.y);
    if (d < 1) {
      pickLocation();
    }
  }
}

// scoreboard
function scoreboard() {
  fill(0);
  rect(0, 600, 600, 40);
  fill(255);
  textFont("Georgia");
  textSize(18);
  textAlign(LEFT);
  text("Score: ", 10, 625);
  text("Highscore: ", 450, 625);
  text(s.score, 70, 625);
  text(s.highscore, 540, 625);
}

// CONTROLS function

function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  } else if (keyCode === 32 && isGameOver) {
    //스페이스바를 누르면 게임 다시 시작
    isGameOver = false;
    s = new Snake();
    pickLocation();
  }
}

// SNAKE OBJECT
function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  this.score = 1;
  this.highscore = 1;

  this.dir = function (x, y) {
    this.xspeed = x;
    this.yspeed = y;
  };

  this.eat = function (pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      this.score++;
      text(this.score, 70, 625);
      if (this.score > this.highscore) {
        this.highscore = this.score;
      }
      text(this.highscore, 540, 625);
      return true;
    } else {
      return false;
    }
  };

  this.death = function () {
    for (let i = 0; i < this.tail.length; i++) {
      let pos = this.tail[i];
      let d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.total = 0;
        this.score = 0;
        this.tail = [];
        isGameOver = true;
      }
    }
  };

  this.update = function () {
    if (this.total === this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, playfield - scl);
    this.y = constrain(this.y, 0, playfield - scl);
  };
  this.show = function () {
    fill(255);
    for (let i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }

    rect(this.x, this.y, scl, scl);
  };
}
