// Keep the distributable website within the university submission budget.
// Count the actual production output (dist/), not Git history, node_modules,
// source files, or files hosted externally on Google Drive.
import fs from "node:fs";
import path from "node:path";

const outputDir = path.resolve(process.cwd(), "dist");
const MAX_BYTES = 20_000_000; // strict decimal MB, not MiB

function walk(location) {
  return fs.readdirSync(location, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(location, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    if (!entry.isFile()) return [];
    return [{ name: path.relative(outputDir, fullPath), bytes: fs.statSync(fullPath).size }];
  });
}

if (!fs.existsSync(outputDir)) {
  console.error("No dist/ folder found. Run the Vite build before checking size.");
  process.exit(1);
}

const files = walk(outputDir);
const bytes = files.reduce((sum, file) => sum + file.bytes, 0);
const mb = (bytes / 1_000_000).toFixed(2);
console.log(`Production site size: ${mb} MB (${bytes} bytes) / 20.00 MB limit.`);
console.log("Largest output files:");
for (const file of [...files].sort((a, b) => b.bytes - a.bytes).slice(0, 6)) {
  console.log(`  ${(file.bytes / 1_000_000).toFixed(2)} MB  ${file.name}`);
}
if (bytes > MAX_BYTES) {
  console.error("ERROR: Production site exceeds the 20 MB budget. Move nonessential media outside public/ and rebuild.");
  process.exit(1);
}
