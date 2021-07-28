import path from "path";
import process from "process";
import fs from "fs-extra";
import { generateTheme } from "vscode-theme-generator";

import { convertTheme } from "./converter/index";
import { COLOR_SET, THEME_NAME } from "./config";

const OUT_DIR = path.join(process.cwd(), "out");
const VSCODE_OUT_DIR = path.join(OUT_DIR, "vscode");
const MONACO_OUT_DIR = path.join(OUT_DIR, "monaco");
const THEME_FILE_NAME = `${THEME_NAME}.json`;

async function generate() {
  await fs.ensureDir(VSCODE_OUT_DIR);
  await fs.ensureDir(MONACO_OUT_DIR);

  const vscodeThemeFilePath = path.join(VSCODE_OUT_DIR, THEME_FILE_NAME);
  generateTheme(THEME_NAME, COLOR_SET, vscodeThemeFilePath);

  const generatedTheme = JSON.parse(
    await fs.readFile(vscodeThemeFilePath, "utf-8")
  );

  const monacoThemeFilePath = path.join(MONACO_OUT_DIR, THEME_FILE_NAME);
  const monacoTheme = convertTheme(generatedTheme);
  await fs.writeFile(
    monacoThemeFilePath,
    JSON.stringify(monacoTheme, null, "  "),
    "utf-8"
  );
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
