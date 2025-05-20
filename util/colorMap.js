
const solarizedValues = {
  dark: {
    base3: null,
    base2: null,
    base1: "#93a1a1", // optional emphasized content
    base0: "#839496", // body text / default code / primary content
    base00: null,
    base01: "#586e75", // comments / secondary content
    base02: "#073642", // background highlights
    base03: "#002b36", // background
  },
  light: {
    base03: null,
    base02: null,
    base01: "#586e75", // optional emphasized content
    base00: "#657b83", // body text / default code / primary content
    base0: null,
    base1: "#93a1a1", // comments / secondary content
    base2: "#eee8d5", // background highlights
    base3: "#fdf6e3", // background
  },
  both: {
    yellow: "#b58900",
    orange: "#cb4b16",
    red: "#dc322f",
    magenta: "#d33682",
    violet: "#6c71c4",
    blue: "#268bd2",
    cyan: "#2aa198",
    green: "#859900",
  },
};

const monokaiValues = [
"#66d9ef",
"#6796e6",
"#a6e22e",
"#ae81ff", // constants
"#ae81ffa0", // "constant.numeric.line-number.find-in-files - match"
"#b267e6", // "token.debug-token"
"#cd9731", // "token.warn-token"
"#e6db74",
"#f44747", // "Invalid.deprecated", "Invalid"
"#f92672", // "keyword"
"#fd971f", // "this.self"
//
"#f8f8f2", // "variable"
"#cfcfc2", // json string
"#75715e", //  "meta.diff, meta.diff.header",  "markup.quote.markdown"
"#88846f", // comment
]

export const colorMap = {
  "#f8f8f2": {
    dark: solarizedValues.dark.base0,
    light: solarizedValues.light.base00,
  },
  "#88846f": {
    dark: solarizedValues.dark.base01,
    light: solarizedValues.light.base1,
  },
  "#e6db74": {
    dark: solarizedValues.both.yellow,
    light: solarizedValues.both.yellow,
  },
  "#f92672": {
    dark: solarizedValues.both.red,
    light: solarizedValues.both.red,
  },
  "#ae81ff": {
    dark: solarizedValues.both.violet,
    light: solarizedValues.both.violet,
  },
  "#66d9ef": {
    dark: solarizedValues.both.cyan,
    light: solarizedValues.both.cyan,
  },
  "#a6e22e": {
    dark: solarizedValues.both.green,
    light: solarizedValues.both.green,
  },
  "#fd971f": {
    dark: solarizedValues.both.orange,
    light: solarizedValues.both.orange,
  },
  "#f44747": {
    dark: solarizedValues.both.red,
    light: solarizedValues.both.red,
  },
  "#cfcfc2": {
    dark: solarizedValues.dark.base0,
    light: solarizedValues.light.base00,
  },
  "#75715e": {
    dark: solarizedValues.dark.base0,
    light: solarizedValues.light.base00,
  },
  "#ae81ffa0": {
    dark: solarizedValues.both.violet,
    light: solarizedValues.both.violet,
  },
  "#6796e6": {
    dark: solarizedValues.both.blue,
    light: solarizedValues.both.blue,
  },
  "#cd9731": {
    dark: solarizedValues.both.orange,
    light: solarizedValues.both.orange,
  },
  "#b267e6": {
    dark: solarizedValues.both.violet,
    light: solarizedValues.both.violet,
  },
};

export function transformColor(monokaiColor, darkOrLight) {
  const solarizedColor = colorMap[monokaiColor][darkOrLight]
  if (solarizedColor) {
    return solarizedColor
  } else {
    throw new Error(`Did not find Solarized value for Monokai color ${monokaiColor}`)
  }
}