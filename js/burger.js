//—— BURGER SYSTEM ——————————————————————————————————————————————————————————————————————————————————————
// Manages the visual stack of ingredients currently 
// being built by the player, including positioning and undo/clear logic.

class Burger {
  constructor() {
    this.burgerStack = []; // stores items (by id) added to the burger built
  }

  addIngredient(ingredientId) {
    // Adds ingredient to stack
    this.burgerStack.push(ingredientId);
    return true;
  }

  display(centerX, baseY) {
    // Draw each ingredient from index 0 to top
    for (let i = 0; i < this.burgerStack.length; i++) {
      let adjustX, adjustY, adjustScale;
      let ingredientId = this.burgerStack[i];
      let ingredientImage = ingredientAssets[ingredientId];

      //———————— DATA & OFFSETS ————————
      let data = getIngredientById(ingredientId);

      //Apply offset adjustments (otherwise 0)
      if (!data.xOffset) adjustX = 0;
      else adjustX = data.xOffset;
      
      if (!data.yOffset) adjustY = 0;
      else adjustY = data.yOffset;
      
      if (!data.scale) adjustScale = 1;
      else adjustScale = data.scale;

      //———————— POSITIONING ————————
      let ingredientYOffset = -i * 12; // Adjusted for a tighter stack
      let finalX = centerX + adjustX;
      let finalY = baseY + ingredientYOffset + adjustY;

      //———————— DRAWING ————————
      let targetWidth = 140 * adjustScale; // all ingredients scaled to this width (w/ adjustment)
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