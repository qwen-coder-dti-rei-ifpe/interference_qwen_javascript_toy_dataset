// S007 - base.js
// Scenario: "Default value vs. validation" (both branches edit different lines of one function)
// Base: normalize(name) trims and returns the raw name.

function normalize(name) {
  return name.trim();
}

module.exports = { normalize };
