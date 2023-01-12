/*
 * File: /src/types/theme.ts
 * Project: @themeit/native
 * Created: Sunday, 13th November 2022
 * Author: rashadajtou
 * -----
 * Copyright 2022, ©rashadajtou
 * -----
 */

export type Theme = string | undefined;

export type DefaultTheme = "auto" | "light" | "dark";

export type CustomTheme<T extends Theme> = T extends string ? T : DefaultTheme;

export type ThemeLinkRecord = Map<String, HTMLLinkElement>;

export type ThemeListener = (
  this: MediaQueryList,
  ev: MediaQueryListEvent
) => any;
