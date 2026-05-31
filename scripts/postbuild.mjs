// Postbuild fix for static export on GitHub Pages.
// Next emits OG/Twitter images as extension-less files; GH Pages serves them
// as application/octet-stream which breaks social crawlers.
// Copy them to .png siblings and rewrite all HTML references.

import { readdirSync, copyFileSync, statSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "out";

const renames = [
  ["opengraph-image", "opengraph-image.png"],
  ["twitter-image", "twitter-image.png"],
  ["resume/opengraph-image", "resume/opengraph-image.png"],
  ["resume/twitter-image", "resume/twitter-image.png"],
];

for (const [src, dst] of renames) {
  const srcPath = join(OUT_DIR, src);
  const dstPath = join(OUT_DIR, dst);
  if (!existsSync(srcPath)) {
    console.warn(`[postbuild] missing ${srcPath}`);
    continue;
  }
  copyFileSync(srcPath, dstPath);
  console.log(`[postbuild] copied ${srcPath} -> ${dstPath}`);
}

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p);
    else if (entry.endsWith(".html")) rewrite(p);
  }
}

function rewrite(file) {
  const orig = readFileSync(file, "utf8");
  const next = orig
    .replace(/\/opengraph-image\?/g, "/opengraph-image.png?")
    .replace(/\/twitter-image\?/g, "/twitter-image.png?")
    .replace(/\/opengraph-image"/g, '/opengraph-image.png"')
    .replace(/\/twitter-image"/g, '/twitter-image.png"');
  if (next !== orig) {
    writeFileSync(file, next);
    console.log(`[postbuild] rewrote ${file}`);
  }
}

walk(OUT_DIR);
console.log("[postbuild] done");
