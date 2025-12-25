//—— BURGER SYSTEM ——————————————————————————————————————————————————————————————————————————————————————

class Burger {
  constructor() {
    this.burgerStack = []; // stores items (by id) added to the burger built
  }

  addIngredient(ingredientId) {
    // Function adds ingredient to stack.
    this.burgerStack.push(ingredientId);
    return true;
  }

  display(centerX, baseY) {
    // Draw each ingredient from index 0 to top
    for (let i = 0; i < this.burgerStack.length; i++) {
      let ingredientId = this.burgerStack[i];
      let ingredientImage = loadedAssets[ingredientId];

      //———————— STACKING AND POSITIONING logic ————————
      // Each higher ingredient moves up a fixed amount (25px).
      let ingredientHeightIndex = i;
      let ingredientYOffset = -ingredientHeightIndex * 15;
      let finalYPosition = baseY + ingredientYOffset;

      //———————— SCALING logic ————————
      let targetWidth = 120; // all ingredients scaled to this width
      let scaleFactor = targetWidth / ingredientImage.width;
      let finalWidth = ingredientImage.width * scaleFactor;
      let finalHeight = ingredientImage.height * scaleFactor;

      image(ingredientImage, centerX, finalYPosition,
        finalWidth, finalHeight); // draw ingredient
    }
  }

  clear() { // clears the burger array
    this.burgerStack = [];
  }

  undo() { // removes last added item
    this.burgerStack.pop();
  }
}