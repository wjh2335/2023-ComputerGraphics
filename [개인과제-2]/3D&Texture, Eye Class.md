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

![1](img/2.png)

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

![2](img/3.png)

## 3. 소감

## 4. 기타
