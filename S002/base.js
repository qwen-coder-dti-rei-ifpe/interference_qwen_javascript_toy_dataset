// S002 - base.js
// Scenario: "Unit change trap" (meters vs. feet)
// Base: distance is stored in METERS, speed in m/s.

const config = {
  unit: 'm',
  maxDistance: 1000,      // meters
};

function movingTime(distanceM, speedMs) {
  return distanceM / speedMs;
}

module.exports = { config, movingTime };
