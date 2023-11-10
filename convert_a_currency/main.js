const input = require('sync-input');

//Write your code here
const exchange_list = [
  {"USD": 1.0},
  {"JPY": 113.5},
  {"EUR": 0.89},
  {"RUB": 74.36},
  {"GBP": 0.75}
];

function logExchangeList(list) {
  list.forEach((item) => logExchangeItem(item));
}

function logExchangeItem(item) {
  for (const key in item) {
    console.log(`1 USD equals ${item[key]} ${key}`); 
  }
}

function validateCurrency(input, exchange_list) {
    return exchange_list.some(e => Object.keys(e)[0] === input);
}

function doConvertion(from, to, ammount, exchange_list) {
  const fromCurrency = exchange_list.find((item) => from in item);
  const toCurrency = exchange_list.find((item) => to in item);
  const convertion = (toCurrency[to] / fromCurrency[from]) * ammount;
  return convertion.toFixed(4);
}

function validateAmount(ammount) {
  if (isNaN(ammount)) {
    return "The amount has to be a number";  
  }
  if (ammount < 1) {
    return "The amount cannot be less than 1";  
  }
  return "Valid";
}

console.log("Welcome to Currency Converter!");
logExchangeList(exchange_list);
console.log("I can convert USD to these currencies: JPY, EUR, RUB, USD, GBP");
console.log("Type the currency you wish to convert: USD");
const to = input("To:").toUpperCase();
if (validateCurrency(to, exchange_list) == false) {
  console.log("Unknown currency");
  return;
}
const amount = Number(input("Amount:"));
if (validateAmount(amount) !== "Valid") {
  console.log(validateAmount(amount));
  return;
}
const from = "USD";
console.log(`Result: ${amount} ${from} equals ${doConvertion(from, to, amount, exchange_list)} ${to}`);