//—— SCENE MANAGER ——————————————————————————————————————————————————————————————————————————————————————
// Controls the game flow between different states (Menu, Restaurant, Kitchen, Summary/Shop) 
// and handles global drawing and input delegation.

let uiFont;
let mainMenuBg, restaurantBg, summaryShopBg, kitchenBg; 
let counter, woodenBoard, restaurantCounter;

function loadSceneAssets() {
  uiFont = loadFont("assets/fonts/ChelseaMarket-Regular.ttf");
  mainMenuBg = loadImage("assets/scene/mainmenu_bg.png");
  restaurantBg = loadImage("assets/scene/restaurant_bg.png");
  summaryShopBg = loadImage("assets/scene/summary_shop_bg.png");
  kitchenBg = loadImage("assets/scene/tile_background.png");
  counter = loadImage("assets/scene/counter.png");
  woodenBoard = loadImage("assets/scene/board.png");
  restaurantCounter = loadImage("assets/scene/restaurant_counter.png");
}

class SceneManager {
  constructor() {
    // ——— CORE STATE ———
    this.state = "mainMenu"; // mainMenu, restaurant, kitchen, summary, shop
    this.activeCharacter = null;
    this.spawnTimer = 0;

    // ——— HUD ELEMENTS ———
    this.hudElements = [
      new HUDWidget(15, 15, 180, uiIcons.day, () => { 
        return "Day " + day.currentDay + "   " + day.getClockFormat(); 
      }),
      new HUDWidget(210, 15, 100, uiIcons.clock, () => { 
        if(this.activeCharacter) return floor(this.activeCharacter.patience) + "%"; 
        else return "---";
      }),
      new HUDWidget(width - 115, 15, 100, uiIcons.money, () => { 
        return "$" + day.totalCash.toFixed(2); 
      }),
      new HUDWidget(width - 235, 15, 100, uiIcons.xp, () => { 
        return day.burgerPoints; 
      })
    ];

    // ——— UI COMPONENTS ———
    this.speechBubble = new SpeechBubble(width / 2 - 200, 150, 450, 120);
    this.receiptPaper = new ReceiptPaper(width/2 - 200, height/2 - 250, 400, 500);
    this.shop = new ShopManager();
    
    // ——— BUTTONS ———
    this.initButtons();
  }

  initButtons() {
    // Clarify
    this.clarifyBtn = new GameButton(width / 2 + 150, 250, 80, 40, "Huh?", "clarify", () => {
      if (currentOrder && !currentOrder.isClarified) {
        currentOrder.clarify();
        if (this.activeCharacter) {
          this.activeCharacter.reducePatience(10);
        }
      }
    });

    // Go To Shop
    this.goToShopBtn = new GameButton(width - 170, height - 80, 150, 50, "Shop", "shop", () => {
      this.shop.refresh();
      this.state = "shop";
    });

    // Retry Day
    this.btnRetry = new GameButton(width - 170, height - 80, 150, 50, "Retry Day", "general", () => {
      day.resetDailyTrackers();
      day.startShift(); 
      sceneManager.startDay(); 
    });

    // New Game
    this.btnNewGame = new GameButton(width/2 - 100, height/2, 200, 50, "New Game", "general", () => {
      clearSave();
      day = new Day();
      sceneManager.startDay();
    });

    // Continue
    this.btnContinue = new GameButton(width/2 - 100, height/2 + 70, 200, 50, "Continue", "general", () => {
      if (loadGame()) {
        this.shop.refresh();
        this.state = "shop";
      }
    });
  }

  // ——— MAIN LOOP ———
  
  run() {
    switch (this.state) {
      case "mainMenu":   this.drawMainMenu(); break;
      case "restaurant": this.drawRestaurant(); break;
      case "kitchen":    this.drawKitchen(); break;
      case "summary":    this.drawSummary(); break;
      case "shop":       this.shop.display(); break; 
    }
  }

  //———————— GAMEPLAY/STATE LOGIC ————————

  startDay() {
    day.startShift();
    this.nextCustomer();
  }

