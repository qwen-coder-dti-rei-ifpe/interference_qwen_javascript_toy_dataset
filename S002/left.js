// S002 - left.js (branch "feat/imperial")
// Switched the whole module to FEET. Textual diff is tiny (numbers + string),
// so it merges almost silently against right's additive changes.

const config = {
  unit: 'ft',
  maxDistance: 3280,      // feet (was 1000 m)
};

function movingTime(distanceFt, speedMs) {
  // NOTE: speed is still m/s -> needs conversion factor 3.28084
  return distanceFt / (speedMs * 3.28084);
}

module.exports = { config, movingTime };
