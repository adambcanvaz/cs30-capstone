//—— USER INTERFACE SYSTEM ——————————————————————————————————————————————————————————————————————————————————————

class IngredientUI {
  constructor() {
    //———————— DIMENSIONS ————————
    this.panelX = 0;
    this.panelY = 0;
    this.panelWidth = 260;
    this.panelHeight = 520;
    this.radius = 20;

    //———————— CATEGORY NAVIGATION ————————
    this.categories = ["buns", "proteins", "cheese", "veggies", "sauces"];
    this.categoryIndex = 0;

    //———————— INGREDIENT SLOTS ————————
    this.slotCount = 5; // vertical slots
    this.slotRects = [];  // stores the hitbox variables for each slot

    //———————— INTERACTIVE ELEMENTS ————————
    this.leftArrowHitbox = { x: 0, y: 0, w: 44, h: 44 };
    this.rightArrowHitbox = { x: 0, y: 0, w: 44, h: 44 };

    //———————— INPUT STATE ————————
    this.prevMouseDown = false; // Flag to detect a single click event
  }

  layout() {
    // Calculates positions and sizes for all UI elements

    //———————— MARGINS/PADDING ————————
    const TOP_MARGIN = 200;
    const BOTTOM_MARGIN = 20;
    const PANEL_PADDING = 20;

    //———————— PANEL POSITIONING/SIZE ————————
    this.panelWidth = 260;
    this.panelY = TOP_MARGIN;
    this.panelHeight = height - this.panelY - BOTTOM_MARGIN;
    this.panelX = width - this.panelWidth - PANEL_PADDING;

    //———————— ARROW POSITIONS ————————
    this.leftArrowHitbox.x = this.panelX + PANEL_PADDING;
    this.leftArrowHitbox.y = this.panelY + PANEL_PADDING;
    this.rightArrowHitbox.x = this.panelX + this.panelWidth - PANEL_PADDING - this.rightArrowHitbox.w;
    this.rightArrowHitbox.y = this.panelY + PANEL_PADDING;

    //———————— SLOT POSITIONS ————————
    this.slotRects = [];
    const HEADER_HEIGHT = 90;
    const SLOTS_START_Y = this.panelY + HEADER_HEIGHT;
    const SLOT_HEIGHT = 78;
    const SLOT_GAP = 12;

    for (let i = 0; i < this.slotCount; i++) {
      //holds the calculated dimensions for the current slot's hitbox
      let slotRect = {
        x: this.panelX + PANEL_PADDING,
        y: SLOTS_START_Y + (i * (SLOT_HEIGHT + SLOT_GAP)),
        w: this.panelWidth - (PANEL_PADDING * 2),
        h: SLOT_HEIGHT
      };
      this.slotRects.push(slotRect);
    }
  }

  pointInHitbox(pointX, pointY, rectDimensions) {
    //helper that returns true if clicked inside hitbox
    return pointX >= rectDimensions.x &&
      pointX <= rectDimensions.x + rectDimensions.w &&
      pointY >= rectDimensions.y &&
      pointY <= rectDimensions.y + rectDimensions.h;
  }

  getCategoryKey() {
    //returns the current category key
    return this.categories[this.categoryIndex];
  }

  getCategoryIngredients(currentDay) {
    // returns ingredients for curr category, by day
    let categoryKey = this.getCategoryKey();
    return getCategoryItemsByDay(categoryKey, currentDay);
  }

  update(currentDay, burger) {
    // handles clicks on arrows and slots

    let mouseDown = mouseIsPressed;
    // prevents multiple clicks from being registered
    let clicked = mouseDown && !this.prevMouseDown;
    this.prevMouseDown = mouseDown;
    if (!clicked) return;

    //———————— ARROW CLICKS ————————
    // MOVE BACK
    if (this.pointInHitbox(mouseX, mouseY, this.leftArrowHitbox)) {
      this.categoryIndex--;
      if (this.categoryIndex < 0) this.categoryIndex = this.categories.length - 1;

      //Move back again if category is empty
      while (getCategoryItemsByDay(this.getCategoryKey(), currentDay).length === 0) {
        this.categoryIndex--;
        if (this.categoryIndex < 0) this.categoryIndex = this.categories.length - 1;
      }
      return;
    }

    // MOVE FORWARD
    if (this.pointInHitbox(mouseX, mouseY, this.rightArrowHitbox)) {
      this.categoryIndex++;
      if (this.categoryIndex >= this.categories.length) this.categoryIndex = 0;

      while (getCategoryItemsByDay(this.getCategoryKey(), currentDay).length === 0) {
        this.categoryIndex++;
        if (this.categoryIndex >= this.categories.length) this.categoryIndex = 0;
      }
      return;
    }

    //———————— SLOT CLICKS ————————
    let availableIngredients = this.getCategoryIngredients(currentDay);

    for (let i = 0; i < this.slotRects.length; i++) {
      if (i >= availableIngredients.length) break; //skip if no ingredient for slot
      let slotRect = this.slotRects[i];

      if (this.pointInHitbox(mouseX, mouseY, slotRect)) {
        let chosenIngredient = availableIngredients[i];
        burger.addIngredient(chosenIngredient.id);
        return; //stops checking others once one is clicked
      }
    }
  }

  display(currentDay, loadedImages) {
    // Draws the whole UI panel

    //———————— BACKGROUND ————————
    push();
    noStroke();
    fill(25);
    rect(this.panelX, this.panelY, this.panelWidth, this.panelHeight, this.radius);
    pop();

    //———————— CATEGORY HEADER ————————
    let categoryKey = this.getCategoryKey();
    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text(this.uppercaseCategoryName(categoryKey), this.panelX + (this.panelWidth / 2), this.panelY + 42);
    pop();

    //———————— ARROWS ————————
    this.drawArrowButton(this.leftArrowHitbox, "<");
    this.drawArrowButton(this.rightArrowHitbox, ">");

    //———————— SLOTS+INGREDEINTS ————————
    let availableIngredients = this.getCategoryIngredients(currentDay);

    for (let i = 0; i < this.slotRects.length; i++) {
      let slotRect = this.slotRects[i];
      if (i >= availableIngredients.length) continue; //skip if no ingredient for this slot

      let ingredient = availableIngredients[i];
      let ingredientImage = loadedImages[ingredient.id];

      // Draw the ingredient icon
      if (ingredientImage !== undefined) {
        const ICON_MAX_HEIGHT = slotRect.h * 0.75;
        let scaleFactor = ICON_MAX_HEIGHT / ingredientImage.height;
        let iconWidth = ingredientImage.width * scaleFactor;
        let iconHeight = ingredientImage.height * scaleFactor;

        let centerX = this.panelX + this.panelWidth / 2; // Horizontal center of tablet
        let centerY = slotRect.y + slotRect.h / 2; // Vertical center of slot

        image(ingredientImage, centerX, centerY - 6, iconWidth, iconHeight);
      }
    }
  }

  drawArrowButton(hitbox, label) {
    // draws arrows
    push();
    noFill();
    noStroke();
    rect(hitbox.x, hitbox.y, hitbox.w, hitbox.h);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text(label, hitbox.x + hitbox.w / 2, hitbox.y + hitbox.h / 2);
    pop();
  }

  uppercaseCategoryName(key) {
    //returns uppercase header
    if (key === "buns") return "BUNS";
    if (key === "proteins") return "PROTEINS";
    if (key === "cheese") return "CHEESE";
    if (key === "veggies") return "TOPPINGS";
    if (key === "sauces") return "SAUCES";
    return key.toUpperCase();
  }
}