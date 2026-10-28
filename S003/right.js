// S003 - right.js (branch "feat/cache")
// Adds a THIRD parameter `force` with default false:
//   save(id, data, force=false) -> when force===true, bypass the cache check
//   and ALWAYS write. Polarity: TRUE means constructive here.
// Both branches added a boolean 3rd param at the SAME position with the SAME
// call sites `save(id, data, true)` -- textual merge may even auto-resolve if
// the lines differ only in the parameter name.

const store = {};

function save(id, data, force = false) {
  if (!force && store[id]) {
    return false; // do not overwrite existing unless forced
  }
  store[id] = data;
  return true;
}

function load(id) {
  return store[id] || null;
}

module.exports = { save, load };
