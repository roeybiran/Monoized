#!/usr/bin/env node

import fs from "fs";
import path from "path";
import cp from "child_process";

import colorMap, { additionalToknes } from "./colorMap.js";
import uppercaseFirst from "./uppercaseFirst.js";
import makePackageJson from "./makePackageJson.js";
import transformColors from "./transformColors.js";

// https://code.visualstudio.com/api/extension-guides/color-theme
// https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide
// https://css-tricks.com/creating-a-vs-code-theme/
// https://dbanks.design/blog/vs-code-theme-with-style-dictionary/
// https://macromates.com/manual/en/language_grammars#naming_conventions
// https://stackoverflow.com/questions/60027374/vscode-color-theme-methods-calls
// https://sublimetext.com/docs/3/scope_naming.html#alphabetical_reference

const PATHS = {
  solarized_dark:
    "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/theme-solarized-dark/themes/solarized-dark-color-theme.json",
  solarized_light:
    "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/theme-solarized-light/themes/solarized-light-color-theme.json",
  monokai:
    "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/theme-monokai/themes/monokai-color-theme.json",
};

const BUILD_PATH = ".build/vscode";

export default function vscode(shouldInstall) {
  const { tokenColors: monokaiTokens } = JSON.parse(
    fs.readFileSync(PATHS.monokai)
  );

  try {
    fs.mkdirSync(BUILD_PATH, { recursive: true });
  } catch (error) {}

  ["dark", "light"]
    .map((lightness) => {
      const base = `monoized-${lightness}`;
      const name = `theme-${base}`;
      const label = `Monoized ${uppercaseFirst(lightness)}`;
      const uiTheme = lightness === "dark" ? "vs-dark" : "vs";
      const fileName = `${base}-color-theme.json`;

      const transformedColors = transformColors({
        monokaiTokens,
        colorMap,
        lightness,
      });

      const solarizedData = JSON.parse(
        fs.readFileSync(PATHS[`solarized_${lightness}`])
      );

      const _additionalTokens = additionalToknes.map((token) => {
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

      const json = makePackageJson({
        name,
        label,
        uiTheme,
        fileName,
      });

      return {
        contents,
        json,
        name,
        fileName,
      };
    })
    .forEach(({ contents, json, name: folderName, fileName }) => {
      const buildPath = `${BUILD_PATH}/${folderName}`;

      try {
        fs.mkdirSync(buildPath + "/themes", { recursive: true });
      } catch (error) {}

      [
        [`${buildPath}/themes/${fileName}`, contents],
        [`${buildPath}/package.json`, json],
      ].forEach(([path, data]) => {
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
      });

      if (shouldInstall) {
        const dst = path.join(
          process.env.HOME,
          `.vscode/extensions/${folderName}`
        );
        cp.execFileSync("/bin/rm", ["-rf", dst]);
        cp.execFileSync("/bin/cp", ["-R", buildPath, dst]);
      }
    });
}
