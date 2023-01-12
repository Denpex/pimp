/*
 * File: /src/index.tsx
 * Project: @themeit/react
 * Created: Sunday, 13th November 2022
 * Author: Denpex
 * -----
 * Copyright 2022, ©Denpex
 * -----
 */

import React from "react";

import type { CustomTheme, Theme } from "@themeit/native";
import type { PropsWithChildren } from "react";
import type {
  ThemeContext,
  ThemeContextDispatch,
  ThemeContextState,
} from "./types/theme-context";

import { useTheme as changeTheme, init, getThemeList } from "@themeit/native";
import { createContext, useState, useContext, useEffect } from "react";

// - Type
type Props<T extends Theme> = PropsWithChildren<{
  /**
   * The default theme that should be used by ThemeIT!. (Default: auto)
   */
  defaultTheme?: CustomTheme<T>;
  /**
   * Automatically load default theme.
   */
  autoLoad?: boolean;
}>;

// - Context
const defaultState: ThemeContext = [{}, {}];
const Context = createContext<ThemeContext<Theme>>(defaultState);

// - Provider
/**
 * React Context Provider used with ThemeIT!.
 *
 * @param props {@link Props}
 * @returns JSX.Element
 */
const ThemeProvider = <T extends Theme = undefined>({
  children,
  defaultTheme,
  autoLoad,
}: Props<T>) => {
  const [theme, setTheme] = useState(defaultTheme || "auto");
  const [themeList, setListThemes] = useState<string[]>([]);

  useEffect(() => {
    // Init and set
    init(defaultTheme, autoLoad);
    setListThemes(getThemeList());
  }, []);

  // Actions
  const onChangeTheme = (value: string) => {
    setTheme(value as CustomTheme<T>);
    changeTheme(value); // << Side-effect 🫣🫣 #1
  };

  // Combine
  const state: ThemeContextState<T> = { theme: theme as CustomTheme<T>, themeList };
  const dispatch: ThemeContextDispatch = { changeTheme: onChangeTheme };
  const values: ThemeContext<T> = [state, dispatch];

  return <Context.Provider value={values} children={children} />;
};

// - Hook
/**
 * React hook used to consume ThemeIT!.
 * @returns A {@link ThemeContext} tuple with state and action.
 */
const useTheme = <T extends Theme = undefined>() =>
  useContext<ThemeContext<T>>(Context as any);

// - Exports
export { ThemeProvider, useTheme };
export type ThemeProviderProps<T extends Theme = undefined> = Props<T>;
export type { ThemeContext, ThemeContextDispatch, ThemeContextState };
