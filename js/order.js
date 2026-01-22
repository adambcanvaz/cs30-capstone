//—— ORDERING SYSTEM ——————————————————————————————————————————————————————————————————————————————————————
// Manages the logic for generating customer orders, 
// calculating prices based on ingredients, and validating if the player's burger matches the request.

class Order {
  constructor() {
    //———————— STATE ————————
    this.targetStack = [];
    this.character = null;
    
    //———————— DIALOGUE ————————
    this.dialogueText = ""; 
    this.dialogueHint = "";
    this.successLine = "";
    this.failLine = "";
    
    //———————— STATUS ————————
    this.isClarified = false;
    this.paidAmount = 0;
    this.hasPenalty = false;
  }

  /* THIS WAS DISABLED AS NO MORE RANDOM ORDERS ARE NEEDED
  generateRandomOrder(day, unlockedIngredients) {
    // Generate a burger order based on category limits
    this.targetStack = [];

    //———————— RULES ————————
    this.targetStack.push("bun_bottom"); //always bottom bun first

    // makes sure there is at least 1 protein.
    let availableFillings = getCategoryItemsByDay("fillings", day, unlockedIngredients);
    if (availableFillings.length > 0) {
      let randomProtein = this.pickOneItem(availableFillings);
      this.targetStack.push(randomProtein.id);
    }

    //50 percent chance of adding 1 cheese
    let availableCheeses = getCategoryItemsByDay("cheese", day, unlockedIngredients);
    if (availableCheeses.length > 0 && random() > 0.5) {
      let randomCheese = this.pickOneItem(availableCheeses);
      this.targetStack.push(randomCheese.id);
    }

    //random veggies (1 to 3)
    let availableVeggies = getCategoryItemsByDay("veggies", day, unlockedIngredients);
    if (availableVeggies.length > 0) {
      let veggieCount = floor(random(1, 4));
      let chosenVeggies = this.pickMultipleItems(availableVeggies, veggieCount);
      for (let i = 0; i < chosenVeggies.length; i++) {
        this.targetStack.push(chosenVeggies[i].id);
      }
    }

    //35 percent chance of adding 1 extra
    let availableExtras = getCategoryItemsByDay("extras", day, unlockedIngredients);
    if (availableExtras.length > 0 && random() > 0.35) {
      let randomExtra = this.pickOneItem(availableExtras);
      this.targetStack.push(randomExtra.id);
    }

    //random sauces (none to 2)
    let availableSauces = getCategoryItemsByDay("sauces", day, unlockedIngredients);
    if (availableSauces.length > 0 && random() > 0.5) {
      let sauceCount = floor(random(0, 3));
      let chosenSauces = this.pickMultipleItems(availableSauces, sauceCount);
      for (let i = 0; i < chosenSauces.length; i++) {
        this.targetStack.push(chosenSauces[i].id);
      }
    }

    this.targetStack.push("bun_top"); //always end with top bun last
  }

  pickOneItem(sourceList) {
    //helper to randomly pick a single item
    let item = floor(random(0, sourceList.length));
    return sourceList[item];
  }

  pickMultipleItems(sourceList, amountNeeded) {
    //helper to randomly pick multiple items (without same item more than once)
    let chosenIngredients = [];

    //limits to the max available items if asked for more than available
    if (amountNeeded > sourceList.length) {
      amountNeeded = sourceList.length;
    }

    while (chosenIngredients.length < amountNeeded) {
      let targetItem = this.pickOneItem(sourceList);
      let alreadyChosen = false;
      for (let i = 0; i < chosenIngredients.length; i++) {
        if (chosenIngredients[i].id === targetItem.id) {
          alreadyChosen = true;
          break;
        }
      }
      if (!alreadyChosen) chosenIngredients.push(targetItem);
    }
    return chosenIngredients;
  } */

  createFromData(orderData) {
    // populates the order with specific customer data
    this.targetStack = orderData.stack;
    this.dialogueText = orderData.order;
    this.dialogueHint = orderData.hint;
    this.successLine = orderData.success;
    this.failLine = orderData.fail;
  }

  clarify() {
    // switches text to the hint and applies penalty
    this.dialogueText = this.dialogueHint;
    this.isClarified = true;
    this.hasPenalty = true;
  }

  checkOrderMatch(builtStack) {
    //compares the player's built burger to the target order

    //if length doesn't match, return false w/out detail checking
    if (builtStack.length !== this.targetStack.length) {
      return false;
    }

    //if length DOES match, check each ingredient
    for (let i = 0; i < this.targetStack.length; i++) {
      if (builtStack[i] !== this.targetStack[i]) {
        return false;
      }
    }
    
    return true; //pass matching check
  }

  calculatePrice(priceMarkup, serviceFee) {
    //calculates target price of customer's order
    let baseCost = 0;
    
    for (let i = 0; i < this.targetStack.length; i++) {
      let id = this.targetStack[i];
      let data = getIngredientById(id);
      
      if (data && data.cost) {
        baseCost += data.cost;
      }
    }
    
    return (baseCost * priceMarkup) + serviceFee;
  }
}