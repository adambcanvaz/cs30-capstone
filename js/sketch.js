//—— MAIN BACKBONE ——————————————————————————————————————————————————————————————————————————————————————

let loadedAssets = {};
let currentDay = 2;
let ui;
let uiFont;
let burger;

function preload(){
  //UI Font
  uiFont = loadFont("assets/fonts/ChelseaMarket-Regular.ttf");

  //Loads all ingredient image assets
  for (let categoryKey in INGREDIENTS){
    let ingredientItems = INGREDIENTS[categoryKey];

    for (let i = 0; i < ingredientItems.length; i++){ // goes through each ingredient in category
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
  ui = new UI();
  ui.layout();
}

function draw() {
  background(220);

  //———————— BURGER ————————
  let burgerCenterX = width * 0.5;
  let burgerBaseY = height * 0.55;
  burger.display(burgerCenterX, burgerBaseY);

  //———————— USER INTERFACE ————————
  ui.update(currentDay, burger);
  ui.display(currentDay, loadedAssets);
}


//—— INPUT FUNCTIONS ——————————————————————————————————————————————————————————————————————————————————————

function keyPressed() {
  // Clear burger
  if (key === "c" || key === "C"){
    burger.clear();
  // Undoes prev ingredient
  } else if (key === "z" || key === "Z"){
    burger.undo();
  }
}