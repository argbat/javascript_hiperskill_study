
const prompt = require('prompt-sync')();

function Machine() {
  //// Public ////
  this.isRunning = function() {
    return this._running;
  }
  
  this.action = function(action) {
    if (action == "buy") {
      this._buy();
    } else if (action == "fill") {
      this._fill();
    } else if (action == "take") {
      this._take();
    } else if (action == "remaining") {
      this._remaining();
    } else if (action == "exit") {
      this._running = false;
    } else {
      console.log("Bad action.")
    }
  }

  //// Private ////
  this._running = true;

  this._products = [
    {
      "name": "espresso", 
      "price": 4,
      "consumes": {
        "water": 250,
        "milk": 0,
        "coffee": 16,
        "cups": 1
      }
    },
    {
      "name": "latte", 
      "price": 7,
      "consumes": {
        "water": 350,
        "milk": 75,
        "coffee": 20,
        "cups": 1
      }
    },
    {
      "name": "cappuccino", 
      "price": 6,
      "consumes": {
        "water": 200,
        "milk": 100,
        "coffee": 12,
        "cups": 1
      }
    }
  ];

  this._stock = {
    "water": 400,
    "milk": 540,
    "coffee": 120,
    "cups": 9
  };
  
  this._money = 550;

  this._getProduct = function(productCode) {
    if (productCode.isNaN || productCode < 1 || productCode > this._products.length) {
      return null;
    }
    return this._products[productCode - 1];
  }

  this._remaining = function() {
    console.log(`${this._stock.water} ml of water`);
    console.log(`${this._stock.milk} ml of milk`);
    console.log(`${this._stock.coffee} g of coffee beans`);
    console.log(`${this._stock.cups} disposable cups`);
    console.log(`${this._money} of money`);
  }

  this._buy = function() {
    console.log("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:");
    const productCode = parseInt(prompt());
    const product = this._getProduct(productCode);
    if (product == null) {
      return null;
    }
    const consumibles = product.consumes;
    if (this._hasStock(consumibles) === false) {
      return null;
    }
    console.log("I have enough resources, making you a coffee!");
    this._stock.water -= consumibles.water;
    this._stock.milk -= consumibles.milk;
    this._stock.coffee -= consumibles.coffee;
    this._stock.cups -= 1;
    this._money += product.price;
  }

  this._hasStock = function(consumibles) {
    let hasStock = true;
    for (const consumible in this._stock) {
      hasStock = (this._stock[consumible] >= consumibles[consumible]);
      if (hasStock === false) {
        console.log(`Sorry, not enough ${consumible}!`);
        break;
      }
    }
    return hasStock;
  }

  this._take = function() {
    const took = this._money;
    this._money = 0;
    console.log(`I gave you ${took}`);
  }

  this._fill = function() {
    console.log("Write how many ml of water you want to add:");
    const water = parseInt(prompt());
    console.log("Write how many ml of milk you want to add:");
    const milk = parseInt(prompt());
    console.log("Write how many grams of coffee beans you want to add:");
    const coffee = parseInt(prompt());
    console.log("Write how many disposable cups you want to add:");
    const cups = parseInt(prompt());
    this._stock.water += water;
    this._stock.milk += milk;
    this._stock.coffee += coffee;
    this._stock.cups += cups;
  }
}

const machine = new Machine();

while (machine.isRunning()) {
  const action = prompt('Write action (buy, fill, take, remaining, exit):');
  machine.action(action);  
}
