import path from "path";
import process from "process";
import fs from "fs-extra";
import { generateTheme } from "vscode-theme-generator";

import { convertTheme } from "./converter/index";
import { COLOR_SET, THEME_NAME } from "./config";

const OUT_DIR = path.join(process.cwd(), "out");
const THEME_FILE_NAME = `${THEME_NAME}.json`;

async function generate() {
  await fs.ensureDir(OUT_DIR);

  // TODO: Fork generate-theme...
  const tempFilepath = path.join(OUT_DIR, "temp.json");
  generateTheme(THEME_NAME, COLOR_SET, tempFilepath);
  const generatedTheme = JSON.parse(await fs.readFile(tempFilepath, "utf-8"));
  await fs.remove(tempFilepath);

  const themeFilepath = path.join(OUT_DIR, THEME_FILE_NAME);
  const monacoTheme = convertTheme(generatedTheme);
  await fs.writeFile(
    themeFilepath,
    JSON.stringify(monacoTheme, null, "  "),
    "utf-8"
  );
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
