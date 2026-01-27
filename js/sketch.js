// Computer Science 30
// Final Project (CAPSTONE): "Good Burger, Phenomenal Burger."
// Teacher: Mr. Scott
// Student: Adam Besbes

//—— MAIN BACKBONE ——————————————————————————————————————————————————————————————————————————————————————
// Handles asset preloading, canvas setup, and delegates the main draw loop to the Scene Manager.

let day;
let ui;
let burger;
let currentOrder;
let sceneManager;

let introAlpha = 255; // fade-in effect 

function preload() {
  // Load all assets here
  loadSceneAssets(); 
  loadIngredients();
  loadCharacters();
  loadUIIcons();
  loadSounds();
}

function setup() {
  createCanvas(1466, 868);
  imageMode(CENTER);
  if (uiFont) textFont(uiFont);

  // Initialize Core Systems
  day = new Day();
  burger = new Burger();
  ui = new IngredientUI(); 
  sceneManager = new SceneManager();
  
  ui.layout(); 
}

function draw() {
  sceneManager.run();

  // Fade-In
  if (introAlpha > 0) {
    push(); fill(0, introAlpha);
    rect(0, 0, width, height); pop();
    introAlpha -= 9; // higher = faster
  }
}

function keyPressed() {
  sceneManager.handleInput(key);
}

function mousePressed(){
  sceneManager.handleMouse(mouseX, mouseY);
}