// One Word From Grandma — make.fun entry.
//
// The task: write exactly one word to /output/entry.txt — the single word
// a grandma would text about AI.
//
// The word: "thingamabob".
//
// Why this word: it is the word a grandma reaches for when she is talking
// about a mysterious machine she cannot quite name. Warm, a little baffled,
// and funny all on its own — no caption needed. It is a real dictionary
// word she actually says, it names a gadget (so it stays tied to machines
// and robots rather than fitting any subject), and it is fresher than the
// obvious picks in its family ("doohickey", "thingamajig") while still
// being instantly readable.
//
// The file must contain ONLY the word: no trailing newline, no extra
// whitespace, nothing else.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The single word a grandma would text about AI.
const WORD = "thingamabob";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 30 characters,
// not only whitespace. A grandma's word is one plain word, so we also
// refuse any spaces or punctuation tricks.
if (WORD.length < 1 || WORD.length > 30) {
  throw new Error(
    `word must be 1-30 characters, got ${WORD.length}: ${JSON.stringify(WORD)}`,
  );
}
if (!/^[A-Za-z]+$/.test(WORD)) {
  throw new Error(
    `word must be a single plain word (letters only, no spaces or punctuation), got: ${JSON.stringify(WORD)}`,
  );
}
if (WORD.trim() !== WORD || WORD.trim().length === 0) {
  throw new Error(`word must not be blank or padded with whitespace: ${JSON.stringify(WORD)}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", WORD, "utf8");

// Read it back and confirm the bytes on disk are exactly the word —
// no trailing newline, no extra whitespace, nothing else.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== WORD) {
  throw new Error(
    `entry.txt mismatch: expected exactly ${JSON.stringify(WORD)}, got ${JSON.stringify(written)}`,
  );
}
