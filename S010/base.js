// S010 - base.js
// Scenario: "Same fix, different location" (idempotence trap)
// Base: add() logs every call; there is NO dedup logic anywhere.

const log = [];

function add(item) {
  log.push(item);
}

function flush() {
  const out = log.slice();
  log.length = 0;
  return out;
}

module.exports = { add, flush };
