// S001 - right.js (branch "feat/tax")
// New feature: adds tax calculation AFTER the discount. It keeps using the
// OLD helper name applyDiscount with the OLD fraction semantics (0.10 = 10%).
// Textually this only ADDS lines, so git sees no conflict at all.

function calcTotal(items, rate) {
  let sum = 0;
  for (const it of items) {
    sum += it.price * it.qty;
  }
  const discounted = applyDiscount(sum, rate);
  const taxed = discounted * 1.08; // +8% tax applied after discount
  return Math.round(taxed);
}

function applyDiscount(amount, rate) {
  // rate is a FRACTION: 0.10 means 10% off
  return amount * (1 - rate);
}

module.exports = { calcTotal };
