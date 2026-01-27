//—— GAME USER INTERFACE ——————————————————————————————————————————————————————————————————————————————————————
// A library of reusable interface components such as Buttons, 
// the Heads-Up Display (HUD), Speech Bubbles, and the Receipt system.

let uiIcons = {};
let sfx = {};

const UI_STYLE = {
  globalRadius: 11.5,
  shadowOffset: 4,

  hud: {
    height: 28, fontSize: 16, textYOffset: -2, iconSize: 40,
    colors: {
      fill: ["rgba(61, 43, 43, 0.80)"],
      innerStroke: ["rgba(255, 244, 227, 1)"],
      outerStroke: ["rgba(107, 17, 36, 1)"],
      text: ["rgba(255, 244, 227, 1)"],
      textStroke: ["rgba(107, 17, 36, 1)"]
    },
    weights: { outer: 7, inner: 2.75, text: 2 }
  },

  button: {
    height: 40, textYOffset: -2, outerStroke: ["rgba(107, 17, 36, 1)"], fontSize: 18,
    weights: { stroke: 4, text: 2 },
    variants: {
      general: { top: ["rgba(163, 189, 74, 1)"], shadow: ["rgba(105, 139, 4, 1)"], hover: ["rgba(105, 139, 4, 1)"], text: ["rgba(255, 244, 227, 1)"], textStroke: ["rgba(107, 17, 36, 1)"] },
      clarify: { top: ["rgba(255, 240, 223, 1)"], shadow: ["rgba(219, 184, 169, 1)"], hover: ["rgba(219, 184, 169, 1)"], text: ["rgba(255, 244, 227, 1)"], textStroke: ["rgba(107, 17, 36, 1)"] },
      shop: { top: ["rgba(120, 137, 185, 1)"], shadow: ["rgba(74, 93, 159, 1)"], hover: ["rgba(74, 93, 159, 1)"], text: ["rgba(255, 244, 227, 1)"], textStroke: ["rgba(107, 17, 36, 1)"] }
    }
  },

  bubble: {
    tailSize: 15, fontSize: 13,
    colors: { fill: ["rgba(255, 240, 223, 1)"], shadow: ["rgba(219, 184, 169, 1)"], outerStroke: ["rgba(107, 17, 36, 1)"], text: ["rgba(107, 17, 36, 1)"] },
    weights: { stroke: 4 }
  },

  ticket: {
    collapsedW: 50,  collapsedH: 60,
    expandedW: 255, expandedH: 365,    
    colors: { 
      fill: ["rgb(245, 236, 228)"], 
      stroke: ["rgba(107, 17, 36, 1)"], 
      text: ["rgba(77, 21, 27, 1)"],
      header: ["rgba(107, 17, 36, 1)"] 
    },
    weights: { stroke: 1.5 }
  },

  receipt: {
    colors: { 
      fill: ["rgba(255, 255, 255, 1)"], 
      shadow: ["rgba(200, 200, 200, 1)"],
      outerStroke: ["rgba(107, 17, 36, 1)"],
      innerStroke: ["rgba(200, 200, 200, 1)"],
      text: ["rgba(50, 50, 50, 1)"] 
    },
    weights: { stroke: 4, separator: 2 },
    fontSize: { header: 32, subheader: 18, body: 20, total: 28 }
  },

  shopCard: {
    width: 140, height: 180,
    colors: { background: ["rgba(255, 240, 223, 1)"], stroke: ["rgba(107, 17, 36, 1)"], text: ["rgba(61, 43, 43, 1)"], ownedText: ["rgba(150, 150, 150, 1)"] },
    weights: { stroke: 3 }
  }
};

function loadUIIcons() {
  // loads the specific icons for the top bar
  uiIcons.money = loadImage("assets/interface/hud/cash_icon.png");
  uiIcons.clock = loadImage("assets/interface/hud/customer_patience_icon.png");
  uiIcons.xp = loadImage("assets/interface/hud/burger_points_icon.png");
  uiIcons.day = loadImage("assets/interface/hud/day_time_icon.png");
}

