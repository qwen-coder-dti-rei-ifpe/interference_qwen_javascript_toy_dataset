// S005 - left.js (branch "fix/vat")
// Legal fix: VAT goes to 20%. The developer only updated the FIRST clone
// (inside price) -- a very common human mistake with copy-pasted rules.

function price(net) {
  const TAX = 0.20;                 // updated per new law
  return net * (1 + TAX);
}

function report(net) {
  const TAX = 0.21;                 // clone NOT updated (missed by developer)
  return 'Total: ' + (net * (1 + TAX)).toFixed(2);
}

module.exports = { price, report };
