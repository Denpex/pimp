/*
 * File: /src/index.ts
 * Project: @themeit/native
 * Created: Sunday, 13th November 2022
 * Author: Denpex
 * -----
 * Copyright 2022, ©Denpex
 * -----
 */

import type {
  DefaultTheme,
  ThemeLinkRecord,
  CustomTheme,
  Theme,
  ThemeListener,
} from "./types/theme";

import {
  getPreferredColorScheme,
  getStylesheetLinks,
  addColorSchemeChangeListener,
  removeColorSchemeChangeListener,
} from "./internal/util";

// - Constants
const DEFAULT_THEME = "auto";

// - Props
let stylesheetLinkList: ThemeLinkRecord;
let activeTheme: Theme;

// - Internal

/**
 * Color scheme change listener.
 */
const colorSchemeChangeListener: ThemeListener = ({ matches: isDark }) => {
  console.log("colorSchemeChangeListener", "isDark:", isDark);
  useTheme(isDark ? "dark" : "light");
};

// - API
/**
 * Initialize ThemeIT!.
 *
 * __IMPORTANT:__
 *
 * Please make sure that you call this method before using `ThemeIT!`.
 *
 * @param defaultTheme {@link Theme} Set the default theme that will be used. Default `auto`
 * @param autoLoad Auto load the `defaultTheme`.
 */
function init(defaultTheme: Theme = undefined, autoLoad: boolean = false) {
  stylesheetLinkList = getStylesheetLinks();
  console.log("activeTheme", activeTheme);

  // Set the current theme
  if (typeof defaultTheme === "string") {
    activeTheme = defaultTheme;
  } else {
    activeTheme = DEFAULT_THEME;
  }

  // TODO: Handle autoLoad false but activeTheme == auto
  // TODO: Update docs `no-preference` replace with `auto`

  // Load theme if necessary
  autoLoad && useTheme(activeTheme);
}

/**
 * Set the CSS link to be used. This will set the
 * desired theme for the browser.
 *
 * __Warning:__
 *
 * Side-effect #1: Will change the media and disabled property of your
 * HTML Link Elements (only to the ones that have `@media` attribute color-scheme).
 *
 * @param theme Name of the theme
 */
function useTheme<T extends Theme>(theme: CustomTheme<T>) {
  const linkKeys = getThemeList();

  // update theme css media queries
  for (const key of linkKeys) {
    const wasChosen = key === theme;
    const item = stylesheetLinkList.get(key);
    if (!item) return;
    item.media = wasChosen ? "all" : "not all";
    item.disabled = !wasChosen;
    activeTheme = theme;
  }

  // add listener if auto
  if (theme === "auto") {
    addColorSchemeChangeListener(colorSchemeChangeListener);
  } else {
    removeColorSchemeChangeListener(colorSchemeChangeListener);
  }
}

/**
 * Get stored theme from local storage or locally
 *
 * __Discussion:__
 *
 * `getTheme` will try to fetch the saved theme from `localStorage` if that fails
 * it will return the currently preferred color scheme of the user.
 *
 * @returns Theme (string)
 */
function getTheme<T extends Theme>(): CustomTheme<T> {
  type PickedTheme = CustomTheme<T>;
  const preferredScheme = getPreferredColorScheme() as PickedTheme;

  if (
    typeof activeTheme === "string" &&
    stylesheetLinkList.has(activeTheme as PickedTheme)
  ) {
    return activeTheme as PickedTheme;
  }

  return preferredScheme;
}

/**
 * Returns all available themes that ThemeIT! can use
 * @returns Set of strings (themes)
 */
function getThemeList(): Array<string> {
  return Array.from(stylesheetLinkList.keys()) as string[];
}

// - Exports
export { init, useTheme, getTheme, getThemeList }; // Functions
export type { CustomTheme, ThemeLinkRecord, DefaultTheme, Theme }; // Types
