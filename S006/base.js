// S006 - base.js
// Scenario: "Shared mutable state / ordering trap"
// Base: a simple event bus; handlers run in registration order.

const handlers = [];

function on(fn) {
  handlers.push(fn);
}

function emit(event) {
  for (const fn of handlers) fn(event);
}

module.exports = { on, emit };
