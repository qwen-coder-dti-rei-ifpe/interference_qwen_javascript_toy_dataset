// S003 - base.js
// Scenario: "Same literal, different meaning" (boolean flag semantics)
// Base: `save(x)` persists to DB. The second parameter does not exist yet.

const store = {};

function save(id, data) {
  store[id] = data;
  return true;
}

function load(id) {
  return store[id] || null;
}

module.exports = { save, load };
