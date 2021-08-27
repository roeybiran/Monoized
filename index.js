import vscode from "./vscode/index.js";

const args = process.argv.slice(2);
if (args.includes("--app=vscode")) {
  vscode(args.includes("--install"));
}

// vscode(true);
