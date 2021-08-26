export default function makeSupplementaryJson({
  name,
  label,
  uiTheme,
  fileName,
}) {
  return {
    name,
    displayName: name,
    description: "",
    version: "1.0.0",
    license: "MIT",
    engines: { vscode: "*" },
    categories: ["Themes"],
    contributes: {
      themes: [
        {
          label,
          uiTheme,
          path: `./themes/${fileName}`,
        },
      ],
    },
  };
}
