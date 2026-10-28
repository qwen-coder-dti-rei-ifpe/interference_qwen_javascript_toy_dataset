// S009 - right.js (branch "feat/batch")
// Adds a batch endpoint that calls the OLD name getUser internally, and
// pre-warms the cache with keys built using the OLD 'u:' prefix format.

const cache = new Map();

function getUser(id) {
  const k = 'u:' + id;
  if (cache.has(k)) return cache.get(k);
  const u = { id, name: 'user' + id };
  cache.set(k, u);
  return u;
}

function getUsers(ids) {
  return ids.map(getUser);                 // depends on the OLD name & key format
}

module.exports = { getUser, getUsers };
