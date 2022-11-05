/*
 * File: /src/types/theme-context.ts
 * Project: @themeit/react
 * Created: Sunday, 13th November 2022
 * Author: Denpex
 * -----
 * Copyright 2022, ©Denpex
 * -----
 */

import type { CustomTheme, Theme } from "@themeit/native";
import type { ContextResult } from "./context";

export type ThemeContextState<T extends Theme> = {
  /**
   * Current active theme of ThemeIT!.
   */
  theme: CustomTheme<T>;
  /**
   * List of all themes available to ThemeIT!.
   */
  themeList: Array<string>;
};

export type ThemeContextDispatch = {
  /**
   * Change current theme of ThemeIT!.
   * @param {string} value New theme
   */
  changeTheme: <T extends Theme>(value: CustomTheme<T>) => void;
};

export type ThemeContext<T extends Theme = undefined> = ContextResult<
  ThemeContextState<T>,
  ThemeContextDispatch
>;
