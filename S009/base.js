// S009 - base.js
// Scenario: "API rename + new caller" (cross-file interference, single-file demo)
// Base module exposes `getUser(id)`; internal cache keyed by 'u:'+id.

const cache = new Map();

function getUser(id) {
  const k = 'u:' + id;
  if (cache.has(k)) return cache.get(k);
  const u = { id, name: 'user' + id };
  cache.set(k, u);
  return u;
}

module.exports = { getUser };
