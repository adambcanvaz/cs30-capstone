//—— SHOP MANAGER ——————————————————————————————————————————————————————————————————————————————————————
// Handles the economy logic, displaying purchasable items, 
// and unlocking new ingredients or upgrades based on the player's cash.

const SHOP_ITEMS = [
  // DAY 2
  { id: "american_cheese", name: "American Cheese", price: 30, unlockDay: 2, category: "cheese" },
  { id: "tomato", name: "Fresh Tomato", price: 25, unlockDay: 2, category: "toppings" },
  { id: "mustard", name: "Mustard", price: 20, unlockDay: 2, category: "sauces" },
  
  // DAY 3
  { id: "chicken", name: "Butterfly Chicken", price: 50, unlockDay: 3, category: "fillings" },
  { id: "pickles", name: "Pickles", price: 30, unlockDay: 3, category: "toppings" },
  { id: "mayo", name: "Mayonnaise", price: 25, unlockDay: 3, category: "sauces" },
  
  // DAY 4
  { id: "veggie_patty", name: "Veggie Patty", price: 55, unlockDay: 4, category: "fillings" },
  { id: "mushrooms", name: "Mushrooms", price: 40, unlockDay: 4, category: "toppings" },
  { id: "red_onion", name: "Red Onion", price: 35, unlockDay: 4, category: "toppings" },
  
  // DAY 5
  { id: "bacon", name: "Crispy Bacon", price: 65, unlockDay: 5, category: "extras" },
  { id: "cheddar_cheese", name: "Cheddar Cheese", price: 50, unlockDay: 5, category: "cheese" },
  { id: "bbq", name: "BBQ", price: 40, unlockDay: 5, category: "sauces" },
  
  // DAY 6
  { id: "jalapeno", name: "Jalapenos", price: 45, unlockDay: 6, category: "extras" },
  { id: "chili", name: "Chili Peppers", price: 45, unlockDay: 6, category: "extras" },
  { id: "swiss_cheese", name: "Swiss Cheese", price: 50, unlockDay: 6, category: "cheese" },
  { id: "wasabi", name: "Wasabi", price: 60, unlockDay: 6, category: "sauces" },
  
  // DAY 7
  { id: "fried_egg", name: "Fried Egg", price: 80, unlockDay: 7, category: "extras" },
  { id: "sausage", name: "Sausage", price: 70, unlockDay: 7, category: "extras" },
  { id: "fried_onion", name: "Fried Onions", price: 60, unlockDay: 7, category: "extras" },
  { id: "restaurant_sauce", name: "Restaurant Sauce", price: 90, unlockDay: 7, category: "sauces" },
  
  // UPGRADES
  { id: "upgrade_patience_1", name: "Comfy Stools", price: 100, unlockDay: 2, category: "upgrades" },
  { id: "upgrade_tips_1", name: "Golden Tip Jar", price: 150, unlockDay: 3, category: "upgrades" },
  { id: "upgrade_patience_2", name: "Ambient Music", price: 250, unlockDay: 5, category: "upgrades" }
];

class ShopManager {
  constructor() {
    this.cards = [];
    this.categoryBtns = [];
    this.activeCategory = "new";

    //———————— SIDEBAR SETUP ————————
    let sidebarWidth = width * 0.32;
    let sidebarCenter = sidebarWidth / 2;
    let categories = ["new", "fillings", "cheese", "toppings", "extras", "sauces", "upgrades"];
    
    let btnW = sidebarWidth - 40;
    let btnH = 35;
    let btnGap = 15;
    let startY = 160;

    for (let i = 0; i < categories.length; i++) {
      let catName = categories[i];
      let label = catName.charAt(0).toUpperCase() + catName.slice(1);
      
      let btnX = sidebarCenter - (btnW / 2);
      let btnY = startY + (i * (btnH + btnGap));
      
      let btn = new GameButton(btnX, btnY, btnW, btnH, label, "shop", () => {
        this.switchCategory(catName);
      });
      
      this.categoryBtns.push({ name: catName, btn: btn });
    }

    //———————— NAVIGATION BUTTONS ————————
    this.receiptBtn = new GameButton(20, height - 80, 150, 50, "View Receipt", "general", () => {
      sceneManager.state = "summary";
    });

    this.nextDayBtn = new GameButton(width - 170, height - 80, 150, 50, "Next Day", "general", () => {
      day.nextDay();
      // Fade out, then start the day when screen is black
      sceneManager.switchScene("restaurant", () => {
        sceneManager.startDay();
      });
    });
  }

  switchCategory(catName) {
    this.activeCategory = catName;
    this.refresh();
  }

  refresh() {
    // rebuilds the list of cards based on category
    this.cards = [];
    
    let panelX = width * 0.32;
    let startX = panelX + 30;
    let startY = 160;
    let gapX = 160;
    let gapY = 200;
    
    let itemsPerRow = floor((width - startX) / gapX);
    if (itemsPerRow < 1) itemsPerRow = 1;

    let availableItems;
    if (this.activeCategory === "new") {
      availableItems = SHOP_ITEMS.filter(item => item.unlockDay === day.currentDay + 1);
    } else {
      availableItems = SHOP_ITEMS.filter(item => item.category === this.activeCategory);
    }

    let col = 0;
    let row = 0;
    
    for (let data of availableItems) {
      let x = startX + (col * gapX);
      let y = startY + (row * gapY);
      
      let newCard = new ShopCard(data, x, y, () => { 
        this.attemptBuy(data.id); 
      });
      
      this.cards.push(newCard);
      
      col++;
      if (col >= itemsPerRow) { 
        col = 0; 
        row++; 
      }
    }
  }

  attemptBuy(itemId) {
    // transaction logic
    let item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) return;
    
    // Prevent buying items from future days
    if (item.unlockDay > day.currentDay + 1) return; 

    let isOwned = day.unlockedIngredients.includes(item.id);
    let canAfford = day.totalCash >= item.price;

    if (!isOwned && canAfford) {
      day.totalCash -= item.price;
      day.unlockedIngredients.push(item.id);
    }
  }

  display() {
    // Background
    if(summaryShopBg) image(summaryShopBg, width / 2, height / 2, width, height);
    
    // Draw Sidebar Panel
    let panelX = width * 0.32;
    push(); 
    stroke(255); strokeWeight(3); fill(61, 43, 43, 215);
    rect(panelX, 130, width, height - 240, 20); 
    pop();

    // Draw Categories
    for (let item of this.categoryBtns) { 
      item.btn.update(mouseX, mouseY); 
      item.btn.display(); 
    }
    
    this.receiptBtn.update(mouseX, mouseY); 
    this.receiptBtn.display();

    // Draw Cards
    for (let card of this.cards) {
      let isOwned = day.unlockedIngredients.includes(card.data.id);
      let canAfford = day.totalCash >= card.data.price;
      let isLocked = card.data.unlockDay > (day.currentDay + 1);
      
      card.display(isOwned, canAfford, isLocked);
    }

    this.nextDayBtn.update(mouseX, mouseY);
    this.nextDayBtn.display();
    
    // HUD
    sceneManager.drawHUD();
  }

  handleClick(mx, my) {
    this.nextDayBtn.handleClick(mx, my);
    this.receiptBtn.handleClick(mx, my);
    
    for (let item of this.categoryBtns) { 
      item.btn.handleClick(mx, my); 
    }
    
    for (let card of this.cards) { 
      card.handleClick(mx, my); 
    }
  }
}