// S004 - right.js (branch "feat/audit")
// Adds logging that keeps the BASE contract: it checks `user === null` to
// detect a miss, and returns null explicitly. Purely additive around findUser.

const users = { 1: { id: 1, name: 'Ana' } };

function findUser(id) {
  const u = users[id] || null;
  audit(u);
  return u;
}

function audit(u) {
  if (u === null) {                     // relies on NULL, not undefined
    console.log('MISS for unknown user');
  } else {
    console.log('HIT', u.name);
  }
}

module.exports = { findUser };
