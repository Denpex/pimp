/*
 * File: /src/main.jsx
 * Project: @example/react-js
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="batman" autoLoad>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);
