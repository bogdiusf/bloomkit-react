import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname),
  configFile: false,
  css: {
    postcss: path.resolve(__dirname, ".."),
  },
});
