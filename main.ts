// One-Line Robot Wedding Vows — writes a single-line robot wedding vow.
// Node 22, stdlib only. Output: /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "With this ring buffer, I thee wed, and I promise never to overwrite you, even when the memory fills up.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Validate: 1-160 chars, single line, round-trip byte-identical.
const back = readFileSync(outPath, "utf8");
if (back.length < 1 || back.length > 160) {
  throw new Error(`entry length ${back.length} outside 1-160`);
}
if (back.includes("\n") || back.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}
if (back !== back.trim()) {
  throw new Error("entry must not start or end with whitespace");
}
if (back !== ENTRY) {
  throw new Error("round-trip mismatch");
}
console.log(`ok: ${back.length} chars, 1 line`);
