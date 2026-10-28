// S004 - left.js (branch "refactor/optional-chaining")
// Modernisation: return UNDEFINED instead of null (idiomatic JS), and add a
// helper isMissing(u) that checks `u === undefined`.
// Same function NAME, same arity -> textual merge with right is trivial.

const users = { 1: { id: 1, name: 'Ana' } };

function findUser(id) {
  return users[id];            // undefined when missing
}

function isMissing(u) {
  return u === undefined;      // strict! null would NOT be "missing" here
}

module.exports = { findUser, isMissing };
