// S003 - left.js (branch "feat/soft-delete")
// Adds a THIRD parameter `hard` with default false:
//   save(id, data, hard=false) -> when hard===true, DELETE instead of write.
// Note the polarity: TRUE means destructive here.

const store = {};

function save(id, data, hard = false) {
  if (hard) {
    delete store[id];
    return false;
  }
  store[id] = data;
  return true;
}

function load(id) {
  return store[id] || null;
}

module.exports = { save, load };
