//—— DAY MANAGER ——————————————————————————————————————————————————————————————————————————————————————
// Manages the core game data including time tracking, 
// financial calculations, daily progression, and the Save/Load system.

const DAYS = {
  1: { 
    pointsGoal: 100,
    markupRate: 2.2,
    serviceFee: 3.00,
    utilities: 15.00,
  },
  2: { 
    pointsGoal: 150, 
    markupRate: 2.4, 
    serviceFee: 4.00, 
    utilities: 20.00,
  },
  3: { 
    pointsGoal: 250, 
    markupRate: 2.6, 
    serviceFee: 5.00, 
    utilities: 30.00, 
  },
  4: { 
    pointsGoal: 375, 
    markupRate: 2.8, 
    serviceFee: 6.00, 
    utilities: 40.00, 
  },
  5: { 
    pointsGoal: 500, 
    markupRate: 3.0, 
    serviceFee: 7.00, 
    utilities: 50.00, 
  },
  6: { 
    pointsGoal: 650, 
    markupRate: 3.3, 
    serviceFee: 8.50, 
    utilities: 60.00, 
  },
  7: { 
    pointsGoal: 800, 
    markupRate: 3.6, 
    serviceFee: 10.00, 
    utilities: 80.00, 
  }
};

// ——— SAVE SYSTEM CONSTANT ———
const SAVE_KEY = "game_save";

function saveGame() {
  let data = day.exportData();
  storeItem(SAVE_KEY, data);
  console.log("Game Saved!");
}

function loadGame() {
  let data = getItem(SAVE_KEY);
  
  if (data) {
    day.importData(data);
    return true; 
  }
  return false;
}

function hasSaveFile() {
  return getItem(SAVE_KEY) !== null;
}

function clearSave() {
  removeItem(SAVE_KEY);
  console.log("Save Cleared!");
}

class Day {
  constructor() {
    this.currentDay = 1;
    this.totalCash = 100; // starting cash
    this.burgerPoints = 0;

    // SNAPSHOT VARIABLES (For Retry Logic)
    this.startOfDayCash = 100;
    this.startOfDayPoints = 0;

    //———————— DAILY TRACKING ————————
    this.resetDailyTrackers();

    //———————— TIME SYSTEM ————————
    this.startHour = 8; // 8 AM
    this.endHour = 18;  // 6 PM
    this.totalShiftMinutes = (this.endHour - this.startHour) * 60;
    this.elapsedMinutes = 0;
    this.isShiftActive = false;
    this.realShiftMinutes = 3; // How long a day lasts in real minutes

    //———————— UNLOCK SYSTEM ————————
    this.unlockedIngredients = ["bun_bottom", "bun_top", "beef", "lettuce", "ketchup"];  // day 1
  }

  getConfig() {
    //Get curr day's data
    if (DAYS[this.currentDay]) return DAYS[this.currentDay];
    else return DAYS[7];
  }

  getDailyNet() {
    // Calculate net money
    let config = this.getConfig();
    return (this.dailySales + this.dailyTips) - (this.dailyExpenses + this.dailyRefunds + config.utilities);
  }

  generateDailyReport() {
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

  isGoalReached() {
    // Check if there is enough xp to pass
    return this.burgerPoints >= this.getConfig().pointsGoal;
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
    return false;
  }

  revertToStartOfDay() {
    // Restore the snapshot if player fails/retries
    this.totalCash = this.startOfDayCash;
    this.burgerPoints = this.startOfDayPoints;
    
    this.resetDailyTrackers();
  }

  //———————— TRANSACTIONS ————————

  logExpense(amount) { this.dailyExpenses += amount; this.totalCash -= amount; }
  logSale(amount)    { this.dailySales += amount;    this.totalCash += amount; }
  logTip(amount)     { this.dailyTips += amount;     this.totalCash += amount; }
  logRefund(amount)  { this.dailyRefunds += amount;  this.totalCash -= amount; }
  logPoints(amount)  { this.burgerPoints += amount; }

  //———————— SHIFT TIME LOGIC ————————

  startShift() {
    this.isShiftActive = true;
    this.elapsedMinutes = 0;
    this.resetDailyTrackers();
  }

  endShift() {
    this.generateDailyReport();
    this.isShiftActive = false;
  }

  startTime() {
    let realSeconds = this.realShiftMinutes * 60;
    let increment = this.totalShiftMinutes / (realSeconds * 60);
    this.updateTime(increment);
  }

  updateTime(amount) {
    if (!this.isShiftActive) return;
    this.elapsedMinutes += amount;
    if (this.elapsedMinutes > this.totalShiftMinutes) this.elapsedMinutes = this.totalShiftMinutes;
  }

  getClockFormat() {
    // converts time into 00:00AM/PM format

    let totalMinutes = (this.startHour * 60) + this.elapsedMinutes;
    let hours = floor(totalMinutes / 60);
    let minutes = floor(totalMinutes % 60);

    let amPM;
    if(hours >= 12) amPM = "PM";
    else if(hours < 12) amPM = "AM";

    let displayHours = hours % 12;
    
    if (displayHours === 0) displayHours = 12;
    
    // for minutes from 1 to 9 (put 0 in front)
    let displayMinutes;
    if(minutes < 10) displayMinutes = "0" + minutes;
    else if(minutes >= 10) displayMinutes = minutes;

    return displayHours + ":" + displayMinutes + " " + amPM;
  }

  //———————— UPGRADE LOGIC ————————

  getUpgradeMultiplier(type) {
    if (type === "patience_decay") {
      let multiplier = 1.0;
      if (this.unlockedIngredients.includes("upgrade_patience_1")) multiplier *= 0.8;
      if (this.unlockedIngredients.includes("upgrade_patience_2")) multiplier *= 0.8;
      return multiplier;
    }
    if (type === "tip_rate") {
      let multiplier = 1.0;
      if (this.unlockedIngredients.includes("upgrade_tips_1")) multiplier += 0.2;
      return multiplier;
    }
    return 1.0;
  }

  //———————— SAVE SYSTEM ————————

  exportData() {
    return {
      currentDay: this.currentDay,
      totalCash: this.totalCash,
      burgerPoints: this.burgerPoints,
      unlockedIngredients: this.unlockedIngredients,
      dailyReport: this.dailyReport
    };
  }

  importData(data) {
    if(!data) return;
    this.currentDay = data.currentDay || 1;
    this.totalCash = data.totalCash || 0;
    this.burgerPoints = data.burgerPoints || 0;
    this.unlockedIngredients = data.unlockedIngredients || ["bun_bottom", "bun_top", "beef", "lettuce", "ketchup"];
    
    // Reset trackers first
    this.resetDailyTrackers();

    // THEN load the report (so resetDailyTrackers doesn't override it)
    this.dailyReport = data.dailyReport;
  }
}