  nextCustomer() {
    let isTimeUp = day.elapsedMinutes >= day.totalShiftMinutes; // calculate if shift time has passed
    let customerData = getRandomCustomer(day.currentDay, isTimeUp); // logic to get data

    if (customerData) {
      // Setup New Order
      currentOrder = new Order(day.currentDay, day.unlockedIngredients);
      currentOrder.createFromData(customerData.order);
      
      // Setup Character
      this.activeCharacter = new Character(customerData.character);
      this.speechBubble.reset(currentOrder.dialogueText);

      // Charge burger before entering kitchen
      let config = day.getConfig();
      let basePrice = currentOrder.calculatePrice(config.markupRate, config.serviceFee);
      
      day.logSale(basePrice);
      currentOrder.paidAmount = basePrice;

      this.state = "restaurant";
    } else {
      // End of Day
      day.endShift();
      saveGame();
      this.state = "summary";
    }
  }

  //———————— SCENE DRAWING SCENES ————————

  drawMainMenu() {
    if (mainMenuBg) image(mainMenuBg, width / 2, height / 2, width, height);
    
    push();
    textAlign(CENTER); fill(255); strokeWeight(5); stroke('black');
    textSize(50); text("GOOD BURGER, PHENOMENAL BURGER.", width/2, height/2 - 80);
    pop();
    
    let saveExists = hasSaveFile();
    this.btnNewGame.update(mouseX, mouseY); 
    this.btnNewGame.display();

    // For showing resume/continue button or just New Game
    if (saveExists) {
      let savedData = getItem(SAVE_KEY);

      if (savedData && savedData.currentDay) {
        let savedDay = savedData.currentDay;
        
        this.btnContinue.label = "Continue (Day " + savedDay + ")";
        this.btnContinue.visible = true;
        this.btnContinue.update(mouseX, mouseY); 
        this.btnContinue.display();
      } else {
        this.btnContinue.visible = false;
      }
    } else {
      this.btnContinue.visible = false;
    }
  }

  drawRestaurant() {
    if (restaurantBg) image(restaurantBg, width / 2, height / 2, width, height);

    // ——— UPDATE/DRAW CHARACTER ———
    if (this.activeCharacter) {
      let isReading = !this.speechBubble.isFinished;
      let status = this.activeCharacter.update(isReading);
      this.activeCharacter.display();

      // Check for Rage Quit
      if (status === "left_angry") {
        if (currentOrder && currentOrder.paidAmount) {
          day.logRefund(currentOrder.paidAmount);
        }
        currentOrder = null;
      }
      
      // Check for Departure
      if (this.activeCharacter.state === "hidden") {
        this.activeCharacter = null;
        this.spawnTimer = 0;
      }
      
      // UI Interaction
      this.drawRestaurantUI();
    } else {
      // Spawning Logic
      this.spawnTimer++;
      if (this.spawnTimer > 90) this.nextCustomer();
    }

    // ——— DRAW ENVIRONMENT ———
    if (restaurantCounter) {
      image(restaurantCounter, width / 2, height * 0.80, restaurantCounter.width * 0.5, restaurantCounter.height * 0.5);
    }
    
    // ——— HUD RELATED ———
    day.startTime();
    this.drawHUD();
  }

  drawRestaurantUI() {
    // Only show bubble/buttons if character is present and not leaving
    if (this.activeCharacter && (this.activeCharacter.state === "idle" || this.activeCharacter.state === "reacting")) {
      if (currentOrder) {
        this.speechBubble.display(currentOrder.dialogueText, this.activeCharacter.data.name);
      }
      
      // Clarify button only available when idle
      if (this.activeCharacter.state === "idle" && currentOrder && !currentOrder.isClarified) {
        this.clarifyBtn.update(mouseX, mouseY);
        this.clarifyBtn.display();
      }
    }
  }

  drawKitchen() {
    // ——— DRAW ENVIRONMENT ———
    if (kitchenBg) image(kitchenBg, width / 2, height / 2, width, height);
    if (counter) image(counter, width / 2, height, width, height);
    if (woodenBoard) image(woodenBoard, width / 2, (height / 2) + 145, width * 0.3, height * 0.3);

    // ——— BG CHARACTER LOGIC ———
    // allows character to continue updating while in kitchen
    if (this.activeCharacter) {
      let status = this.activeCharacter.update();
      if (status === "left_angry") {
        if (currentOrder && currentOrder.paidAmount) {
          day.logRefund(currentOrder.paidAmount);
        }
        currentOrder = null;
        burger.clear();
        this.state = "restaurant";
        return; 
      }
    }

    // ——— GAMEPLAY ———
    burger.display(width * 0.5, height * 0.68);
    ui.display(day.currentDay, ingredientAssets);
    
    // ——— HUD ———
    day.startTime();
    this.drawHUD();
  }

