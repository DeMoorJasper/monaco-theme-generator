import * as monaco from "monaco-editor-core";

import { IVSCodeTheme, IMonacoThemeRule } from "./interfaces";
import { MONACO_COLOR_KEYS } from "./monaco-colors";
export * from "./interfaces";

export function convertTheme(
  input: IVSCodeTheme
): monaco.editor.IStandaloneThemeData {
  const theme: monaco.editor.IStandaloneThemeData = {
    inherit: false,
    base: "vs-dark",
    colors: {},
    rules: [],
    encodedTokensColors: [],
  };

  input.tokenColors.map((color) => {
    if (!color.scope) {
      color.scope = "";
    }

    const colorScopes: Array<string> =
      typeof color.scope == "string"
        ? color.scope.split(",").map((v) => v.trim())
        : color.scope;

    for (const scope of colorScopes) {
      theme.rules.push(
        Object.assign({
          ...color.settings,
          token: scope,
        })
      );
    }
  });

  for (const colorKey of Object.keys(input.colors)) {
    if (MONACO_COLOR_KEYS.includes(colorKey)) {
      theme.colors[colorKey] = input.colors[colorKey];
    }
  }

  return theme;
}
