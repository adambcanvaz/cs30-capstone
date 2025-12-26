//—— MAIN BACKBONE ——————————————————————————————————————————————————————————————————————————————————————

let loadedAssets = {};
let currentDay = 6;
let ui;
let burger;
let currentOrder;

function preload() {
  uiFont = loadFont("assets/fonts/ChelseaMarket-Regular.ttf");
  bgImg = loadImage("assets/scene/tile_background.png");
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
  if (woodenBoard) image(woodenBoard, width/2, (height/2)+50, width*0.3, height*0.3);

  //———————— BURGER ————————
  let burgerCenterX = width * 0.5;
  let burgerBaseY = height * 0.55;
  burger.display(burgerCenterX, burgerBaseY);

  //———————— USER INTERFACE ————————
  ui.update(currentDay, burger);
  ui.display(currentDay, loadedAssets);

  //———————— ORDER ————————
  textSize(13);
  fill("black");
  text("Order: " + currentOrder.targetStack, 20, 20);
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
    currentOrder = new Order(currentDay); // generates new order
  }
}