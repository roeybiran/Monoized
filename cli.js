#!/usr/bin/env node

import { program } from "commander";
import { generate } from "./editors/vscode/index.js";

program
  .name("monoized")
  .description("Generate Monoized theme for various editors")
  .version("1.0.0");

program
  .command("generate")
  .description("Generate Monoized theme for a specific editor")
  .option(
    "-e, --editor <editor-name>",
    'Editor to generate theme for (currently only supports "vscode")',
    "vscode"
  )
  .option(
    "-o, --output <dir>",
    'The directory to output theme files to',
  )
  .action((options) => {
    try {
      if (options.editor === "vscode") {
        console.log(`Generating Monoized theme for ${options.editor}...`);
        generate(options.output);
        console.log(`Theme generated successfully in ${options.output}`);
      } else {
        throw new Error(
          `Unsupported editor: ${options.editor}. Currently only "vscode" is supported.`
        );
      }
    } catch (error) {
      console.error("Error:", error.message);
      process.exit(1);
    }
  });

program.parse();

