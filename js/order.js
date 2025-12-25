//—— ORDERING SYSTEM ——————————————————————————————————————————————————————————————————————————————————————

class Order {
  constructor(currentDay) {
    this.targetStack = [];
    this.generateRandomOrder(currentDay);
  }

  generateRandomOrder(day) {
    // Generate a burger order based on category limits
    this.targetStack = [];

    //———————— RULES ————————
    this.targetStack.push("bun_bottom"); //always bottom bun first

    // makes sure there is at least 1 protein.
    let availableProteins = getCategoryItemsByDay("proteins", day);
    if (availableProteins.length > 0) {
      let randomProtein = this.pickOneItem(availableProteins);
      this.targetStack.push(randomProtein.id);
    }

    //50 percent chance of adding 1 cheese
    let availableCheeses = getCategoryItemsByDay("cheese", day);
    if (availableCheeses.length > 0 && random() > 0.5) {
      let randomCheese = this.pickOneItem(availableCheeses);
      this.targetStack.push(randomCheese.id);
    }

    //random veggies (1 to 3)
    let availableVeggies = getCategoryItemsByDay("veggies", day);
    if (availableVeggies.length > 0) {
      let veggieCount = floor(random(1, 4));
      let chosenVeggies = this.pickMultipleItems(availableVeggies, veggieCount);
      for (let i = 0; i < chosenVeggies.length; i++) {
        this.targetStack.push(chosenVeggies[i].id);
      }
    }

    //random sauces (none to 2)
    let availableSauces = getCategoryItemsByDay("sauces", day);
    if (availableSauces.length > 0 && random() > 0.5) {
      let sauceCount = floor(random(0, 3));
      let chosenSauces = this.pickMultipleItems(availableSauces, sauceCount);
      for (let i = 0; i < chosenSauces.length; i++) {
        this.targetStack.push(chosenSauces[i].id);
      }
    }

    this.targetStack.push("bun_top"); //always end with top bun last
  }

  //helper to randomly pick a single item
  pickOneItem(sourceList) {
    let item = floor(random(0, sourceList.length));
    return sourceList[item];
  }

  //helper to randomly pick multiple items (without same item more than once)
  pickMultipleItems(sourceList, amountNeeded) {
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
  }
}