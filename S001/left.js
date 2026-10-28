// S001 - left.js (branch "refactor/pricing")
// Refactor: renamed applyDiscount -> withDiscount and changed the parameter
// semantics: now `percent` is a PERCENT number (10 means 10% off).
// Textually this touches only the helper + call line.

function calcTotal(items, percent) {
  let sum = 0;
  for (const it of items) {
    sum += it.price * it.qty;
  }
  const discounted = withDiscount(sum, percent);
  return Math.round(discounted);
}

function withDiscount(amount, percent) {
  // percent is a NUMBER 0..100: 10 means 10% off
  return amount * (1 - percent / 100);
}

module.exports = { calcTotal };
