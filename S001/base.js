// S001 - base.js
// Scenario: "Silent rename trap" (refactor vs. new feature)
// Base version: the discount is applied by a helper called applyDiscount,
// and the price rounding uses Math.round.

function calcTotal(items, rate) {
  let sum = 0;
  for (const it of items) {
    sum += it.price * it.qty;
  }
  const discounted = applyDiscount(sum, rate);
  return Math.round(discounted);
}

function applyDiscount(amount, rate) {
  // rate is a FRACTION: 0.10 means 10% off
  return amount * (1 - rate);
}

module.exports = { calcTotal };
