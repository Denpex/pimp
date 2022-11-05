/*
 * File: /vite.config.ts
 * Project: @example/typescript
 * Created: Thursday, 10th November 2022
 * Author: Denpex
 * -----
 * Copyright 2022, ©Denpex
 * -----
 */

import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@themeit/native": path.resolve("../../packages/core"),
    },
  },
});
