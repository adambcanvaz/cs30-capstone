//—— MAIN BACKBONE ——————————————————————————————————————————————————————————————————————————————————————

let day;
let ui;
let burger;
let currentOrder;
let sceneManager;

function preload() {
  loadScene();
  loadIngredients();
  loadCharacters();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  if (uiFont) textFont(uiFont);

  sceneManager = new SceneManager();
  day = new Day();
  burger = new Burger();
  ui = new IngredientUI();
  ui.layout();
}

function draw() {
  sceneManager.run();
}

//—— INPUT FUNCTIONS ——————————————————————————————————————————————————————————————————————————————————————

function keyPressed() {
  sceneManager.handleInput(key);
}

function mousePressed(){
  sceneManager.handleMouse(mouseX, mouseY);
}