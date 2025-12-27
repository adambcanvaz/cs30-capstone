//—— BURGER SYSTEM ——————————————————————————————————————————————————————————————————————————————————————

class Burger {
  constructor() {
    this.burgerStack = []; // stores items (by id) added to the burger built
  }

  addIngredient(ingredientId) {
    // Function adds ingredient to stack.

    //———————— RULES/LIMITATIONS ————————
    // First item must be bottom bun
    if (this.burgerStack.length === 0) {
      if (ingredientId !== "bun_bottom") return false;
    }

    // Last item can only be top bun
    let lastIndex = this.burgerStack.length - 1;
    if (this.burgerStack.length > 0 && this.burgerStack[lastIndex] === "bun_top") {
      return false;
    }

    // Adds to stack if conditions met
    this.burgerStack.push(ingredientId);
    return true;
  }

  display(centerX, baseY) {
    // Draw each ingredient from index 0 to top
    for (let i = 0; i < this.burgerStack.length; i++) {
      let adjustX, adjustY, adjustScale;
      let ingredientId = this.burgerStack[i];
      let ingredientImage = loadedAssets[ingredientId];

      //———————— STACKING AND POSITIONING logic ————————
      //Get data for ingredient adjustment values
      let data = getIngredientById(ingredientId);

      //Apply offset adjustments (otherwise 0)
      if(!data.xOffset) adjustX = 0;
      else adjustX = data.xOffset;
      if(!data.yOffset) adjustY = 0;
      else adjustY = data.yOffset;
      if(!data.scale) adjustScale = 1;
      else adjustScale = data.scale;

      //Stacking position
      let ingredientYOffset = -i*12; // Adjusted for a tighter stack
      let finalX = centerX + adjustX;
      let finalY = baseY + ingredientYOffset + adjustY;

      //———————— SCALING logic ————————
      let targetWidth = 130*adjustScale; // all ingredients scaled to this width (w/ adjustment)
      let scaleFactor = ingredientImage.height / ingredientImage.width;
      let finalHeight = targetWidth * scaleFactor;

      image(ingredientImage, finalX, finalY, targetWidth, finalHeight); // draw ingredient
    }
  }

  clear() { // clears the burger array
    this.burgerStack = [];
  }

  undo() { // removes last added item
    this.burgerStack.pop();
  }
}