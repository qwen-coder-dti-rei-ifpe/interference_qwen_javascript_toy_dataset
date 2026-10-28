// S006 - merge.js (MERGE THAT "TOOK BOTH CHANGES" -> SEMANTIC CONFLICT)
// ---------------------------------------------------------------------
// TRAP: left changed only `on`, right changed only `emit`. Zero overlapping
// lines -> git auto-merges and the reviewer sees two unrelated features.
// INTERFERENCE (two ways):
//  1) LEFT's priority invariant ("priority runs FIRST") is violated because
//     RIGHT's emit iterates in REVERSE order -- unshift puts priority at
//     index 0, reverse iteration runs it LAST.
//  2) Data shapes clash: left pushes raw functions, right wraps objects with
//     .fn -- merged code crashes or silently skips handlers.

const handlers = [];

function on(fn, opts = {}) {                       // from LEFT
  if (opts.priority) handlers.unshift(fn);
  else handlers.push(fn);
}

function emit(event) {                             // from RIGHT
  for (let i = handlers.length - 1; i >= 0; i--) {
    const h = handlers[i];
    h.fn(event);                                   // expects {fn} wrapper!
    if (h.once) handlers.splice(i, 1);
  }
}

try {
  const order = [];
  on((e) => order.push('normal'), {});             // pushed as raw function (LEFT shape)
  emit({ type: 'ping' });                          // RIGHT's emit expects wrappers
  // If we get here without a crash, the handler was silently skipped.
  console.log('order after emit:', order);
  console.error('SEMANTIC CONFLICT: silent handler loss (raw fn vs {fn} wrapper)');
  process.exitCode = 1;
} catch (e) {
  console.error('SEMANTIC CONFLICT:', e.constructor.name + ': ' + e.message);
  console.error('-> left stores raw fns, right expects {fn, once} wrappers,');
  console.error('-> and right\'s reverse iteration breaks left\'s priority-first rule.');
  process.exitCode = 1;
}

module.exports = { on, emit };
