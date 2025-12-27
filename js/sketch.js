//—— MAIN BACKBONE ——————————————————————————————————————————————————————————————————————————————————————

let loadedAssets = {};
let cash = 0;
let currentDay = 1;
let ui;
let burger;
let currentOrder;

function preload() {
  uiFont = loadFont("assets/fonts/ChelseaMarket-Regular.ttf");
  bgImg = loadImage("assets/scene/tile_background.png");
  counter = loadImage("assets/scene/counter.png");
  woodenBoard = loadImage("assets/scene/board.png");

  //Loads all ingredient image assets
  for (let categoryKey in INGREDIENTS) {
    let ingredientItems = INGREDIENTS[categoryKey];

    for (let i = 0; i < ingredientItems.length; i++) { // goes through each ingredient in category
      let item = ingredientItems[i];
      loadedAssets[item.id] = loadImage(item.img); //store the ingredient's image
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  if (uiFont) textFont(uiFont);

  burger = new Burger();
  ui = new IngredientUI();
  ui.layout();

  currentOrder = new Order(currentDay);
}

function draw() {
  background(220);
  if (bgImg) image(bgImg, width/2, height/2, width, height);
  if (counter) image(counter, width/2, height, width, height);
  if (woodenBoard) image(woodenBoard, width/2, (height/2)+145, width*0.3, height*0.3);

  //———————— BURGER ————————
  let burgerCenterX = width * 0.5;
  let burgerBaseY = height * 0.68;
  burger.display(burgerCenterX, burgerBaseY);

  //———————— USER INTERFACE ————————
  ui.update(currentDay, burger);
  ui.display(currentDay, loadedAssets);

  //———————— ORDER ————————
  pop();
  textAlign(LEFT);
  textSize(15);
  fill("black");
  text("Order: " + currentOrder.targetStack, 20, 20);
  push();

  //———————— CASH ————————
  pop();
  textSize(15);
  textAlign(RIGHT);
  fill("black");
  text("$" + cash.toFixed(2), width-20, 20);
  push();
}


//—— INPUT FUNCTIONS ——————————————————————————————————————————————————————————————————————————————————————

function keyPressed() {
  // Clear burger
  if (key === "c" || key === "C") {
    burger.clear();
    // Undoes prev ingredient
  } else if (key === "z" || key === "Z") {
    burger.undo();
  } else if (key === " "){
    currentOrder.serveOrder(); // generates new order
  }
}