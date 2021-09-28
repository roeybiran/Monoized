export default function makeSupplementaryJson({
  name,
  label,
  uiTheme,
  fileName,
  description,
  repository,
  version,
  license,
  author,
  publisher,
}) {
  return {
    name,
    displayName: label,
    description,
    repository,
    version,
    license,
    author,
    publisher,
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
