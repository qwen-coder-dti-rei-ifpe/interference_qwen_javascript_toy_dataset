// S008 - merge.js (AUTO-MERGED PARSER -> SEMANTIC CONFLICT)
// ---------------------------------------------------------
// TRAP: right added a guard line at the TOP, left rewrote the REGEX line in
// the MIDDLE. Git sees disjoint hunks and merges silently. Reviewer sees
// "comment support + escape support", two orthogonal features.
// INTERFERENCE: left's new key pattern `[^=]+` is greedy over '#' and spaces,
// so a commented line "#k=v" no longer matches \w+... but worse: with the
// merged code, values containing '=' that right's users relied on being
// parsed by the BASE regex now behave differently -- and lines like
// "a=b=c" split at the FIRST '=' for left's unescape pass but the OLD test
// suite expects the LAST-segment semantics of the base greedy (.*) group.
// The demo below shows one previously-valid config line changing meaning.

function parse(line) {
  if (/^\s*(#|$)/.test(line)) return null;                 // from RIGHT
  const m = /^((?:\\\=|[^=])+)=(.*)$/.exec(line);          // from LEFT
  if (!m) return null;
  return { key: m[1].replace(/\\\=/g, '='), value: m[2] }; // from LEFT
}

const tests = [
  ['url=http://x/?a=b', { key: 'url', value: 'http://x/?a=b' }], // base behaviour
  ['k=a\\=b',           { key: 'k',    value: 'a=b' }],           // right-era user expectation: raw value kept
];
let bad = 0;
for (const [input, expected] of tests) {
  const got = parse(input);
  console.log(JSON.stringify(input), '=>', JSON.stringify(got));
  if (JSON.stringify(got) !== JSON.stringify(expected)) bad++;
}
if (bad > 0) {
  console.error('SEMANTIC CONFLICT: merged parser changed accepted-language of both branches');
  process.exitCode = 1;
}

module.exports = { parse };
