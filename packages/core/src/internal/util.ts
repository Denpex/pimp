/*
 * File: /src/internal/util.ts
 * Project: @themeit/native
 * Created: Wednesday, 12th October 2022
 * Author: rashadajtou
 * -----
 * Copyright 2022, ©rashadajtou
 * -----
 */

import type {
  DefaultTheme,
  ThemeLinkRecord,
  ThemeListener,
} from "../types/theme";

// - Const
const LINK_REL_STYLESHEET = "link[rel=stylesheet]";
const PREFERS_COLOR_SCHEME = "prefers-color-scheme";
const QUERY_STYLESHEET_MEDIA = `${LINK_REL_STYLESHEET}[media*=${PREFERS_COLOR_SCHEME}]`;
const THEME_NAME_REGEX = /prefers-color-scheme: ([^;()\s]+)/;

// - Props
let mediaQueryList: MediaQueryList;

/// Get browsers preferred theme
export function getPreferredColorScheme(): DefaultTheme {
  if (window?.matchMedia(`(${PREFERS_COLOR_SCHEME}: dark)`).matches) {
    return "dark";
  }

  if (window?.matchMedia(`(${PREFERS_COLOR_SCHEME}: light)`).matches) {
    return "light";
  }

  return "light";
}

/**
 * Get a list of all available css links.
 *
 * __Discussion:__
 *
 * Please create just one instance of Stylesheet Links
 * and store them for changing themes inside.
 *
 * @returns [{ colorScheme: HTMLLinkElement }]
 */
export function getStylesheetLinks(): ThemeLinkRecord {
  // Will fetch all corresponding color links
  const stylesheetDict = new Map<String, HTMLLinkElement>();
  const cssLinks = document.querySelectorAll(QUERY_STYLESHEET_MEDIA);

  cssLinks.forEach((link) => {
    const attribute = link.attributes;
    const mediaString = attribute.getNamedItem("media")?.textContent;
    const mediaMatches = mediaString?.match(THEME_NAME_REGEX);
    const themeName = mediaMatches?.at(1);
    if (themeName) {
      stylesheetDict.set(themeName, link as HTMLLinkElement);
    }
  });

  return stylesheetDict;
}

/**
 * Adds the change event listener for the prefers-color-scheme matchMedia.
 * @param themeListener Lister that gets called when the system changes themes.
 */
export function addColorSchemeChangeListener(themeListener: ThemeListener) {
  mediaQueryList = window?.matchMedia(`(${PREFERS_COLOR_SCHEME}: dark)`);
  mediaQueryList?.addEventListener("change", themeListener);
}

/**
 * Remove the change event listener for the prefers-color-scheme matchMedia.
 * @param themeListener Lister that gets called when the system changes themes.
 */
export function removeColorSchemeChangeListener(themeListener: ThemeListener) {
  mediaQueryList.removeEventListener("change", themeListener);
}
