// S005 - right.js (branch "feat/currency")
// Adds currency formatting. It touches ONLY report() (the second clone) and
// deliberately keeps TAX = 0.21 because the feature branch was cut before
// the legal fix existed.

function price(net) {
  const TAX = 0.21;
  return net * (1 + TAX);
}

function report(net, cur = 'EUR') {
  const TAX = 0.21;                 // touched line: signature+body rewritten here
  const v = (net * (1 + TAX)).toFixed(2);
  return `Total: ${v} ${cur}`;
}

module.exports = { price, report };
