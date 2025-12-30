//—— MAIN BACKBONE ——————————————————————————————————————————————————————————————————————————————————————

let day;
let ui;
let burger;
let currentOrder;

function preload() {
  loadScene();
  loadIngredients();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  if (uiFont) textFont(uiFont);

  day = new Day();
  burger = new Burger();
  ui = new IngredientUI();
  ui.layout();
  currentOrder = new Order(day.currentDay, day.unlockedIngredients);
}

function draw() {
  background(220);
  drawScene();

  //———————— BURGER ————————
  let burgerCenterX = width * 0.5;
  let burgerBaseY = height * 0.68;
  burger.display(burgerCenterX, burgerBaseY);

  //———————— USER INTERFACE ————————
  ui.update(day.currentDay, burger);
  ui.display(day.currentDay, ingredientAssets);

  //———————— ORDER ————————
  push();
  textAlign(LEFT);
  textSize(15);
  fill("black");
  text("Order: " + currentOrder.targetStack, 20, 20);
  text("Day " + day.currentDay, 20, 40);
  pop();

  //———————— HUD ————————
  push();
  textSize(15);
  textAlign(RIGHT);
  fill("black");
  text("Total: $" + day.totalCash.toFixed(2), width - 20, 20);
  text("Burger XP: " + day.burgerPoints, width - 20, 40);
  text("Sales: $" + day.dailySales.toFixed(2), width - 20, 60);
  text("Tips: $" + day.dailyTips.toFixed(2), width - 20, 80);
  text("Expenses: $" + day.dailyExpenses.toFixed(2), width - 20, 100);
  text("Refunds: $" + day.dailyRefunds.toFixed(2), width - 20, 120);
  text("Net: $" + day.getDailyNet().toFixed(2), width - 20, 140);
  pop();
}

//—— INPUT FUNCTIONS ——————————————————————————————————————————————————————————————————————————————————————

function keyPressed() {
  if (key === "c") burger.clear();
  else if (key === "z") burger.undo();
  else if (key === " ") currentOrder.serveOrder();
}