//—— DAY MANAGER ——————————————————————————————————————————————————————————————————————————————————————

const DAYS = {
  1: {
    pointsGoal: 0, //tbd
    markupRate: 1.2,
    serviceFee: 1.00,
    utilities: 0.00,
  },
  2: {
    pointsGoal: 0,
    markupRate: 1.3,
    serviceFee: 2.50,
    utilities: 5.00,
  },
  3: {
    pointsGoal: 0,
    markupRate: 1.4,
    serviceFee: 2.50,
    utilities: 10.00,
  },
  4: {
    pointsGoal: 0,
    markupRate: 1.5,
    serviceFee: 3.00,
    utilities: 10.00,
  },
  5: {
    pointsGoal: 0,
    markupRate: 1.6,
    serviceFee: 4.25,
    utilities: 15.00,
  },
  6: {
    pointsGoal: 0,
    markupRate: 1.8,
    serviceFee: 5.75,
    utilities: 20.00,
  },
  7: {
    pointsGoal: 0,
    markupRate: 2.0,
    serviceFee: 9.00,
    utilities: 20.00,
  }
};

class Day {
  constructor() {
    this.currentDay = 1;
    this.totalCash = 100; // starting cash
    this.burgerPoints = 0;

    //———————— DAILY TRACKING ————————
    this.dailySales = 0;
    this.dailyTips = 0;
    this.dailyExpenses = 0;
    this.dailyRefunds = 0;

    //———————— UNLOCK SYSTEM ————————
    //***TEMPORARY FOR TESTING, REPLACE LATER WITH SHOP LOGIC***
    this.unlockedIngredients = ["bun_bottom", "bun_top", "beef", "lettuce", "ketchup"];
  }

  getConfig() {
    //Get curr day's data
    if (DAYS[this.currentDay]) return DAYS[this.currentDay];
    else return DAYS[7];
  }

  getDailyNet() {
    // Calculate net money
    let config = this.getConfig();
    return (this.dailySales+this.dailyTips)-(this.dailyExpenses+this.dailyRefunds+config.utilities);
  }

  isGoalReached() {
    // Check if there is enough xp to pass
    if (this.burgerPoints >= this.getConfig().pointsGoal) {
      return true;
    }
  }

  resetDailyTrackers() {
    this.dailySales = 0;
    this.dailyTips = 0;
    this.dailyExpenses = 0;
    this.dailyRefunds = 0;
  }

  nextDay() {
    if (this.currentDay < 7) {
      this.currentDay++;
      this.dailyEarnings = 0; // Reset for the new shift
      return true;
    }
    return false; // Game done
  }

  //———————— TRANSACTIONS LOGIC ————————

  logExpense(amount) {
    // Handling Expenses (used by ui.js)
    this.dailyExpenses += amount;
    this.totalCash -= amount;
  }

  logSale(amount) {
    // Handling Sales (used by order.js)
    this.dailySales += amount;
    this.totalCash += amount;
  }

  logTip(amount) {
    // Handling Tips (used by order.js)
    this.dailyTips += amount;
    this.totalCash += amount;
  }

  
  logRefund(amount) {
    // Handling Refunds (used by order.js)
    this.dailyRefunds += amount;
    this.totalCash -= amount;
  }

  logPoints(amount) {
    // Handling Burger Points (used by order.js)
    this.burgerPoints += amount;
  }
}