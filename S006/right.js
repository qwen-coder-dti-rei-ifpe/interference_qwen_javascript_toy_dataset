// S006 - right.js (branch "feat/once")
// Adds one-shot handlers. Implementation detail: `emit` now MUTATES the
// handler list while iterating (splice) to remove fired `once` handlers.
// New invariant: emit() must iterate over a SNAPSHOT of the array.

const handlers = [];

function on(fn, opts = {}) {
  handlers.push({ fn, once: !!opts.once });
}

function emit(event) {
  for (let i = handlers.length - 1; i >= 0; i--) {   // reverse iteration + splice
    const h = handlers[i];
    h.fn(event);
    if (h.once) handlers.splice(i, 1);
  }
}

module.exports = { on, emit };
