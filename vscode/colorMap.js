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

const additionalToknes = [
  {
    scope: [
      "source",
      // "string.unquoted",
      // "variable.other",
      // "variable.other",
      // "variable",
      // "keyword.operator.type.annotation",
      // // lua
      // "entity.name.function-table",
      // // js
      // "entity.name.type.module.js",
      // // html
      // "text.html.derivative",
    ],
    settings: {
      foreground: { dark: base0, light: base00 },
    },
  },
];

export { additionalToknes };
export default colorMap;

// {
//   scope: ["markup.underline"],
//   settings: {
//     fontStyle: "underline",
//     foreground: red,
//   },
// },

// {
//   scope: [
//     "meta.function entity.name.function",
//     "entity.name.type.class",
//     // ?
//     "entity.other.attribute-name",
//     // css
//     "entity.other.attribute-name.id.css",
//     "entity.other.attribute-name.class.css",
//   ],
//   settings: {
//     foreground: green,
//   },
// },

// {
//   scope: [
//     "variable.parameter",
//     "variable.language",
//     // shell
//     "constant.other.option.shell",
//     "constant.other.option.dash.shell",
//   ],
//   settings: {
//     foreground: orange,
//     fontStyle: "italic",
//   },
// },

// {
//   scope: [
//     "support",
//     "support.function",
//     "support.type",
//     "support.constant",
//     "support.other ",
//     // ?
//     "function-call",
//     "meta.function-call entity.name.function",
//     // shell
//     "entity.name.command.shell",
//   ],
//   settings: {
//     foreground: cyan,
//   },
// },

// {
//   scope: [
//     "storage",
//     "storage.type",
//     "entity.name.type",
//     "storage.modifier",
//     // ?
//     "support.class",
//     "support.variable",
//     // lua
//     "meta.function.lua keyword.control.lua",
//   ],
//   settings: {
//     foreground: cyan,
//     fontStyle: "italic",
//   },
// },

// {
//   scope: [
//     "constant",
//     "constant.numeric",
//     "constant.character",
//     "constant.character.escape",
//     "constant.language",
//     "constant.other",
//   ],
//   settings: {
//     foreground: violet,
//   },
// },

// {
//   scope: [
//     "string",
//     "string.quoted",
//     "string.quoted.single",
//     "string.quoted.double",
//     "string.quoted.triple",
//     "string.quoted.other",
//     "string.interpolated",
//     "string.regexp",
//     "string.other",
//     // shell
//     "string.unquoted.heredoc.no-indent.shell",
//     // json
//     "string.json",
//     "support.type.property-name.json",
//   ],
//   settings: {
//     foreground: yellow,
//   },
// },

// {
//   scope: ["comments"],
//   settings: {
//     foreground: { dark: base01, light: base1 },
//   },
// },

// {
//   scope: [
//     "keyword",
//     "keyword.control",
//     "keyword.operator",
//     "keyword.other",
//     "punctuation.definition.template-expression",
//     // markup
//     "markup",
//     "markup.underline.link",
//     "markup.bold",
//     "markup.heading",
//     "markup.italic",
//     "markup.list",
//     "markup.numbered",
//     "markup.unnumbered",
//     "markup.quote",
//     "markup.raw",
//     "markup.other",
//     // ?
//     "entity.name.tag",
//     // shell
//     "punctuation.separator.statement",
//     "punctuation.definition.case-pattern.shell",
//     "punctuation.terminator.case-clause.shell",
//     "keyword.operator.heredoc.shell",
//   ],
//   settings: {
//     foreground: red,
//   },
// },
