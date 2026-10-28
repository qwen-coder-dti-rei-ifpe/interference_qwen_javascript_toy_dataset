// S008 - left.js (branch "feat/escapes")
// Supports escaped '=' inside values: "a\=b=1" -> key 'a\\=b'.
// The key part of the regex was rewritten to allow backslash-escaped '='.

function parse(line) {
  // key may contain \= ; first UNESCAPED '=' separates key and value
  const m = /^((?:\\\=|[^=])+)=(.*)$/.exec(line);
  if (!m) return null;
  return { key: m[1].replace(/\\\=/g, '='), value: m[2] };
}

module.exports = { parse };
