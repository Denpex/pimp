import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@themeit/react": path.resolve("../../packages/react"),
      "@themeit/native": path.resolve("../../packages/core"),
    },
  },
  plugins: [react()],
});
