// S007 - right.js (branch "security/strict")
// Security decision: empty names must be REJECTED loudly (throw).
// Added a guard line at the START of the function.
// Textually this hunk is far from left's hunk -> auto-merge succeeds.

function normalize(name) {
  if (name.trim() === '') throw new Error('name required'); // strict validation
  return name.trim();
}

module.exports = { normalize };
