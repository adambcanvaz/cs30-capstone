//—— SCENE MANAGER ——————————————————————————————————————————————————————————————————————————————————————

function loadScene() {
  // Preload all restaurant assets
  uiFont = loadFont("assets/fonts/ChelseaMarket-Regular.ttf");
  bgImg = loadImage("assets/scene/tile_background.png");
  counter = loadImage("assets/scene/counter.png");
  woodenBoard = loadImage("assets/scene/board.png");
  restaurantCounter = loadImage("assets/scene/restaurant_counter.png");
}

class SceneManager{
  constructor(){
    this.state = "mainMenu"; // mainMenu, dailyNews, restaurant, kitchen, summary, shop
    this.activeCharacter = null;
  }

  run(){
    switch(this.state){
      case "mainMenu":
        this.drawMainMenu();
        break;
      case "dailyNews":
        this.drawDailyNews();
        break;
      case "restaurant":
        this.drawRestaurant();
        break;
      case "kitchen":
        this.drawKitchen();
        break;
      case "summary":
        this.drawSummary();
        break;
      case "shop":
        this.drawShop();
        break;
    }
  }

  drawHUD(){
    push();
    textAlign(LEFT);
    textSize(15);
    fill("black");
    text("Order: " + currentOrder.targetStack, 20, 20);
    text("Day " + day.currentDay, 20, 40);
    text("Time: " + day.getClockFormat(), 20, 60);
    textAlign(RIGHT);
    text("Total: $" + day.totalCash.toFixed(2), width - 20, 20);
    text("Burger XP: " + day.burgerPoints, width - 20, 40);
    text("Sales: $" + day.dailySales.toFixed(2), width - 20, 60);
    text("Tips: $" + day.dailyTips.toFixed(2), width - 20, 80);
    text("Expenses: $" + day.dailyExpenses.toFixed(2), width - 20, 100);
    text("Refunds: $" + day.dailyRefunds.toFixed(2), width - 20, 120);
    //text("Net: $" + day.getDailyNet().toFixed(2), width - 20, 140);
    pop();
  }

  //———————— STATE LOGIC ————————

  startDay(){
    day.startShift();
    this.nextCustomer();
  }

  nextCustomer(){
    let isTimeUp = day.elapsedMinutes >= day.totalShiftMinutes; // calculate if shift time has passed
    let customerData = getRandomCustomer(day.currentDay, isTimeUp); // logic to get data

    // setup logic objects
    if(customerData){
      currentOrder = new Order(day.currentDay, day.unlockedIngredients);
      currentOrder.targetStack = customerData.order.stack;

      // setup visuals (the new class we made)
      this.activeCharacter = new Character(customerData.character);

      this.state = "restaurant";
    }
    else {
      day.endShift();
      this.state = "summary";
    }
  }

  //———————— DRAWING SCENES ————————

  drawMainMenu(){
    background("gray");
    textAlign(CENTER);
    fill(255);
    textSize(30);
    text("Press the enter key to start!", width/2, height/2);
  }

  drawRestaurant(){
    // Background
    background("white");

    // Character
    if(this.activeCharacter){
      this.activeCharacter.update();
      this.activeCharacter.display();
    }

    // Foreground
    if(restaurantCounter) image(restaurantCounter, width/2, height*0.80, restaurantCounter.width*0.5, restaurantCounter.height*0.5);

    // HUD
    day.startTime();
    this.drawHUD();
  }

  drawKitchen(){
    // Background
    if(bgImg) image(bgImg, width/2, height/2, width, height);

    // Foreground
    if(counter) image(counter, width/2, height, width, height);
    if (woodenBoard) image(woodenBoard, width/2, (height/2)+145, width*0.3, height*0.3);

    // draw burger & ui
    burger.display(width*0.5, height*0.68);
    ui.display(day.currentDay, ingredientAssets);

    //draw HUD
    day.startTime();
    this.drawHUD();
  }

  drawSummary(){
    background("gray");
    textAlign(CENTER);
    text("DAY COMPLETE!", width/2, height/2);
    text("Press enter key for next day", width/2, (height/2)+50);
  }

  //———————— INPUT STUFF ————————

  handleInput(key){
    if(this.state === "mainMenu" && key === "Enter"){
      this.startDay();
    }

    else if(this.state === "restaurant"){
      if(key === " ") this.state = "kitchen"; // switch to kitchen
    }

    else if(this.state == "kitchen"){
      if(key === " "){
        if(burger.burgerStack.length > 0){
          currentOrder.serveOrder();
          if(this.activeCharacter) this.activeCharacter.leave();
          this.state = "restaurant";
          setTimeout(() => this.nextCustomer(), 3000);
        }
      }
      //ui inputs
      if (key === "z") burger.undo();
      if (key === "c") burger.clear();
    }

    else if(this.state === "summary" && key === "Enter"){
      day.nextDay();
      this.startDay();
    }
  }

  handleMouse(mx, my){
    if(this.state === "kitchen"){
      ui.update(mx, my, day.currentDay, burger);
    }
  }
}