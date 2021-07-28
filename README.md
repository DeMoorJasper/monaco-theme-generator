# Monaco theme generator

Generate a vscode and monaco theme from a single configuration.

## Installing

Run `yarn` in the root of this repository, afterwards you can test if it works by running `yarn generate`.

## Configuring colors

To configure the used colors you can edit the `src/config.ts` file.

## Generating the theme

After changing the `config.ts` file you can run `yarn generate` again and it should've generated a monaco and vscode theme in the `out` folder.

## Testing the theme

To test the theme you can read the vscode documentation: `https://code.visualstudio.com/docs/getstarted/themes#_creating-your-own-color-theme` and for monaco you need to setup `https://yarnpkg.com/package/monaco-editor-textmate` and use `monaco.editor.defineTheme`
