// S004 - merge.js (CLEAN MERGE -> SEMANTIC CONFLICT / INTERFERENCE)
// -----------------------------------------------------------------
// TRAP: both branches keep the same function name and signature, so the
// merger picks left's body (undefined) and right's new audit() call. No
// textual contradiction exists -- but the two changes interfere.
// INTERFERENCE: audit() tests `u === null`, which is never true once
// findUser returns undefined. Misses are logged as HITs with `u.name`
// throwing TypeError, or silently mis-labelled. The invariant
// "missing => null" was broken by one branch while the other depends on it.

const users = { 1: { id: 1, name: 'Ana' } };

function findUser(id) {
  const u = users[id];          // LEFT body: undefined when missing
  audit(u);                     // RIGHT call: assumes null when missing
  return u;
}

function audit(u) {
  if (u === null) {             // never taken after the merge!
    console.log('MISS for unknown user');
  } else {
    console.log('HIT', u.name); // TypeError when u is undefined
  }
}

try {
  findUser(999);                // unknown id
  console.error('SEMANTIC CONFLICT expected a crash or wrong log above');
  process.exitCode = 1;
} catch (e) {
  console.error('SEMANTIC CONFLICT:', e.constructor.name + ': ' + e.message,
    '-> audit() lost the "missing user" case because null !== undefined');
  process.exitCode = 1;
}

module.exports = { findUser };
