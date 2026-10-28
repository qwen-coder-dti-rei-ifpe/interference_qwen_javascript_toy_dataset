// S007 - left.js (branch "ux/defaults")
// Product decision: empty input should become 'anonymous'.
// Added a fallback line at the END of the function.

function normalize(name) {
  const trimmed = name.trim();
  return trimmed === '' ? 'anonymous' : trimmed;   // UX default
}

module.exports = { normalize };
