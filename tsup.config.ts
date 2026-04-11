import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: {
    compilerOptions: {
      // ignoreDeprecations is a valid TS 5.x / 6.x option but isn't in the
      // tsup type surface — cast through unknown to keep strict typing.
      ignoreDeprecations: "6.0" as unknown as undefined,
    },
  },
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});