  drawSummary() {
    if (summaryShopBg) image(summaryShopBg, width / 2, height / 2, width, height);
    
    // ——— RECEIPT ———
    let report = day.dailyReport; 
    this.receiptPaper.display(report, day.currentDay);

    // Goal Check & Buttons
    let goal = day.getConfig().pointsGoal;
    let earned = day.burgerPoints;
    let isGoalReached = earned >= goal;

    push(); 
    textAlign(CENTER); 
    textSize(24);
    
    // ——— NEXT DAY OR NOT? ———
    if(isGoalReached) {
      fill(0, 150, 0);
      text("Goal Reached! (" + earned + "/" + goal + " XP)", width/2, height - 125);
      this.goToShopBtn.update(mouseX, mouseY); 
      this.goToShopBtn.display();
    } else {
      fill(200, 0, 0);
      text("Goal Failed... (" + earned + "/" + goal + " XP)", width/2, height - 125);
      this.btnRetry.update(mouseX, mouseY); 
      this.btnRetry.display();
    }
    pop();
  }

  drawHUD() {
    for (let i = 0; i < this.hudElements.length; i++) {
      this.hudElements[i].display();
    }
    
    //Helper Text for Mr Scott!!!
    push(); 
    textAlign(LEFT, TOP); 
    textSize(18); 
    fill(0); 
    stroke(255); 
    strokeWeight(3);
    
    let orderText;
    if(!currentOrder) orderText = "No Order...";
    else if(currentOrder) orderText = currentOrder.targetStack;
    text(orderText, 20, 100);
    
    pop();
  }

  // ——— INPUT STUFF ———

  handleInput(key) {
    if (this.state === "restaurant") {
      if(this.activeCharacter && this.activeCharacter.state !== "idle") return;
      if (key === " ") this.state = "kitchen"; 
    }
    else if (this.state === "kitchen") {
      this.handleKitchenInput(key);
    }
    else if (this.state === "summary" && key === "Enter") {
      if (day.isGoalReached()) this.goToShopBtn.action();
      else this.btnRetry.action();
    }
  }

  handleKitchenInput(key) {
    if (key === " ") {
      // Serve Order
      if (burger.burgerStack.length > 0) {
        this.processServing();
      }
    } else if (key === "z") {
      burger.undo();
    } else if (key === "c") {
      burger.clear();
    }
  }

  processServing() {
    let isSuccess = currentOrder.checkOrderMatch(burger.burgerStack);

    // ——— UPDATE DIALOGUE ———
    if(isSuccess) currentOrder.dialogueText = currentOrder.successLine;
    else if(!isSuccess) currentOrder.dialogueText = currentOrder.failLine;
    this.speechBubble.reset(currentOrder.dialogueText); 

    // ——— FINANCIAL ———
    if (isSuccess) {
      let tipRate;
      if(currentOrder.hasPenalty) tipRate = 0.20;
      else if(!currentOrder.hasPenalty) tipRate = 0.50;
      tipRate *= day.getUpgradeMultiplier("tip_rate");
      
      let actualTip = (currentOrder.paidAmount * tipRate) * (this.activeCharacter.patience / 100);
      
      if (actualTip > 0) day.logTip(actualTip);
      day.logPoints(25); 
    } else {
      day.logRefund(currentOrder.paidAmount);
    }

    // ——— TRANSITION ———
    this.state = "restaurant";
    if (this.activeCharacter) {
        this.activeCharacter.triggerReaction(isSuccess);
    }
    burger.clear();
  }

  handleMouse(mx, my) {
    switch(this.state) {
      case "mainMenu":
        this.btnNewGame.handleClick(mx, my);
        if (this.btnContinue.visible) this.btnContinue.handleClick(mx, my);
        break;
      case "kitchen":
        ui.update(mx, my, day.currentDay, burger);
        break;
      case "restaurant":
        if (this.activeCharacter && this.activeCharacter.state === "idle") this.clarifyBtn.handleClick(mx, my);
        break;
      case "shop":
        this.shop.handleClick(mx, my);
        break;
      case "summary":
        if (day.isGoalReached()) this.goToShopBtn.handleClick(mx, my);
        else this.btnRetry.handleClick(mx, my);
        break;
    }
  }
}