import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@themeit/native": path.resolve("../../packages/core"),
    },
  },
});
