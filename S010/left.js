// S010 - left.js (branch "fix/double-submit")
// Bug: users double-click "submit" -> item added twice.
// Fix chosen: DEDUPLICATE at write time inside add().

const log = [];

function add(item) {
  if (log.includes(item)) return;   // ignore duplicates on insert
  log.push(item);
}

function flush() {
  const out = log.slice();
  log.length = 0;
  return out;
}

module.exports = { add, flush };
