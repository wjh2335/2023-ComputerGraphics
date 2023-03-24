let cols, rows;
let scl = 20;
let w = 1400, h = 1000;
let flyingX = 0, flyingY = 0;
let terrain = [];
let img, fishImg;
let v;

function preload()
{
  img = loadImage("https://raw.githubusercontent.com/wjh2335/2023-ComputerGraphics/main/img/6.png");
  fishImg = loadImage("https://raw.githubusercontent.com/wjh2335/2023-ComputerGraphics/main/img/10.png");
}

function setup()
{
  createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h / scl;

  for (let x = 0; x < cols; x++)
  {
    terrain[x] = [];
    for (let y = 0; y < rows; y++)
    {
      terrain[x][y] = 0;
    }
  }
}

function draw()
{
  push();
  noStroke();
  translate(0, -200, -100);
  texture(img);
  plane(1000, 1000);
  pop();

  if (keyIsDown(LEFT_ARROW)) { flyingX -= 0.1; }
  if (keyIsDown(RIGHT_ARROW)) { flyingX += 0.1; }
  if (keyIsDown(UP_ARROW)) { flyingY -= 0.1; }
  if (keyIsDown(DOWN_ARROW)) { flyingY += 0.1; }

  var xoff = flyingX, yoff = flyingY;

  for (let y = 0; y < rows; y++)
  {
    xoff = flyingX;
    for (let x = 0; x < cols; x++)
    {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -50, 50);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  push();
  translate(0, 70);
  rotateX(PI / 3);
  translate(-w / 2, -h / 2);
  for (let y = 0; y < rows - 1; y++)
  {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++)
    {
      let v = terrain[x][y];
      noStroke();
      fill(v+10, v+40, v+21);
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
  pop();

  push();
  translate(0, 0, 300);
  fill(150);
  torus(130, 10);
  pop();

  push();
  noStroke();
  translate(0, 0, 313.2);
  fill(150);
  torus(122.2, 9.4);
  pop();

  push();
  noStroke();
  translate(0, 0, 300);
  fill(112, 146, 190);
  torus(200, 50);
  pop();

  push();
  noStroke();
  texture(fishImg);
  translate(mouseX - 300, mouseY - 300, 0);
  sphere(50, 50);
  pop();
}