function loadSounds() {
  // loads sounds for different scenes
  soundFormats('mp3');
  sfx.buttonClick = loadSound("assets/sfx/button_click_sfx.mp3");
  sfx.buttonHover = loadSound("assets/sfx/button_hover_sfx.mp3");
  sfx.whoosh = loadSound("assets/sfx/whoosh_sfx.mp3");
  sfx.cashTransaction = loadSound("assets/sfx/money_transaction_sfx.mp3");
  sfx.newDay = loadSound("assets/sfx/new_day_theme.mp3");
  sfx.endOfDay = loadSound("assets/sfx/end_of_day_theme.mp3");
  sfx.dayTheme = loadSound("assets/sfx/restaurant_soundtrack.mp3");
  sfx.nightTheme = loadSound("assets/sfx/night_ambience_sound.mp3");

  // adjust volumes
  sfx.dayTheme.setVolume(0.2);
  sfx.nightTheme.setVolume(0.2);
  sfx.newDay.setVolume(0.5);
  sfx.endOfDay.setVolume(0.5);
}

class UIBase {
  constructor(x, y, w, h) {
    this.x = x; this.y = y; this.w = w; this.h = h;
    this.visible = true;
  }

  isMouseOver(mx, my) {
    // checks if mouse coordinates are inside the box
    return mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h;
  }
}

class HUDWidget extends UIBase {
  constructor(x, y, w, icon, valueGetter) {
    super(x, y, w, UI_STYLE.hud.height);
    this.icon = icon;
    this.getValue = valueGetter;
  }

  display() {
    if (!this.visible) return;
    
    let style = UI_STYLE.hud;
    let radius = UI_STYLE.globalRadius;
    
    push();
    
    // Background Frame
    stroke(style.colors.outerStroke); 
    strokeWeight(style.weights.outer); 
    noFill();
    rect(this.x, this.y, this.w, this.h, radius);
    
    stroke(style.colors.innerStroke); 
    strokeWeight(style.weights.inner); 
    fill(style.colors.fill);
    rect(this.x, this.y, this.w, this.h, radius);
    
    let centerY = this.y + (this.h / 2) + style.textYOffset;
    
    // Icon
    if (this.icon) {
      if (typeof this.icon === 'object') { 
        imageMode(CENTER); 
        image(this.icon, this.x + 10, centerY, style.iconSize, style.iconSize); 
      } else { 
        this.applyTextStyling(style); 
        textAlign(LEFT, CENTER); 
        text(this.icon, this.x + 15, centerY); 
      }
    }
    
    // Text Value
    this.applyTextStyling(style); 
    textAlign(RIGHT, CENTER);
    text(this.getValue(), this.x + this.w - 15, centerY);
    
    pop();
  }

  applyTextStyling(style) {
    fill(style.colors.text); 
    textSize(style.fontSize);
    
    if (style.weights.text > 0) { 
      stroke(style.colors.textStroke); 
      strokeWeight(style.weights.text); 
    } else { 
      noStroke(); 
    }
  }
}

class GameButton extends UIBase {
  constructor(x, y, w, h, label, variant, action) {
    super(x, y, w, h);
    this.label = label;
    this.variant = variant || "general"; 
    this.action = action;
    this.isHovered = false;
  }

  update(mx, my) {
    let offset = UI_STYLE.shadowOffset;
    this.isHovered = (mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h + offset);
  }

  display() {
    if (!this.visible) return;
    
    let style = UI_STYLE.button;
    let radius = UI_STYLE.globalRadius;
    let palette = style.variants[this.variant] || style.variants.general;
    let offset = UI_STYLE.shadowOffset;
    
    push();
    stroke(style.outerStroke); strokeWeight(style.weights.stroke); strokeJoin(ROUND); noFill();
    
    // Shadow Block
    rect(this.x, this.y, this.w, this.h + offset, radius);
    noStroke(); fill(palette.shadow);
    rect(this.x, this.y + offset, this.w, this.h, radius);
    
    // Front Face
    let drawH; let faceColor;
    if(this.isHovered){
      drawH = this.h + offset;
      faceColor = palette.hover;
    }
    else if(!this.isHovered){
      drawH = this.h;
      faceColor = palette.top;
    }
        
    fill(faceColor);
    rect(this.x, this.y, this.w, drawH, radius);
    
    // Label
    fill(palette.text); textSize(style.fontSize); textAlign(CENTER, CENTER);
    if (style.weights.text > 0) { stroke(palette.textStroke); strokeWeight(style.weights.text); }
    
    let textShift;
    if(this.isHovered) textShift = offset / 2;
    else if(!this.isHovered) textShift = 0;
    text(this.label, this.x + this.w / 2, this.y + (this.h / 2) + style.textYOffset + textShift);
    
    pop();
  }

