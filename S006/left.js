// S006 - left.js (branch "perf/priority")
// Introduces PRIORITY handlers: they must run BEFORE normal ones.
// Implementation: `on` now unshifts high-priority handlers to the front.
// New invariant: priority handlers may assume NOTHING has run yet.

const handlers = [];

function on(fn, opts = {}) {
  if (opts.priority) handlers.unshift(fn);
  else handlers.push(fn);
}

function emit(event) {
  for (const fn of handlers) fn(event);
}

module.exports = { on, emit };
