import vscode from "./vscode/index.js";

if (process.argv.includes("vscode")) {
  vscode(process.argv.includes("install"));
}