  handleClick(mx, my) {
    if (this.visible && this.isMouseOver(mx, my)) { 
      if (this.action) this.action(); 
      return true; 
    }
    return false;
  }
}

class SpeechBubble extends UIBase {
  constructor(x, y, w, h, clarifyAction, okayAction) {
    super(x, y, w, h);
    this.fullText = "";
    this.displayedText = "";
    this.charIndex = 0;
    this.timer = 0;
    this.speed = 0.5; 
    this.isFinished = false;

    // ——— INTERNAL BUTTONS ———
    // Clarify Button
    this.clarifyBtn = new GameButton(x + w - 180, y + h + 10, 80, 40, "Huh?", "clarify", clarifyAction);
    // Okay Button
    this.okayBtn = new GameButton(x + w - 90, y + h + 10, 80, 40, "Okay", "general", okayAction);
  }

  reset(newText) {
    // starts typewriter effect for new text
    if (this.fullText === newText) return; 
    this.fullText = newText;
    this.displayedText = "";
    this.charIndex = 0;
    this.timer = 0;
    this.isFinished = false;
  }

  display(textStr, nameStr, showButtons, isClarified) {
    if (!this.visible || !textStr) return;

    if (textStr !== this.fullText) this.reset(textStr);

    // Typewriter Updates
    if (!this.isFinished) {
      this.timer++;
      if (this.timer > this.speed) {
        this.timer = 0;
        this.charIndex++;
        this.displayedText = this.fullText.substring(0, this.charIndex);
        
        if (this.charIndex >= this.fullText.length) {
          this.isFinished = true;
        }
      }
    }

    let style = UI_STYLE.bubble;
    let offset = UI_STYLE.shadowOffset;

    push();
    strokeJoin(ROUND);

    // Outline & Shadow
    stroke(style.colors.outerStroke); strokeWeight(style.weights.stroke); noFill();
    this.drawBubbleShape(this.x, this.y, this.w, this.h+offset);
    noStroke(); fill(style.colors.shadow);
    this.drawBubbleShape(this.x, this.y, this.w, this.h+offset);

    // Main Body
    fill(style.colors.fill);
    this.drawBubbleShape(this.x, this.y, this.w, this.h);

    // Text Content
    fill(style.colors.text);
    textSize(style.fontSize); textAlign(LEFT, TOP);
    textWrap(WORD);

    // Name Tag
    if(nameStr) {
      push();
      fill(style.colors.outerStroke); 
      noStroke();
      
      rect(this.x + 20, this.y - 15, textWidth(nameStr) + 25, 25, 7);
      
      fill(255); 
      textAlign(CENTER, CENTER);
      textSize(14); textStyle(BOLD);
      text(nameStr, this.x + 30 + (textWidth(nameStr)/2), this.y-4);
      pop();
    }
    
    text(this.displayedText, this.x + 25, this.y + 25, this.w - 40, this.h - 40);
    pop();

    // ——— DRAW BUTTONS ———
    if (showButtons) {
      if(!isClarified){
        this.clarifyBtn.visible = true;
        this.clarifyBtn.update(mouseX, mouseY);
        this.clarifyBtn.display();
      } else {
        this.clarifyBtn.visible = false;
      }
      
      this.okayBtn.visible = true;
      this.okayBtn.update(mouseX, mouseY);
      this.okayBtn.display();
    } else {
      this.clarifyBtn.visible = false;
      this.okayBtn.visible = false;
    }
  }

  handleClick(mx, my){
    if(!this.visible) return false;
    if(this.okayBtn.visible && this.okayBtn.handleClick(mx, my)) return true;
    if(this.clarifyBtn.visible && this.clarifyBtn.handleClick(mx, my)) return true;
    return false;
  }

  drawBubbleShape(x, y, w, h){
    // custom vertex shape for speech bubble tail
    let r = UI_STYLE.globalRadius;
    let tailH = UI_STYLE.bubble.tailSize;
    let tailBotY = y + h - 30; 
    let tailTipY = y + h - 45; 
    let tailTopY = y + h - 60; 

    beginShape();
    vertex(x + r, y); vertex(x + w - r, y); quadraticVertex(x + w, y, x + w, y + r);
    vertex(x + w, y + h - r); quadraticVertex(x + w, y + h, x + w - r, y + h);
    vertex(x + r, y + h); quadraticVertex(x, y + h, x, y + h - r);
    vertex(x, tailBotY); vertex(x - tailH, tailTipY); vertex(x, tailTopY); vertex(x, y + r);
    quadraticVertex(x, y, x + r, y);
    endShape(CLOSE);
  }
}

