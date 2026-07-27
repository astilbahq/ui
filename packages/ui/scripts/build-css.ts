import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const generatedStylesDirectory = path.resolve(
  import.meta.dirname,
  "../styled-system/styles"
);
const generatedRecipesDirectory = path.resolve(
  generatedStylesDirectory,
  "recipes"
);
const generatedRecipeFiles = await readdir(generatedRecipesDirectory);
const recipeFiles = generatedRecipeFiles
  .filter((file) => file.endsWith(".css"))
  .toSorted();
const recipeCss = await Promise.all(
  recipeFiles.map((file) =>
    readFile(path.resolve(generatedRecipesDirectory, file), "utf-8")
  )
);
const utilityCss = await readFile(
  path.resolve(generatedStylesDirectory, "utilities.css"),
  "utf-8"
);
const componentSourceDirectory = path.resolve(import.meta.dirname, "../src");
const componentSourceEntries = await readdir(componentSourceDirectory);
const componentStyleFiles = componentSourceEntries
  .filter((file) => file.endsWith(".css"))
  .toSorted();
const componentCss = await Promise.all(
  componentStyleFiles.map((file) =>
    readFile(path.resolve(componentSourceDirectory, file), "utf-8")
  )
);
const outputDirectory = path.resolve(import.meta.dirname, "../dist");

await mkdir(outputDirectory, { recursive: true });
await writeFile(
  path.resolve(outputDirectory, "styles.css"),
  [...recipeCss, ...componentCss, utilityCss].join("\n"),
  "utf-8"
);
