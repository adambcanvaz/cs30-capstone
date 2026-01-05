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

const SHOP_ITEMS = [

  //———————— DAY 2 ————————
  { id: "american_cheese", name: "American Cheese", price: 30, unlockDay: 2 },
  { id: "tomato", name: "Fresh Tomato", price: 25, unlockDay: 2 },
  { id: "mustard", name: "Mustard", price: 20, unlockDay: 2 },

  //———————— DAY 3 ————————
  { id: "chicken", name: "Butterfly Chicken", price: 50, unlockDay: 3 },
  { id: "pickles", name: "Pickles", price: 30, unlockDay: 3 },
  { id: "mayo", name: "Mayonnaise", price: 25, unlockDay: 3 },

  //———————— DAY 4 ————————
  { id: "veggie_patty", name: "Veggie Patty", price: 55, unlockDay: 4 },
  { id: "mushrooms", name: "Mushrooms", price: 40, unlockDay: 4 },
  { id: "red_onion", name: "Red Onion", price: 35, unlockDay: 4 },

  //———————— DAY 5 ————————
  { id: "bacon", name: "Crispy Bacon", price: 65, unlockDay: 5 },
  { id: "cheddar_cheese", name: "Cheddar Cheese", price: 50, unlockDay: 5 },
  { id: "bbq", name: "BBQ", price: 40, unlockDay: 5 },

  //———————— DAY 6 ————————
  { id: "jalapeno", name: "Jalapenos", price: 45, unlockDay: 6 },
  { id: "chili", name: "Chili Peppers", price: 45, unlockDay: 6 },
  { id: "swiss_cheese", name: "Swiss Cheese", price: 50, unlockDay: 6 },
  { id: "wasabi", name: "Wasabi", price: 60, unlockDay: 6 },

  //———————— DAY 7 ————————
  { id: "fried_egg", name: "Fried Egg", price: 80, unlockDay: 7 },
  { id: "sausage", name: "Sausage", price: 70, unlockDay: 7 },
  { id: "fried_onion", name: "Fried Onions", price: 60, unlockDay: 7 },
  { id: "restaurant_sauce", name: "Restaurant Sauce", price: 90, unlockDay: 7 }
];

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
    this.servedCustomers = [];
    this.dailyReport = [];

    //———————— TIME SYSTEM ————————
    this.startHour = 8; //8AM
    this.endHour = 18; //6PM
    this.totalShiftMinutes = (this.endHour-this.startHour)*60;
    this.elapsedMinutes = 0;
    this.isShiftActive = false;
    this.realShiftMinutes = 6;

    //———————— UNLOCK SYSTEM ————————
    this.unlockedIngredients = ["bun_bottom", "bun_top", "beef", "lettuce", "ketchup"]; // day 1
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

  generateDailyReport(){
    // generates end-of-day summary BEFORE resetting
    let config = this.getConfig();

    return this.dailyReport = {
      sales: this.dailySales,
      supplies: this.dailyExpenses,
      tips: this.dailyTips,
      refunds: this.dailyRefunds,
      utilities: config.utilities,
      total: this.getDailyNet()
    };
  }

  resetDailyTrackers() {
    this.dailySales = 0;
    this.dailyTips = 0;
    this.dailyExpenses = 0;
    this.dailyRefunds = 0;
    this.servedCustomers = [];
  }

  nextDay() {
    if (this.currentDay < 7) {
      this.currentDay++;
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

  //———————— SHIFT TIME LOGIC ————————

  startShift(){
    this.isShiftActive = true;
    this.elapsedMinutes = 0;
    this.resetDailyTrackers();
  }

  endShift(){
    this.generateDailyReport();
    this.isShiftActive = false;
  }

  startTime(){
    let realSeconds = this.realShiftMinutes*60;
    let increment = this.totalShiftMinutes/(realSeconds*60);

    this.updateTime(increment);
  }

  updateTime(amount){
    if(!this.isShiftActive) return;
    this.elapsedMinutes += amount;
    if(this.elapsedMinutes > this.totalShiftMinutes) this.elapsedMinutes = this.totalShiftMinutes;
  }

  getClockFormat(){
    // converts time into 00:00AM/PM format
    let totalMinutes = (this.startHour*60)+this.elapsedMinutes;
    let hours = floor(totalMinutes/60);
    let minutes = floor(totalMinutes % 60);
    let amPM;
    
    if(hours >= 12) amPM = "PM";
    else if(hours < 12) amPM = "AM";

    // from 24hr format to 12
    let displayHours = hours%12;
    if(displayHours === 0) displayHours = 12;
    
    // for minutes from 1 to 9 (put 0 in front)
    let displayMinutes;
    if(minutes < 10) displayMinutes = "0" + minutes;
    else if(minutes >= 10) displayMinutes = minutes;

    return displayHours + ":" + displayMinutes + " " + amPM;
  }

  //———————— SHOP LOGIC ————————

  buyItem(itemId){
    // purchase ingredient from end-of-day shop
    
    // Finding the item in the list
    let item;
    for(let i = 0; i < SHOP_ITEMS.length; i++){
      if(SHOP_ITEMS[i].id === itemId){
        item = SHOP_ITEMS[i];
        break; // Exit once found
      }
    }

    // Check if enough money
    if(this.totalCash >= item.price){
      this.totalCash -= item.price;
      this.unlockedIngredients.push(item.id);
      return true;
    }
    return false;
  }

  isUnlocked(itemId){
    return this.unlockedIngredients.includes(itemId);
  }
}