// S002 - right.js (branch "feat/validation")
// Adds input validation and a helper that assumes METERS everywhere.
// Purely additive -> git merges it with left's unit change without conflict.

const config = {
  unit: 'm',
  maxDistance: 1000,      // meters
};

function assertPositive(v) {
  if (v <= 0) throw new Error('value must be positive');
}

function movingTime(distanceM, speedMs) {
  assertPositive(distanceM);
  assertPositive(speedMs);
  return distanceM / speedMs;
}

module.exports = { config, movingTime };
