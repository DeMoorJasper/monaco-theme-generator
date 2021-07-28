import * as monaco from "monaco-editor-core";

import { IVSCodeTheme, IMonacoThemeRule } from "./interfaces";
export * from "./interfaces";

export function convertTheme(
  theme: IVSCodeTheme
): monaco.editor.IStandaloneThemeData {
  const monacoThemeRule: IMonacoThemeRule = [];
  const returnTheme: monaco.editor.IStandaloneThemeData = {
    inherit: false,
    base: "vs-dark",
    colors: theme.colors,
    rules: monacoThemeRule,
    encodedTokensColors: [],
  };

  theme.tokenColors.map((color) => {
    if (!color.scope) {
      return;
    }

    const colorScopes: Array<string> =
      typeof color.scope == "string"
        ? color.scope.split(",").map((v) => v.trim())
        : color.scope;

    for (const scope of colorScopes) {
      monacoThemeRule.push(
        Object.assign({
          ...color.settings,
          token: scope,
        })
      );
    }
  });

  return returnTheme;
}
