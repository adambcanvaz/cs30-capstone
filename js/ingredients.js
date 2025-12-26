//—— iNGREDIENTS SYSTEM ——————————————————————————————————————————————————————————————————————————————————————

const INGREDIENTS = {
  buns: [
    {
      id: "bun_bottom",
      img: "assets/food/buns/bun_bottom.png",
      unlockDay: 1,
      type: "bun-bottom"
    },
    {
      id: "bun_top",
      img: "assets/food/buns/bun_top.png",
      unlockDay: 1,
      type: "bun-top"
    }
  ],

  proteins: [
    {
      id: "beef",
      img: "assets/food/proteins/halfpound_cooked.png",
      unlockDay: 1,
      type: "protein",
      xOffset: 0,
      yOffset: -4
    },
    {
      id: "chicken",
      img: "assets/food/proteins/chicken_cooked.png",
      unlockDay: 4,
      type: "protein"
    },
    {
      id: "bacon",
      img: "assets/food/proteins/bacon_cooked.png",
      unlockDay: 4,
      type: "protein"
    },
    {
      id: "veggie_patty",
      img: "assets/food/proteins/veggie_cooked.png",
      unlockDay: 6,
      type: "protein"
    }
  ],

  cheese: [
    {
      id: "american_cheese",
      img: "assets/food/cheese/american_slice.png",
      unlockDay: 2,
      type: "cheese",
      xOffset: -1,
      yOffset: 1
    },
    {
      id: "cheddar_cheese",
      img: "assets/food/cheese/cheddar_slice.png",
      unlockDay: 5,
      type: "cheese",
      xOffset: -1,
      yOffset: 1
    }
  ],

  veggies: [
    {
      id: "lettuce",
      img: "assets/food/veggies/lettuce_leaf.png",
      unlockDay: 2,
      type: "veggie"
    },
    {
      id: "tomato",
      img: "assets/food/veggies/tomato_slices.png",
      unlockDay: 2,
      type: "veggie"
    },
    {
      id: "red_onion",
      img: "assets/food/veggies/red_onions.png",
      unlockDay: 3,
      type: "veggie"
    },
    {
      id: "mushrooms",
      img: "assets/food/veggies/cooked_mushrooms.png",
      unlockDay: 5,
      type: "veggie"
    },
    {
      id: "jalapeno",
      img: "assets/food/veggies/jalapeno_peppers.png",
      unlockDay: 5,
      type: "veggie"
    }
  ],

  sauces: [
    {
      id: "ketchup",
      img: "assets/food/sauces/ketchup_sauce.png",
      unlockDay: 1,
      type: "sauce"
    },
    {
      id: "mustard",
      img: "assets/food/sauces/mustard_sauce.png",
      unlockDay: 3,
      type: "sauce"
    },
    {
      id: "mayo",
      img: "assets/food/sauces/mayo_sauce.png",
      unlockDay: 3,
      type: "sauce"
    },
    {
      id: "restaurant_sauce",
      img: "assets/food/sauces/burger_sauce.png",
      unlockDay: 6,
      type: "sauce"
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

function getCategoryItemsByDay(categoryKey, currentDay) {
  //Returns ingredients available for a specific category for the day
  let categoryArray = INGREDIENTS[categoryKey];
  let filteredIngredients = [];

  for (let i = 0; i < categoryArray.length; i++) {
    let item = categoryArray[i];
    if (item.unlockDay <= currentDay) {
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