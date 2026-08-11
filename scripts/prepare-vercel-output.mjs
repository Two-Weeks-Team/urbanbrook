import { access, rm } from "node:fs/promises";

const clientRoot = new URL("../dist/client/", import.meta.url);

try {
  await access(new URL("index.html", clientRoot));
} catch {
  throw new Error("Vinext static export is missing dist/client/index.html");
}

// Vinext's Vite metadata is useful while building but is not a public asset.
await Promise.all([
  rm(new URL(".vite/", clientRoot), { recursive: true, force: true }),
  rm(new URL(".assetsignore", clientRoot), { force: true }),
]);

console.log("Verified Vercel static output at dist/client");
