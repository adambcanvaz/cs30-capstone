//—— SCENE MANAGER ——————————————————————————————————————————————————————————————————————————————————————

function loadScene() {
  // Preload all restaurant assets
  uiFont = loadFont("assets/fonts/ChelseaMarket-Regular.ttf");
  bgImg = loadImage("assets/scene/tile_background.png");
  counter = loadImage("assets/scene/counter.png");
  woodenBoard = loadImage("assets/scene/board.png");
}

function drawScene() {
  if (bgImg) image(bgImg, width / 2, height / 2, width, height);
  if (counter) image(counter, width / 2, height, width, height);
  if (woodenBoard) image(woodenBoard, width / 2, (height / 2) + 145, width * 0.3, height * 0.3);
}