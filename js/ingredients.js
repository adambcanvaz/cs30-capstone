//—— INGREDIENTS SYSTEM ——————————————————————————————————————————————————————————————————————————————————————

let ingredientAssets = {};

const INGREDIENTS = {
  buns: [
    {
      id: "bun_bottom",
      img: "assets/food/buns/bun_bottom.png",
      unlockDay: 1,
      type: "bun-bottom",
      cost: 0.28
    },
    {
      id: "bun_top",
      img: "assets/food/buns/bun_top.png",
      unlockDay: 1,
      type: "bun-top",
      cost: 0.28
    }
  ],

  fillings: [
    {
      id: "beef",
      img: "assets/food/fillings/halfpound_cooked.png",
      unlockDay: 1,
      type: "filling",
      cost: 2.43,
      xOffset: 0,
      yOffset: -4
    },
    {
      id: "chicken",
      img: "assets/food/fillings/chicken_cooked.png",
      unlockDay: 3,
      type: "filling",
      cost: 3.02
    },
    {
      id: "veggie_patty",
      img: "assets/food/fillings/veggie_cooked.png",
      unlockDay: 4,
      type: "filling",
      cost: 3.46,
      scale: 0.94,
      yOffset: -5
    }
  ],

  cheese: [
    {
      id: "american_cheese",
      img: "assets/food/cheese/american_slice.png",
      unlockDay: 2,
      type: "cheese",
      cost: 0.33,
      xOffset: -1,
      yOffset: 1
    },
    {
      id: "cheddar_cheese",
      img: "assets/food/cheese/cheddar_slice.png",
      unlockDay: 5,
      type: "cheese",
      cost: 0.68,
      xOffset: -1,
      yOffset: 1
    },
    {
      id: "swiss_cheese",
      img: "assets/food/cheese/swiss_slice.png",
      unlockDay: 6,
      type: "cheese",
      cost: 0.92,
      xOffset: -1,
      yOffset: 1
    }
  ],

  veggies: [
    {
      id: "lettuce",
      img: "assets/food/veggies/lettuce_leaf.png",
      unlockDay: 1,
      type: "veggie",
      cost: 0.17
    },
    {
      id: "tomato",
      img: "assets/food/veggies/tomato_slices.png",
      unlockDay: 2,
      type: "veggie",
      cost: 0.38, // for 3 slices
      scale: 0.95,
      yOffset: 2
    },
    {
      id: "pickles",
      img: "assets/food/veggies/pickles.png",
      unlockDay: 3,
      type: "veggie",
      cost: 0.37, // for 3 slices
      scale: 0.85,
      xOffset: 2,
      yOffset: 9
    },
    {
      id: "red_onion",
      img: "assets/food/veggies/red_onions.png",
      unlockDay: 4,
      type: "veggie",
      cost: 0.42, // for 3 rings
      scale: 0.90,
      yOffset: 4
    },
    {
      id: "mushrooms",
      img: "assets/food/veggies/cooked_mushrooms.png",
      unlockDay: 4,
      type: "veggie",
      cost: 0.50,
      scale: 0.65, // for 6 pieces
      yOffset: 4,
      xOffset: 1
    },
    {
      id: "bell_peppers",
      img: "assets/food/veggies/bell_peppers.png",
      unlockDay: 7,
      type: "veggie",
      cost: 0.81, // for 3 slices
      scale: 0.90,
      yOffset: 3
    }
  ],

  extras: [
    {
      id: "bacon",
      img: "assets/food/extras/bacon.png",
      unlockDay: 5,
      type: "extras",
      cost: 1.76, // for 2 strips
      yOffset: 6
    },
    {
      id: "sausage",
      img: "assets/food/extras/sausage.png",
      unlockDay: 7,
      type: "extras",
      cost: 1.60 // for 3 slices
    },
    {
      id: "fried_egg",
      img: "assets/food/extras/fried_egg.png",
      unlockDay: 7,
      type: "extras",
      cost: 0.91
    },
    {
      id: "jalapeno",
      img: "assets/food/extras/jalapeno_peppers.png",
      unlockDay: 6,
      type: "extras",
      cost: 0.44, // for 4 slices
      scale: 0.75,
      yOffset: 2
    },
    {
      id: "chili",
      img: "assets/food/extras/chili_peppers.png",
      unlockDay: 6,
      type: "extras",
      cost: 1.12 // for 4 slices
    },
    {
      id: "fried_onion",
      img: "assets/food/extras/fried_onion.png",
      unlockDay: 7,
      type: "extras",
      cost: 1.16, // for 4 slices
    }
  ],

  sauces: [
    {
      id: "ketchup",
      img: "assets/food/sauces/ketchup_sauce.png",
      unlockDay: 1,
      type: "sauce",
      cost: 0.15
    },
    {
      id: "mustard",
      img: "assets/food/sauces/mustard_sauce.png",
      unlockDay: 2,
      type: "sauce",
      cost: 0.15
    },
    {
      id: "mayo",
      img: "assets/food/sauces/mayo_sauce.png",
      unlockDay: 3,
      type: "sauce",
      cost: 0.15
    },
    {
      id: "bbq",
      img: "assets/food/sauces/bbq_sauce.png",
      unlockDay: 5,
      type: "sauce",
      cost: 0.35
    },
    {
      id: "wasabi",
      img: "assets/food/sauces/wasabi_sauce.png",
      unlockDay: 6,
      type: "sauce",
      cost: 0.65
    },
    {
      id: "restaurant_sauce",
      img: "assets/food/sauces/burger_sauce.png",
      unlockDay: 7,
      type: "sauce",
      cost: 1.00
    }
  ]
};

function getAvailableIngredients(currentDay) {
  //Returns ingredients available for the day
  let dailyAvailableList = [];

  for (let categoryKey in INGREDIENTS) {
    let ingredientsList = INGREDIENTS[categoryKey];
    for (let i = 0; i < ingredientsList.length; i++) {
      let ingredientItem = ingredientsList[i];
      if (ingredientItem.unlockDay <= currentDay) { // checks if item is available
        dailyAvailableList.push(ingredientItem);
      }
    }
  }

  return dailyAvailableList;
}

function getCategoryItemsByDay(categoryKey, currentDay, unlockedIngredients) {
  //Returns ingredients available for a specific category for the day
  let categoryArray = INGREDIENTS[categoryKey];
  let filteredIngredients = [];

  for (let i = 0; i < categoryArray.length; i++) {
    let item = categoryArray[i];
    if (item.unlockDay <= currentDay && unlockedIngredients && unlockedIngredients.includes(item.id)) {
      filteredIngredients.push(item);
    }
  }
  return filteredIngredients;
}

function getIngredientById(targetId) {
  // find and return the ingredient by its ID
  for (let categoryKey in INGREDIENTS) {
    let ingredientsList = INGREDIENTS[categoryKey];
    for (let i = 0; i < ingredientsList.length; i++) { //loop thru every ing
      let ingredientItem = ingredientsList[i];
      if (ingredientItem.id === targetId) { // checks and returns if satisfeid
        return ingredientItem;
      }
    }
  }
  return null; // return as non existent if ing not found
}

function loadIngredients() {
  // Preload all ingredient images
  for (let categoryKey in INGREDIENTS) {
    let ingredientItems = INGREDIENTS[categoryKey];

    for (let i = 0; i < ingredientItems.length; i++) { // goes through each ingredient in category
      let item = ingredientItems[i];
      ingredientAssets[item.id] = loadImage(item.img); //store the ingredient's image
    }
  }
}