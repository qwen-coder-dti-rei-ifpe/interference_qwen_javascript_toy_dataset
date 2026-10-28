// S008 - base.js
// Scenario: "Regex greediness vs. new format" (parser interference)
// Base parses "key=value" lines with a simple regex.

function parse(line) {
  const m = /^(\w+)=(.*)$/.exec(line);
  return m ? { key: m[1], value: m[2] } : null;
}

module.exports = { parse };
