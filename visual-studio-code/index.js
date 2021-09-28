#!/usr/bin/env node

import { readFileSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import colorMap from "./colorMap.js";
import uppercaseFirst from "./uppercaseFirst.js";
import makePackageJson from "./makePackageJson.js";
import transformColors from "./transformColors.js";
import tokenAdditions from "./tokenAdditions.js";

// https://code.visualstudio.com/api/extension-guides/color-theme
// https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide
// https://css-tricks.com/creating-a-vs-code-theme/
// https://dbanks.design/blog/vs-code-theme-with-style-dictionary/
// https://macromates.com/manual/en/language_grammars#naming_conventions
// https://stackoverflow.com/questions/60027374/vscode-color-theme-methods-calls
// https://sublimetext.com/docs/3/scope_naming.html#alphabetical_reference

// https://github.com/microsoft/vscode/blob/HEAD/extensions/theme-solarized-light/themes/solarized-light-color-theme.json
// https://github.com/microsoft/vscode/blob/HEAD/extensions/theme-solarized-dark/themes/solarized-dark-color-theme.json
// https://github.com/microsoft/vscode/blob/HEAD/extensions/theme-monokai/themes/monokai-color-theme.json

// https://api.github.com/repos/microsoft/vscode/contents/extensions/theme-monokai/themes/monokai-color-theme.json

const PKG = JSON.parse(readFileSync(join(process.cwd(), "package.json")));
const BUILD_PATH = join(".build", "vscode");
const PATHS = {
  solarized_dark:
    "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/theme-solarized-dark/themes/solarized-dark-color-theme.json",
  solarized_light:
    "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/theme-solarized-light/themes/solarized-light-color-theme.json",
  monokai:
    "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/theme-monokai/themes/monokai-color-theme.json",
};

const { tokenColors: monokaiTokenColors } = JSON.parse(
  readFileSync(PATHS.monokai)
);

try {
  mkdirSync(BUILD_PATH, { recursive: true });
} catch (error) {
  console.log(error);
}

["dark", "light"]
  .map((lightness) => {
    const base = `monoized-${lightness}`;
    const name = `theme-${base}`;
    const label = `Monoized ${uppercaseFirst(lightness)}`;
    const uiTheme = lightness === "dark" ? "vs-dark" : "vs";
    const fileName = `${base}-color-theme.json`;

    const json = makePackageJson({
      name,
      label,
      uiTheme,
      fileName,
      description: PKG.description,
      repository: PKG.repository,
      version: PKG.version,
      license: PKG.license,
      author: PKG.author,
      publisher: PKG.publisher,
    });

    // start off solarized
    const solarizedData = JSON.parse(
      readFileSync(PATHS[`solarized_${lightness}`])
    );

    // replace
    const transformedColors = transformColors(
      monokaiTokenColors,
      colorMap,
      lightness
    );

    const _additionalTokens = tokenAdditions.map((token) => {
      const foreground =
        typeof token.settings.foreground === "string"
          ? token.settings.foreground
          : token.settings.foreground[lightness];
      return { ...token, settings: { ...token.settings, foreground } };
    });

    const contents = {
      ...solarizedData,
      type: lightness,
      tokenColors: [..._additionalTokens, ...transformedColors],
      name,
    };

    return {
      contents,
      json,
      name,
      fileName,
    };
  })
  .forEach(({ contents, json, name: folderName, fileName }) => {
    const buildPath = join(BUILD_PATH, folderName);

    try {
      mkdirSync(join(buildPath, "themes"), { recursive: true });
    } catch (error) {
      console.log(error);
    }

    [
      [join(buildPath, "themes", fileName), contents],
      [join(buildPath, "package.json"), json],
    ].forEach(([path, data]) => {
      writeFileSync(path, JSON.stringify(data, null, 2));

      if (process.argv.includes("--install")) {
        let dst;
        switch (process.platform) {
          case "darwin":
            dst = path.join(
              process.env.HOME,
              ".vscode",
              "extensions",
              folderName
            );
            break;
          case "win32":
            break;
          case "linux":
            break;
          default:
            return;
        }
      }
    });
  });
