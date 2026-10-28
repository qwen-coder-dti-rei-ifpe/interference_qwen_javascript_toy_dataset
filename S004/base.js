// S004 - base.js
// Scenario: "Function name unchanged, return type changed" (null vs undefined vs object)
// Base: findUser returns the user object or null when missing.

const users = { 1: { id: 1, name: 'Ana' } };

function findUser(id) {
  return users[id] || null;
}

module.exports = { findUser };
