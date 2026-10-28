// S002 - merge.js (AUTO-MERGED, NO CONFLICT MARKERS -> SEMANTIC CONFLICT)
// -----------------------------------------------------------------------
// TRAP: the merge tool happily combined left's FEET conversion with right's
// validation & docs that still speak about METERS. The only textual clash is
// on `maxDistance`, easily resolved by picking one number.
// INTERFERENCE: callers now get a function whose input unit is ambiguous:
// validation messages say 'm', config says 'ft'. Passing 1000 (thinking it is
// meters, as right's branch documented) yields a time ~3.28x too small.
// This is the classic Mars-Climate-Orbiter style unit interference bug.

const config = {
  unit: 'ft',                 // from LEFT
  maxDistance: 1000,          // "resolved" by keeping BASE/RIGHT number -- WRONG unit!
};

function assertPositive(v) {
  if (v <= 0) throw new Error('value must be positive');   // from RIGHT
}

function movingTime(distanceFt, speedMs) {                  // from LEFT+RIGHT merged
  assertPositive(distanceFt);
  assertPositive(speedMs);
  return distanceFt / (speedMs * 3.28084);                 // LEFT conversion
}

// A caller written against RIGHT's documentation (meters):
const seconds = movingTime(1000 /* meant: 1000 m */, 10 /* m/s */);
console.log('merged result:', seconds, 's  (correct answer for 1000 m @ 10 m/s = 100 s)');
if (Math.abs(seconds - 100) > 0.5) {
  console.error('SEMANTIC CONFLICT: unit mismatch (ft vs m) after clean merge');
  process.exitCode = 1;
}

module.exports = { config, movingTime };
