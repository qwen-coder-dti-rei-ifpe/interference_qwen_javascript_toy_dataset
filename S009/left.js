// S009 - left.js (branch "refactor/naming")
// Renamed the public API getUser -> fetchUser AND changed the cache key
// prefix to 'user/' (cache migration handled elsewhere in real life).
// Export keeps a compatibility alias so nothing "breaks" textually.

const cache = new Map();

function fetchUser(id) {
  const k = 'user/' + id;                 // NEW key format
  if (cache.has(k)) return cache.get(k);
  const u = { id, name: 'user' + id };
  cache.set(k, u);
  return u;
}

module.exports = { fetchUser };           // NO alias -- old name simply gone
