# [8팀] Snake 게임을 변형하기

## 1. 구성원

|이름|학년|학번|학과|
|---|---|---|---|
|우제현|3학년|20191127|컴퓨터공학과|
|이수용|3학년|20191481|컴퓨터공학과|
|신서영|4학년|20201589|컴퓨터공학과|

## 2. 아이디어

```
1. 최적화하기
  1-1. 시작할 때는 1점인데 죽고 재시작 될 때 0점으로 시작되는 오류 수정하기
  1-2. 180도 회전이 되버려서 바로 죽어버리는 오류 수정하기

2. 편의성 추가
  2-1. 사망 시 게임 종료 화면이 나오게 하기
  2-2. 게임 종료 화면에서 스페이스 바를 누르면 재시작 되게 하기
  
3. 디자인 변경
  3-1. 배경, 먹이, 토끼 등 그래픽을 이미지로 변경한다.
  3-2. 먹이의 색깔을 랜덤으로 하고 해당 먹이를 먹으면 그 색깔로 토끼가 변한다.
```

## 3. 과정

### 3-1. 코드 [링크](https://github.com/wjh2335/2023-ComputerGraphics/blob/main/%5B%ED%8C%80%EA%B3%BC%EC%A0%9C-3%5D/snake4.js)

```js
let s;
let scl = 20;
let food;
let img;
let isGameOver = false;
let foodColor;
let high = 1;
playfield = 600;

function preload()
{
  img = loadImage("https://raw.githubusercontent.com/wjh2335/2023-ComputerGraphics/main/img/17.jpg");
}

function setup()
{
  createCanvas(playfield, 640);
  s = new Snake();
  frameRate(10);
  pickLocation();
}

function draw()
{
  background(img);
  scoreboard();
  
  if(s.eat(food)) pickLocation();
  
  s.death();
  if (isGameOver)
  {
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
 
  //fill(foodColor);
  rabbit(foodColor);
  //rect(food.x, food.y, scl, scl);
}

function pickLocation()
{
  let cols = floor(playfield/scl);
  let rows = floor(playfield/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
  foodColor = color(random(255), random(255), random(255));
  
  for (let i = 0; i < s.tail.length; i++)
  {
    let pos = s.tail[i];
    let d = dist(food.x, food.y, pos.x, pos.y);
    if (d < 1) pickLocation();
  }
} 

function scoreboard()
{
  fill(0);
  rect(0, 600, 600, 40);
  fill(255);
  textFont("Georgia");
  textSize(18);
  textAlign(LEFT);
  text("Score: ", 10, 625);
  text("Highscore: ", 450, 625);
  text(s.score, 70, 625);
  text(high, 540, 625);
}

function keyPressed()
{
  if (keyCode === UP_ARROW && s.xspeed != 0 && s.yspeed != 1) { s.dir(0, -1); }
  else if (keyCode === DOWN_ARROW && s.xspeed != 0 && s.yspeed != -1) { s.dir(0, 1); }
  else if (keyCode === RIGHT_ARROW && s.xspeed != -1 && s.yspeed != 0) { s.dir (1, 0); }
  else if (keyCode === LEFT_ARROW && s.xspeed != 1 && s.yspeed != 0) { s.dir (-1, 0); }
  else if (keyCode === 32 && isGameOver)
  {
    isGameOver = false;
    s = new Snake();
    pickLocation();
  }
}

function Snake()
{
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  this.score = 1;
  this.headColor = color(255);
 
  this.dir = function(x,y)
  {
    this.xspeed = x;
    this.yspeed = y;
  }
 
  this.eat = function(pos)
  {
    let d = dist(this.x, this.y, pos.x, pos.y);
    
    if (d < 1)
    {
      this.total++;
      this.score++;
      text(this.score, 70, 625);
      
      if (this.score > high) high = this.score;
      
      text(high, 540, 625);
      this.headColor = foodColor;
      return true;
    }
    else return false;
  }
 
  this.death = function()
  {
    for (let i = 0; i < this.tail.length; i++)
    {
      let pos = this.tail[i];
      let d = dist(this.x, this.y, pos.x, pos.y);
      
      if (d < 1)
      {
        this.total = 0;
        this.score = 1;
        this.tail = [];
        isGameOver = true;
        this.headColor = color(255);
      }
    }
  }
 
  this.update = function()
  {
    if (this.total === this.tail.length)
    {
      for (let i = 0; i < this.tail.length-1; i++) this.tail[i] = this.tail[i+1];
    }
    this.tail[this.total-1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed*scl;
    this.y = this.y + this.yspeed*scl;
    
    this.x = constrain(this.x, 0, playfield-scl);
    this.y = constrain(this.y, 0, playfield-scl);
  }
  this.show = function()
  {
    fill(this.headColor);
    for (let i = 0; i < this.tail.length; i++)
    {
        //rect(this.tail[i].x, this.tail[i].y, scl, scl);
      push();
    
    if(s.xspeed == 0 && s.yspeed == 1) { translate(this.tail[i].x - 10, this.tail[i].y - 10);  }
    else if(s.xspeed == 0 && s.yspeed == -1) { translate(this.tail[i].x - 10, this.tail[i].y - 10);  }
    else if(s.xspeed == 1 && s.yspeed == 0) { translate(this.tail[i].x - 10, this.tail[i].y - 10);  }
    else if(s.xspeed == -1 && s.yspeed == 0) { translate(this.tail[i].x - 10, this.tail[i].y - 10);  }
    scale(0.1);
    fill(this.headColor);
    strokeWeight(3);
    
    //귀
    push(); //왼쪽 귀
    translate(150, 115);
    rotate(radians(-10));
    ellipse(0, 0, 50, 100);
    pop();
    push(); //오른쪽 귀
    translate(250, 115);
    rotate(radians(10));
    ellipse(0, 0, 50, 100);
    pop();
  
    //귀 내부
    fill(255, 180, 180);
    push(); //왼쪽 귀 내부
    translate(150, 112);
    rotate(radians(-10));
    ellipse(0, 0, 30, 65);
    pop();
    push(); //오른쪽 귀 내부
    translate(250, 112);
    rotate(radians(10));
    ellipse(0, 0, 30, 65);
    pop();
  
    //얼굴
    fill(this.headColor);
    ellipse(200, 200, 180, 170);
  
    //눈
    fill(0);
    ellipse(160, 195, 10, 10); //왼쪽 눈
    ellipse(240, 195, 10, 10); //오른쪽 눈

    //코
    ellipse(200, 210, 15, 15);
  
    //입
    fill(this.headColor);
    line(200, 220, 200, 225); //인중
    arc(190, 225, 20, 20, 0, PI); //왼쪽 입
    arc(210, 225, 20, 20, 0, PI); //오른쪽 입
  
    pop();
    }
    //rect(this.x, this.y, scl, scl);
    
    push();
    
    if(s.xspeed == 0 && s.yspeed == 1) { translate(this.x + 30, this.y + 30); rotate(radians(180)); }
    else if(s.xspeed == 0 && s.yspeed == -1) { translate(this.x - 10, this.y - 10); rotate(radians(0)); }
    else if(s.xspeed == 1 && s.yspeed == 0) { translate(this.x + 30, this.y - 10); rotate(radians(90)); }
    else if(s.xspeed == -1 && s.yspeed == 0) { translate(this.x - 10, this.y + 30); rotate(radians(270)); }
    scale(0.1);
    fill(this.headColor);
    strokeWeight(3);
    
    //귀
    push(); //왼쪽 귀
    translate(150, 115);
    rotate(radians(-10));
    ellipse(0, 0, 50, 100);
    pop();
    push(); //오른쪽 귀
    translate(250, 115);
    rotate(radians(10));
    ellipse(0, 0, 50, 100);
    pop();
  
    //귀 내부
    fill(255, 180, 180);
    push(); //왼쪽 귀 내부
    translate(150, 112);
    rotate(radians(-10));
    ellipse(0, 0, 30, 65);
    pop();
    push(); //오른쪽 귀 내부
    translate(250, 112);
    rotate(radians(10));
    ellipse(0, 0, 30, 65);
    pop();
  
    //얼굴
    fill(this.headColor);
    ellipse(200, 200, 180, 170);
  
    //눈
    fill(0);
    ellipse(160, 195, 10, 10); //왼쪽 눈
    ellipse(240, 195, 10, 10); //오른쪽 눈

    //코
    ellipse(200, 210, 15, 15);
  
    //입
    fill(this.headColor);
    line(200, 220, 200, 225); //인중
    arc(190, 225, 20, 20, 0, PI); //왼쪽 입
    arc(210, 225, 20, 20, 0, PI); //오른쪽 입
  
    pop();
  }
}

function rabbit()
{
  translate(food.x - 10, food.y - 10);
  push();
  scale(0.1);
  fill(foodColor);
  strokeWeight(3);
  
  //귀
  push(); //왼쪽 귀
  translate(150, 115);
  rotate(radians(-10));
  ellipse(0, 0, 50, 100);
  pop();
  push(); //오른쪽 귀
  translate(250, 115);
  rotate(radians(10));
  ellipse(0, 0, 50, 100);
  pop();
  
  //귀 내부
  fill(255, 180, 180);
  push(); //왼쪽 귀 내부
  translate(150, 112);
  rotate(radians(-10));
  ellipse(0, 0, 30, 65);
  pop();
  push(); //오른쪽 귀 내부
  translate(250, 112);
  rotate(radians(10));
  ellipse(0, 0, 30, 65);
  pop();
  
  //얼굴
  fill(foodColor);
  ellipse(200, 200, 180, 170);
  
  //눈
  fill(0);
  ellipse(160, 195, 10, 10); //왼쪽 눈
  ellipse(240, 195, 10, 10); //오른쪽 눈

  //코
  ellipse(200, 210, 15, 15);
  
  //입
  fill(foodColor);
  line(200, 220, 200, 225); //인중
  arc(190, 225, 20, 20, 0, PI); //왼쪽 입
  arc(210, 225, 20, 20, 0, PI); //오른쪽 입
  
  pop();
}
```

### 3-2. 실행결과

![18](/img/18.png)

## 4. 동영상

[![Video Label](http://img.youtube.com/vi/Lq7Ga9_VhbA/0.jpg)](https://youtu.be/Lq7Ga9_VhbA)

## 5. 참고 자료

### 5-1. 링크

[newgraphics 네이버 카페 : 6강 Snake 게임, 영화와 Graphics](https://cafe.naver.com/newgraphics/152)
