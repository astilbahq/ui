import { readFile } from "node:fs/promises";
import path from "node:path";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const releaseTag = process.env.RELEASE_TAG;
const expectedVersion = releaseTag?.replace(/^v/u, "");
const packagePaths = [
  "packages/tokens/package.json",
  "packages/ui/package.json",
] as const;

if (!(releaseTag && expectedVersion)) {
  throw new Error("RELEASE_TAG must identify the release version.");
}

for (const packagePath of packagePaths) {
  // oxlint-disable-next-line no-await-in-loop -- Release manifests are checked in a fixed, readable order.
  const packageJson = JSON.parse(
    // oxlint-disable-next-line no-await-in-loop -- Each manifest must be read before its version can be compared.
    await readFile(path.join(repositoryRoot, packagePath), "utf-8")
  ) as { readonly name?: string; readonly version?: string };

  if (packageJson.version !== expectedVersion) {
    throw new Error(
      `${packageJson.name ?? packagePath} version ${packageJson.version ?? "(missing)"} does not match release tag ${releaseTag}.`
    );
  }
}

process.stdout.write(
  `Both public packages match release version ${expectedVersion}.\n`
);
