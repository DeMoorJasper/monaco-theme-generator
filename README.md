# Monaco theme generator

Generate a monaco theme from a simple configuration.

## Installing

Run `yarn` in the root of this repository, afterwards you can test if it works by running `yarn generate`.

## Configuring colors

To configure the used colors you can edit the `src/config.ts` file.

## Generating the theme

After changing the `config.ts` file you can run `yarn generate` again and it should've generated a monaco theme in the `out` folder.

## Testing the theme

To test the theme you have to setup a monaco editor with textmate installed, see [`monaco-editor-textmate`](https://yarnpkg.com/package/monaco-editor-textmate) and use `monaco.editor.defineTheme` to define the theme.
