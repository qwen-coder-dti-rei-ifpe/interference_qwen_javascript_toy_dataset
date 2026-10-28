// S009 - merge.js (MERGE RESOLVED "BY HAND" -> SEMANTIC CONFLICT)
// ---------------------------------------------------------------
// TRAP: git flagged only the export line as conflicting; the merger "fixed"
// it by exporting BOTH names, thinking that keeps everyone happy. The real
// interference is invisible at line level: right's getUsers() and left's
// cache-key change disagree about the KEY FORMAT ('u:'+id vs 'user/'+id).
// INTERFERENCE: no crash, no error -- just a permanent cache miss storm and
// duplicate objects, so identity comparisons (===) between results of
// getUser(1) and fetchUser(1) fail. Silent behavioural corruption.

const cache = new Map();

function fetchUser(id) {                    // LEFT implementation
  const k = 'user/' + id;                   // LEFT key format
  if (cache.has(k)) return cache.get(k);
  const u = { id, name: 'user' + id };
  cache.set(k, u);
  return u;
}

function getUser(id) {                      // "compat alias" invented by the merger
  const k = 'u:' + id;                      // RIGHT key format -- diverged!
  if (cache.has(k)) return cache.get(k);
  const u = { id, name: 'user' + id };
  cache.set(k, u);
  return u;
}

function getUsers(ids) {                    // from RIGHT
  return ids.map(getUser);
}

getUsers([1, 2]);
const a = getUser(1);
const b = fetchUser(1);
console.log('same object?', a === b, '| cache size:', cache.size);
if (a !== b || cache.size !== 3) {
  console.error('SEMANTIC CONFLICT: two key formats coexist after merge ->');
  console.error('duplicate cache entries, broken identity, double backend loads');
  process.exitCode = 1;
}

module.exports = { getUser, getUsers, fetchUser };
