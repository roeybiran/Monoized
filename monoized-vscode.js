#!/usr/bin/env node


// https://stackoverflow.com/questions/60027374/vscode-color-theme-methods-calls
// https://dbanks.design/blog/vs-code-theme-with-style-dictionary/

// solarized dark
// base3
// base2
// base1     #93a1a1    optional emphasized content
// base0     #839496    body text / default code / primary content
// base00
// base01    #586e75    comments / secondary content
// base02    #073642    background highlights
// base03    #002b36    background

// solarized light
// base03
// base02
// base01    #586e75    optional emphasized content
// base00    #657b83    body text / default code / primary content
// base0
// base1     #93a1a1    comments / secondary content
// base2     #eee8d5    background highlights
// base3     #fdf6e3    background

const base03 = "#002b36";
const base02 = "#073642";
const base01 = "#586e75";
const base00 = "#657b83";
const base0 = "#839496";
const base1 = "#93a1a1";
const base2 = "#eee8d5";
const base3 = "#fdf6e3";

const yellow = "#b58900";
const orange = "#cb4b16";
const red = "#dc322f";
const magenta = "#d33682";
const violet = "#6c71c4";
const blue = "#268bd2";
const cyan = "#2aa198";
const green = "#859900";

const fs = require("fs");
const path = require("path");

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
  textMateRules: Object.keys(shared).map(key => {
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
      ...variesBetweenDarkAndLight.map(x => {
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
      ...variesBetweenDarkAndLight.map(x => {
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

const result = JSON.stringify(obj, null, 2);

const thePath = path.join(
  process.env.HOME,
  "/Library/Application Support/Code/User/settings.json"
);

const original = fs.readFileSync(thePath, { encoding: "utf-8" }).replace(
  /^[/\s]+BEGIN THEME OVERRIDES.+^[/\s]+END THEME OVERRIDES/ms,
  `
      // BEGIN THEME OVERRIDES
      "editor.tokenColorCustomizations": ${result},
      // END THEME OVERRIDES
  `
);

fs.writeFileSync(thePath, original);