class ReceiptPaper extends UIBase {
  constructor(x, y, w, h) {
    super(x, y, w, h);
  }

  display(report, currentDay) {
    if (!this.visible) return;
    
    let style = UI_STYLE.receipt;
    let offset = UI_STYLE.shadowOffset;
    let radius = 5; 
    
    push();
    strokeJoin(ROUND);

    // Outline
    stroke(style.colors.outerStroke); 
    strokeWeight(style.weights.stroke); 
    noFill();
    rect(this.x, this.y, this.w, this.h + offset, radius);

    // Shadow
    noStroke();
    fill(style.colors.shadow);
    rect(this.x, this.y + offset, this.w, this.h, radius);

    // Paper (Top)
    fill(style.colors.fill);
    rect(this.x, this.y, this.w, this.h, radius);

    // Header Text
    fill(style.colors.text); noStroke(); textAlign(CENTER, TOP);
    
    textSize(style.fontSize.header); 
    text("RECEIPT", this.x + this.w / 2, this.y + 40);
    
    textSize(style.fontSize.subheader); 
    text("Day " + currentDay, this.x + this.w / 2, this.y + 80);

    // Separator
    stroke(style.colors.innerStroke); strokeWeight(style.weights.separator);
    line(this.x + 40, this.y + 110, this.x + this.w - 40, this.y + 110);

    // List Items
    noStroke(); textSize(style.fontSize.body);
    let startTextY = this.y + 140;
    let spacing = 40;
    let labels = ["Sales", "Tips", "Refunds", "Supplies", "Utilities"];
    let values = [
      (report.sales || 0).toFixed(2), // if no value, default to 0
      (report.tips || 0).toFixed(2),
      "-" + (report.refunds || 0).toFixed(2),
      "-" + (report.supplies || 0).toFixed(2),
      "-" + (report.utilities || 0).toFixed(2)
    ];

    for (let i = 0; i < labels.length; i++) {
      let ly = startTextY + (i * spacing);
      textAlign(LEFT); text(labels[i], this.x + 60, ly);
      textAlign(RIGHT); text("$" + values[i], this.x + this.w - 60, ly);
    }

    // Total Line
    let totalY = startTextY + (labels.length * spacing) + 20;
    stroke(style.colors.innerStroke); strokeWeight(style.weights.separator);
    line(this.x + 40, totalY, this.x + this.w - 40, totalY);

    // Net Profit
    noStroke(); textSize(style.fontSize.total); textStyle(BOLD);
    textAlign(LEFT);
    fill(0); 
    text("NET PROFIT", this.x + 60, totalY + 30);

    let netProfit = report.total || 0;
    let netColor;
    if(netProfit >= 0) netColor = 'green';
    else if(netProfit < 0) netColor = 'red';

    fill(netColor);
    textAlign(RIGHT);
    text("$" + netProfit.toFixed(2), this.x + this.w - 60, totalY + 30);
    
    pop();
  }
}

class ShopCard extends UIBase {
  constructor(data, x, y, buyAction) {
    let style = UI_STYLE.shopCard;
    super(x, y, style.width, style.height);
    this.data = data;
    this.buyBtn = new GameButton(this.x + 10, this.y + 130, 120, 30, "$" + data.price, "shop", buyAction);
  }

  display(isOwned, canAfford, isLocked) {
    if (!this.visible) return;
    
    let style = UI_STYLE.shopCard;
    let radius = 10;
    
    push();
    stroke(style.colors.stroke); strokeWeight(style.weights.stroke);
    if(isLocked) fill(220);
    else if(!isLocked) fill(style.colors.background);
    rect(this.x, this.y, this.w, this.h, radius);
    
    if (isLocked) tint(255, 100);
    
    // ——— ICON LOGIC ———
    let iconImg = ingredientAssets[this.data.id];
    
    if (iconImg) { 
      imageMode(CENTER); 
      // Scale image to fit card
      let scale = 60 / iconImg.height;
      image(iconImg, this.x + this.w / 2, this.y + 50, iconImg.width * scale, iconImg.height * scale); 
    }
    
    noTint();
    noStroke(); fill(style.colors.text); textAlign(CENTER, CENTER); textSize(14); textWrap(WORD);
    text(this.data.name, this.x + 10, this.y + 102, this.w - 20);
    
    // Status Text / Buy Button
    if (isOwned) {
      fill(style.colors.ownedText); textSize(18); textStyle(BOLD);
      text("OWNED", this.x + this.w / 2, this.y + 150);
      this.buyBtn.visible = false;
    } else if (isLocked) {
      fill(150); textSize(16); textStyle(BOLD);
      text("Day " + this.data.unlockDay, this.x + this.w / 2, this.y + 150);
      this.buyBtn.visible = false;
    } else {
      this.buyBtn.visible = true;
      this.buyBtn.update(mouseX, mouseY);
      this.buyBtn.display();
    }
    
    pop();
  }

