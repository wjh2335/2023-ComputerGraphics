# 3D&Texture, Eye Class

## 1. 3D & Texture

### 1-1. 3D & Texture 소스 코드

```js
let img;
function setup()
{
  createCanvas(400, 400, WEBGL);
  img = loadImage("shim.jpeg");
}

function draw()
{
  background(200);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  texture(img);
  box(200);
}
```

### 1-2. 실행 결과

![1](/img/2.png)

## 2. Eye Class

### 2-1. Eye Class 소스 코드

```js
let e1, e2, e3;
function setup()
{
  createCanvas(640, 360);
  noStroke();
  e1 = new Eye(250, 16, 120);
  e2 = new Eye(164, 185, 80);
  e3 = new Eye(420, 230, 220);
}
function draw()
{
  background(102);
  e1.update(mouseX, mouseY);
  e2.update(mouseX, mouseY);
  e3.update(mouseX, mouseY);
  e1.display();
  e2.display();
  e3.display();
}
class Eye
{
  constructor(tx, ty, ts)
  {
    this.x = tx;
    this.y = ty;
    this.size = ts;
    this.angle = 0.0;
  }

  update(mx, my)
  {
    this.angle = Math.atan2(my - this.y, mx - this.x);
  }

  display()
  {
    push();
    translate(this.x, this.y);
    fill(255);
    ellipse(0, 0, this.size, this.size);
    rotate(this.angle);
    fill(153, 204, 0);
    ellipse(this.size / 4, 0, this.size / 2, this.size / 2);
    pop();
  }
}
```

### 2-2. 실행 결과

![2](/img/3.png)

## 3. 소감

```
P5.JS를 사용해 3D 정육면체와 사진 텍스쳐를 넣어보고, JavaScript로 구현되어 있는 Eye Class코드를 P5.JS로 구현하는 연습을 해보았습니다.

3번씩 구현해보니 Eye Class는 아직 보지 않고 구현하기는 무리지만 3D와 텍스쳐는 보지 않고 구현할 수 있었습니다.

구현하다 중간중간 컴파일을 해보면서 해당 코드가 무슨 동작을 하는지 파악하였고 구조가 눈에 익었습니다.

헷갈리거나 모르는 부분이 있다면 ChatGPT한테 물어보며 공부하니 도움이 많이 되었습니다.
```

## 4. 기타

```
매일 한 시간씩 복습하면서 까먹지 않고 기억하도록 반복하겠습니다.
```
