import { readFileSync } from "fs";
import { join } from "path";
import { colorMap } from "../../util/colorMap.js";
import { mkdirSync, writeFileSync } from "fs";
import uppercaseFirst from "../../util/uppercaseFirst.js";

// https://code.visualstudio.com/api/extension-guides/color-theme#create-a-new-color-theme

// https://github.com/microsoft/vscode/blob/HEAD/extensions/theme-solarized-light/themes/solarized-light-color-theme.json
// https://github.com/microsoft/vscode/blob/HEAD/extensions/theme-solarized-dark/themes/solarized-dark-color-theme.json
// https://github.com/microsoft/vscode/blob/HEAD/extensions/theme-monokai/themes/monokai-color-theme.json

// https://api.github.com/repos/microsoft/vscode/contents/extensions/theme-monokai/themes/monokai-color-theme.json

export function generate(outputPath) {
  const PATHS = {
    solarized_dark:
      "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/theme-solarized-dark/themes/solarized-dark-color-theme.json",
    solarized_light:
      "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/theme-solarized-light/themes/solarized-light-color-theme.json",
    monokai:
      "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/theme-monokai/themes/monokai-color-theme.json",
  };

  const monokaiTokenColors = JSON.parse(
    readFileSync(PATHS.monokai)
  ).tokenColors;

  ["dark", "light"]
    .map((darkOrLight) => {
      const base = `monoized-${darkOrLight}`;
      const name = `theme-${base}`;
      const displayName = `Monoized ${uppercaseFirst(darkOrLight)}`;

      // get solarized values
      const solarizedData = JSON.parse(
        readFileSync(PATHS[`solarized_${darkOrLight}`])
      );

      // replace
      const transformedTokenColors = transformColors(
        monokaiTokenColors,
        colorMap,
        darkOrLight
      );

      const contents = {
        ...solarizedData,
        type: darkOrLight,
        tokenColors: transformedTokenColors,
        name,
      };

      let themePackageJSON = makeThemePackageJSON({
        name,
        displayName,
        darkOrLight,
      });

      return {
        contents, 
        name,
        themePackageJSON,
      };
    })
    .forEach(({ contents, themePackageJSON, name }) => {
      const themeBasePath = join(outputPath, themePackageJSON.name);
      const contentsPath = join(themeBasePath, "themes");

      try {
        mkdirSync(contentsPath, { recursive: true });
        writeFileSync(join(themeBasePath, "package.json"), JSON.stringify(themePackageJSON, null, 2));
        writeFileSync(join(contentsPath, `${name}-color-theme.json`), JSON.stringify(contents, null, 2));
      } catch (error) {
        console.log(error);
      }
    });
}

function makeThemePackageJSON({ name, displayName, darkOrLight }) {
  return {
    name,
    displayName,
    description: "",
    repository: "",
    version: "0.0.1",
    engines: { vscode: "*" },
    categories: ["Themes"],
    contributes: {
      themes: [
        {
          label: displayName,
          uiTheme: darkOrLight == "light" ? "vs" : "vs-dark",
          path: `./themes/${name}-color-theme.json`,
        },
      ],
    },
  };
}

const transformColors = (
  monokaiTokens,
  colorMap,
  lightness) => {
  return monokaiTokens.map((token) => {
    const color = token.settings.foreground?.toLowerCase();
    if (color in colorMap) {
      return {
        ...token,
        settings: { ...token.settings, foreground: colorMap[color][lightness] },
      };
    }
    return token;
  });
}

//     const settings = {
//       textMateRules: monokaiTokens.map((token) => {
//         const transformed = Object.entries(token.settings).map(
//           ([key, value]) => {
//             if (key === "foreground") {
//               const transformed = transformColor(
//                 value.toLowerCase(),
//                 mode.toLowerCase()
//               );
//               return [key, transformed];
//             } else {
//               return [key, value];
//             }
//           }
//         );
//         const settings = Object.fromEntries(transformed);
//         return { ...token, settings };
//       }),
//     };