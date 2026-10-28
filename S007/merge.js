// S007 - merge.js (AUTO-MERGE OF TWO DIFFERENT LINES -> SEMANTIC CONFLICT)
// ------------------------------------------------------------------------
// TRAP: left edited the RETURN line, right inserted a GUARD line above it.
// Different lines, no textual overlap: git merges both changes happily and
// the diff looks like "validation + default", two harmless features.
// INTERFERENCE: the two policies are mutually exclusive. The security guard
// throws BEFORE the UX default can ever run, so 'anonymous' is dead code --
// OR, depending on resolution order, the default masks invalid input that
// security wanted rejected. Below: guard placed AFTER default logic, which
// silently converts attacks ('') into valid users named 'anonymous'.

function normalize(name) {
  const trimmed = name.trim();
  const safe = trimmed === '' ? 'anonymous' : trimmed;   // LEFT default first
  if (safe === '') throw new Error('name required');      // RIGHT guard now DEAD
  return safe;                                            // '' never reaches guard
}

// A security test written against RIGHT's intent:
let rejected = false;
try {
  normalize('   ');
} catch {
  rejected = true;
}
console.log("normalize('   ') =>", JSON.stringify(normalize('   ')), '| rejected =', rejected);
if (!rejected) {
  console.error('SEMANTIC CONFLICT: policy interference -- default value disabled validation');
  process.exitCode = 1;
}

module.exports = { normalize };
