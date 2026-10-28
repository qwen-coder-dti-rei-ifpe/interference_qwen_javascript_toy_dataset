// S001 - merge.js  (RESULT OF A "CLEAN" TEXTUAL MERGE -> SEMANTIC CONFLICT)
// ------------------------------------------------------------------------
// TRAP: Git auto-merged this without any conflict markers, because left.js
// renamed the helper and right.js only added lines. The person merging has
// no textual signal that anything is wrong.
// INTERFERENCE: the tax feature (right) calls applyDiscount(..., rate), but
// after the merge `rate` is interpreted as a PERCENT (left's refactor).
// calcTotal(items, 10) used to mean "1000% off" nonsense; callers passing
// 0.10 now get ~9% off instead of 10% -- silently wrong money math.
// Run: node merge.js  -> prints totals AND the assertion failure.

function calcTotal(items, percent) {
  let sum = 0;
  for (const it of items) {
    sum += it.price * it.qty;
  }
  // --- merged region ---
  const discounted = withDiscount(sum, percent);   // from LEFT (renamed + %)
  const taxed = discounted * 1.08;                // from RIGHT (new tax line)
  return Math.round(taxed);
}

function withDiscount(amount, percent) {
  return amount * (1 - percent / 100);            // LEFT semantics: 10 = 10%
}

// Old caller written against BASE/right semantics: fraction 0.10 = 10% off.
const cart = [{ price: 100, qty: 2 }];
const got = calcTotal(cart, 0.10);      // expects ~194 (10% off + 8% tax)
const expected = 194;
console.log('got:', got, 'expected:', expected);
if (got !== expected) {
  console.error('SEMANTIC CONFLICT: 0.10 was treated as 0.10% instead of 10%');
  process.exitCode = 1;
}

module.exports = { calcTotal };
