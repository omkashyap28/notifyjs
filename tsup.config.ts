import { defineConfig, Options } from "tsup";
import { minifyTemplates, writeFiles } from "esbuild-minify-templates";

const commonConfig: Options = {
  minify: true,
  dts: true,
  format: ["esm", "cjs"],
  sourcemap: true,
  clean: true,
  esbuildPlugins: [minifyTemplates({ taggedOnly: false }), writeFiles()],
};

export default defineConfig([
  {
    ...commonConfig,
    esbuildOptions: (options) => {
      options.banner = {
        js: `"use client"`,
      };
    },
    entry: ["src/index.ts"],
    outDir: "dist",
    loader: {
      ".css": "copy"
    }
  },
]);
