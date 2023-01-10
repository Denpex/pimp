/*
 * File: /src/main.tsx
 * Project: @example/react-ts
 * Created: Sunday, 13th November 2022
 * Author: Denpex
 * -----
 * Copyright 2022, ©Denpex
 * -----
 */

import "./css/index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

import { ThemeProvider } from "@themeit/react";

// - Types
type CustomThemes = "spider-man" | "batman" | "dark" | "light" | "auto";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider<CustomThemes> defaultTheme="auto" autoLoad>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);
