// S005 - base.js
// Scenario: "Duplicate code clone" (same logic copy-pasted in two places)
// Base has the tax rule duplicated: once inside price(), once inside report().
// Git's line-based merge treats them as independent regions.

function price(net) {
  const TAX = 0.21;                 // VAT 21%
  return net * (1 + TAX);
}

function report(net) {
  const TAX = 0.21;                 // same rule, copy-pasted
  return 'Total: ' + (net * (1 + TAX)).toFixed(2);
}

module.exports = { price, report };
