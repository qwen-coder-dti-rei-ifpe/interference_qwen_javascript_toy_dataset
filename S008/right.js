// S008 - right.js (branch "feat/comments")
// Adds comment/blank-line skipping BEFORE the regex; keeps base regex intact.
// Textually independent of left's regex rewrite -> clean auto-merge expected.

function parse(line) {
  if (/^\s*(#|$)/.test(line)) return null;   // skip comments & blanks
  const m = /^(\w+)=(.*)$/.exec(line);
  return m ? { key: m[1], value: m[2] } : null;
}

module.exports = { parse };
