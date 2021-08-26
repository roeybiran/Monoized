import fs from "fs";
import path from "path";
import cp from "child_process";

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

// https://ethanschoonover.com/solarized/#the-values
// solarized light
// base03
// base02
// base01    #586e75    optional emphasized content
// base00    #657b83    body text / default code / primary content
// base0
// base1     #93a1a1    comments / secondary content
// base2     #eee8d5    background highlights
// base3     #fdf6e3    background

// solarized dark
// base3
// base2
// base1     #93a1a1    optional emphasized content
// base0     #839496    body text / default code / primary content
// base00
// base01    #586e75    comments / secondary content
// base02    #073642    background highlights
// base03    #002b36    background

// const base03 = "#002b36";
// const base02 = "#073642";
const base01 = "#586e75";
const base00 = "#657b83";
const base0 = "#839496";
const base1 = "#93a1a1";
// const base2 = "#eee8d5";
// const base3 = "#fdf6e3";

const yellow = "#b58900";
const orange = "#cb4b16";
const red = "#dc322f";
const magenta = "#d33682";
const violet = "#6c71c4";
const blue = "#268bd2";
const cyan = "#2aa198";
const green = "#859900";

const colorMap = {
  "#f8f8f2": {
    light: base00,
    dark: base0,
  },
  "#88846f": {
    light: base1,
    dark: base01,
  },
  "#e6db74": {
    light: yellow,
    dark: yellow,
  },
  "#f92672": {
    light: red,
    dark: red,
  },
  "#ae81ff": {
    light: violet,
    dark: violet,
  },
  "#66d9ef": {
    light: cyan,
    dark: cyan,
  },
  "#a6e22e": {
    light: green,
    dark: green,
  },
  "#fd971f": {
    light: orange,
    dark: orange,
  },
  "#f44747": {
    light: red,
    dark: red,
  },
  "#cfcfc2": {
    light: base00,
    dark: base0,
  },
  "#75715e": {
    light: base00,
    dark: base0,
  },
  "#ae81ffa0": {
    light: violet,
    dark: violet,
  },
  "#6796e6": {
    light: blue,
    dark: blue,
  },
  "#cd9731": {
    light: orange,
    dark: orange,
  },
  "#b267e6": {
    light: violet,
    dark: violet,
  },
};

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

      const contents = {
        ...solarizedData,
        tokenColors: transformedColors,
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

/*
const shared = {
  constant: [violet],
  "constant.numeric": [violet],
  "constant.character": [violet],
  "constant.character.escape": [violet],
  "constant.language": [violet],
  "constant.other": [violet],
  keyword: [red],
  "keyword.control": [red],
  "keyword.operator": [red],
  "keyword.other": [red],
  "punctuation.definition.template-expression": [red],
  storage: [cyan, "italic"],
  "storage.type": [cyan, "italic"],
  "entity.name.type": [cyan, "italic"],
  "storage.modifier": [cyan, "italic"],
  string: [yellow],
  "string.quoted": [yellow],
  "string.quoted.single": [yellow],
  "string.quoted.double": [yellow],
  "string.quoted.triple": [yellow],
  "string.quoted.other": [yellow],
  "string.interpolated": [yellow],
  "string.regexp": [yellow],
  "string.other": [yellow],
  //
  support: [cyan],
  "support.function": [cyan],
  "support.class": [cyan, "italic"],
  "support.type": [cyan],
  "support.constant": [cyan],
  "support.variable": [cyan, "italic"],
  "support.other ": [cyan],
  //
  "variable.parameter": [orange, "italic"],
  "variable.language": [orange, "italic"],
  //
  "function-call": [cyan],
  "meta.function-call entity.name.function": [cyan],
  "meta.function entity.name.function": [green],
  "entity.name.type.class": [green],
  //
  markup: [red],
  "markup.underline": [red, "underline"],
  "markup.underline.link": [red],
  "markup.bold": [red],
  "markup.heading": [red],
  "markup.italic": [red],
  "markup.list": [red],
  "markup.numbered": [red],
  "markup.unnumbered": [red],
  "markup.quote": [red],
  "markup.raw": [red],
  "markup.other": [red],
  //
  "entity.other.attribute-name": [green],
  "entity.name.tag": [red],
  // css
  "entity.other.attribute-name.id.css": [green],
  "entity.other.attribute-name.class.css": [green],
  // json
  "string.json": [yellow],
  "support.type.property-name.json": [yellow],
  // shell
  "entity.name.command.shell": [cyan],
  "constant.other.option.shell": [orange, "italic"],
  "constant.other.option.dash.shell": [orange, "italic"],
  "punctuation.separator.statement": [red],
  "punctuation.definition.case-pattern.shell": [red],
  "punctuation.terminator.case-clause.shell": [red],
  "keyword.operator.heredoc.shell": [red],
  "string.unquoted.heredoc.no-indent.shell": [yellow],
  // lua
  "meta.function.lua keyword.control.lua": [cyan, "italic"],
};

const variesBetweenDarkAndLight = [
  {
    scope: ["comments"],
    settings: {
      foreground: { dark: base01, light: base1 },
    },
  },
  {
    scope: [
      "source",
      "string.unquoted",
      "variable.other",
      "variable.other",
      "variable",
      "keyword.operator.type.annotation",
      // lua
      "entity.name.function-table",
      // js
      "entity.name.type.module.js",
      // html
      "text.html.derivative",
    ],
    settings: {
      foreground: { dark: base0, light: base00 },
    },
  },
];

const obj = {
  textMateRules: Object.keys(shared).map((key) => {
    return {
      scope: [key],
      settings: {
        foreground: shared[key][0],
        fontStyle: shared[key][1],
      },
    };
  }),
  "[Solarized Dark]": {
    textMateRules: [
      ...variesBetweenDarkAndLight.map((x) => {
        return {
          scope: x.scope,
          settings: {
            foreground: x.settings.foreground.dark,
          },
        };
      }),
    ],
  },
  "[Solarized Light]": {
    textMateRules: [
      ...variesBetweenDarkAndLight.map((x) => {
        return {
          scope: x.scope,
          settings: {
            foreground: x.settings.foreground.light,
          },
        };
      }),
    ],
  },
};

*/