  handleClick(mx, my) {
    if (this.buyBtn.visible) this.buyBtn.handleClick(mx, my);
  }
}

class OrderTicket extends UIBase {
  constructor(x) {
    super(x, -10, UI_STYLE.ticket.collapsedW, UI_STYLE.ticket.collapsedH); 
    this.currentW = UI_STYLE.ticket.collapsedW;
    this.currentH = UI_STYLE.ticket.collapsedH;
    this.teethCount = 5; // number of jagged teeth at bottom
  }

  update(mx, my) {
    let leftX = this.x - (this.currentW/2);
    let rightX = this.x + (this.currentW/2);
    
    let isHovered = (mx > leftX && mx < rightX && my < this.currentH + 10);
    
    let targetW; let targetH;
    if(isHovered){
      targetW = UI_STYLE.ticket.expandedW;
      targetH = UI_STYLE.ticket.expandedH;
    }
    else if(!isHovered){
      targetW = UI_STYLE.ticket.collapsedW;
      targetH = UI_STYLE.ticket.collapsedH;
    }
    
    // in-out animation
    this.currentW = lerp(this.currentW, targetW, 0.38);
    this.currentH = lerp(this.currentH, targetH, 0.38);
    
    this.w = this.currentW;
    this.h = this.currentH;
  }

  display(orderText) {
    if (!orderText) return;
    let style = UI_STYLE.ticket;
    let leftX = this.x - (this.currentW/2);

    push();
    
    // ——— MODAL OVERLAY (dark layer) ———
    // Map opacity from 0 to 150 (semi-transparent black).
    let dimAlpha = map(this.currentH, style.collapsedH, style.expandedH, 0, 150);
    dimAlpha = constrain(dimAlpha, 0, 150);
    
    if (dimAlpha > 10) {
      noStroke();
      fill(0, 0, 0, dimAlpha);
      rect(0, 0, width, height);
    }

    // ——— DRAW TICKET ———
    fill(style.colors.fill);
    stroke(style.colors.stroke);
    strokeWeight(style.weights.stroke);
    strokeJoin(ROUND); 
    
    let toothSize = this.currentW / this.teethCount;
    
    beginShape();
    vertex(leftX, this.y); // top left
    vertex(leftX + this.currentW, this.y); // top right
    vertex(leftX + this.currentW, this.y + this.currentH - 10); // bottom right before teeth
    
    // bottom jagged lines, right to left
    for (let i = 0; i < this.teethCount; i++) {
      let currX = (leftX + this.currentW) - (i * toothSize);
      vertex(currX - (toothSize/2), this.y + this.currentH);
      vertex(currX - toothSize, this.y + this.currentH - 8); 
    }
    
    // close top left
    vertex(leftX, this.y);
    endShape(CLOSE);

    // ——— DRAW HEADER ———
    noStroke();
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(15);
    fill(style.colors.header);
    
    if (this.currentW < 150) {
      text("?", this.x, this.y + 25); // !!replace with scribbles png!!
    } else {
      text("ORDER #00" + day.servedCustomers.length, this.x, this.y + 25);
    }

    // ——— DRAW BODY TEXT ———
    // fade in text
    let alpha = map(this.currentH, style.expandedH * 0.7, style.expandedH * 0.95, 0, 255);
    alpha = constrain(alpha, 0, 255);

    if (alpha > 5) {
      textAlign(LEFT, TOP);
      textStyle(NORMAL);
      textSize(18); 
      textLeading(24); 
      fill(40, 40, 40, alpha);
      
      let padding = 25;
      let stableTextWidth = style.expandedW - (padding * 2);
      text(orderText, leftX + padding, this.y + 60, stableTextWidth, this.currentH - 80);
    }

    pop();
  }
}