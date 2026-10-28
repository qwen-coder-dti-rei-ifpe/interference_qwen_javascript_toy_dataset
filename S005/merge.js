// S005 - merge.js (TEXTUALLY PERFECT MERGE -> SEMANTIC CONFLICT)
// ------------------------------------------------------------
// TRAP: git merges this with NO conflict at all: left changed lines in
// price(), right changed lines in report(). Different hunks, different
// functions, "obviously" independent.
// INTERFERENCE: the SAME business rule (VAT) lives in two clones. After the
// merge price() charges 20% but report() prints 21% totals -- invoices stop
// matching charged amounts. Each side individually "looks correct" against
// its own diff, which is exactly what fools the reviewer.

function price(net) {
  const TAX = 0.20;                 // from LEFT (legal fix)
  return net * (1 + TAX);
}

function report(net, cur = 'EUR') {
  const TAX = 0.21;                 // from RIGHT (old law, new formatting)
  const v = (net * (1 + TAX)).toFixed(2);
  return `Total: ${v} ${cur}`;
}

const charged = price(100);                        // 120.00
const printed = Number(report(100).replace('Total: ', '').split(' ')[0]); // 121.00
console.log('charged:', charged, 'printed on invoice:', printed);
if (Math.abs(charged - printed) > 0.001) {
  console.error('SEMANTIC CONFLICT: duplicated VAT rule diverged after clean merge');
  process.exitCode = 1;
}

module.exports = { price, report };
