// S010 - merge.js (CLEAN AUTO-MERGE OF TWO FIXES -> SEMANTIC CONFLICT)
// --------------------------------------------------------------------
// TRAP: left edited add(), right edited flush(). Disjoint hunks, git merges
// without conflict, CI stays green if no test covers the interaction.
// INTERFERENCE: BOTH dedup mechanisms now coexist and cancel each other in
// a subtle way: because add() drops duplicates BEFORE they are stored, the
// flush-time Set can never see them -- harmless here. The REAL break: two
// legitimate items that are equal objects (e.g., two identical transfers
// 'PAY') must both be sent. Left's write-dedup silently DROPS the second one
// before right's read-dedup ever gets a chance to keep counts correct.
// Result: money transfer lost with zero textual conflict signal.

const log = [];

function add(item) {
  if (log.includes(item)) return;   // from LEFT: write-time dedup
  log.push(item);
}

function flush() {
  const out = [...new Set(log)];    // from RIGHT: read-time dedup (now redundant)
  log.length = 0;
  return out;
}

// Two users legitimately pay twice the same amount (duplicate strings!).
add('PAY:10:ORDER-7');
add('PAY:10:ORDER-7');              // second real payment -- silently dropped
const sent = flush();
console.log('payments actually sent:', sent.length, JSON.stringify(sent));
if (sent.length !== 2) {
  console.error('SEMANTIC CONFLICT: double dedup after clean merge lost a real payment');
  process.exitCode = 1;
}

module.exports = { add, flush };
