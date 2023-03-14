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
