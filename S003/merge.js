// S003 - merge.js (MERGED WITH "OBVIOUS" RESOLUTION -> SEMANTIC CONFLICT)
// ----------------------------------------------------------------------
// TRAP: left and right both add a third BOOLEAN parameter at the same
// position. The merger saw two similar signatures and "just kept one"
// (`keepBoth` style union). The merged body below is a plausible-looking
// combination that NO branch ever had.
// INTERFERENCE: callers from the right branch pass `true` meaning "force
// write", but after the merge `true` triggers LEFT's destructive delete.
// Data loss with zero textual warning.

const store = {};

function save(id, data, flag = false) {   // signature "union" of both branches
  if (flag) {
    delete store[id];                     // behaviour taken from LEFT
    return false;
  }
  if (store[id]) return false;            // guard taken from RIGHT
  store[id] = data;
  return true;
}

function load(id) {
  return store[id] || null;
}

// Caller written against RIGHT semantics: "force-overwrite user-1".
save('user-1', { name: 'Ana' });
const ok = save('user-1', { name: 'Bob' }, true);   // expects overwrite
console.log('after forced write, stored =', load('user-1'), 'returned =', ok);
if (load('user-1') !== null) {
  console.log('unexpected: record survived');
} else {
  console.error('SEMANTIC CONFLICT: force=true DELETED the record instead of overwriting it');
  process.exitCode = 1;
}

module.exports = { save, load };
