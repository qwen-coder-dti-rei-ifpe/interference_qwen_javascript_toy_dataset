// S010 - right.js (branch "fix/double-submit-report")
// SAME bug, same intent, DIFFERENT fix location: deduplicate at READ time
// inside flush() using a Set. add() untouched -> textual merge with left is
// completely clean (different functions edited).

const log = [];

function add(item) {
  log.push(item);
}

function flush() {
  const out = [...new Set(log)];    // dedup on read
  log.length = 0;
  return out;
}

module.exports = { add, flush };
