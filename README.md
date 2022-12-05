# ThemeIT!

![Monarch butterfly hatched from a cocoon](public/poster-image.jpg)

> Image: Monarch Butterfly hatched from a cocoon.

A lightweight browser native way to change color themes. `ThemeIT!` follows the [Modern Web](https://modern-web.dev/guides/going-buildless/css/) implementation for css theming and leverages the awesome power of `CSS` variables and `HTML` link element + with `Javascript` to allow theme customization inside of your web app, react app or website.

## Package information

**`@themeit/native`**

| Detail             | Value                                      |
| ------------------ | ------------------------------------------ |
| Version            | `1.0.0`                                    |
| Size               | `4.0 kB`                                   |
| Size (gzip)        | `1.7 kB`                                   |
| SHASUM             | `6bac78a300b1166db102c68f125b225a80136289` |
| Dependency (count) | `0`                                        |

**`@themeit/react`**

| Detail             | Value                                      |
| ------------------ | ------------------------------------------ |
| Version            | `1.0.0`                                    |
| Size               | `3.3 kB`                                   |
| Size (gzip)        | `1.5 kB`                                   |
| SHASUM             | `2853d85b0b5b360ba0dd932445321db62c68b320` |
| Dependency (count) | `2`                                        |

## Install

### `npm`

```bash
npm install @themeit/native
npm install @themeit/react # If you support React
```

### `yarn`

```bash
yarn add @themeit/native
yarn add @themeit/react # If you support React
```

## Setup instructions

### Step 1 (Prep work)

1. Prepare your `CSS` by separating each theme into it's own `CSS` file.
2. Use the `:root` pseudo-class for setting all variables.
3. Make sure that all variables match.

> You can look at the `examples/` directory to get a visual representations of what
> needs to be done

### Step 2 (Loading CSS)

1. Add all CSS theme files inside of your HTML file.
2. Set the `media(prefers-color-scheme: <name>)` attribute for each theme
3. For the main theme please set the following `(prefers-color-scheme: no-preference)` or `(prefers-color-scheme: light)` as the `media` attribute.

> Important when setting the `(prefers-color-scheme: <name>)` the `<name>` will be used by `ThemeIT!` internally and externally. This key/name will be used by you when you want to change the theme using `ThemeIT!`. Please name them accordingly.

## How to use (Javascript/Typescript)

### Initialize

Import `ThemeIT!` and call `init` method in root file before using any other methods. (Do this after [Setup instructions](#setup-instructions)).

1. Argument #1 `defaultTheme` what theme should be set
   as the initial theme. (Default: no-preference)
2. Argument #2 `autoLoad` whatever you should load the `defaultTheme` during initialization.

```Javascript
import { init } from "@themeit/native";

init("my-theme", true)
```

```Typescript
import { init } from "@themeit/native";

type MyThemes = "light" | "dark" | "my-theme";

init<MyThemes>("my-theme", true)
```

### Change theme

To change themes please use the `useTheme` method. Make that the name here matches the one you used when setting `media(prefers-color-scheme: <name>)` of CSS file.

```Javascript
// Javascript
import { useTheme } from "@themeit/native";

const myNewTheme = "my-theme";
useTheme(newTheme);
```

```Typescript
// Typescript
import { useTheme } from "@themeit/native";

type MyThemes = "light" | "dark" | "my-theme";

const myNewTheme = "my-theme";

useTheme<MyThemes>(newTheme); // Nice autocomplete :D
```

### Get theme

To get the current theme use the `getTheme` method.

```Javascript
// Javascript
import { getTheme } from "@themeit/native";

const theme = getTheme();
```

```Typescript
// Typescript
import { getTheme } from "@themeit/native";

type MyTheme = "light" | "dark" | "my-theme";

const theme = getTheme<MyTheme>();
```

### Get all themes

To get all the themes available use the `getThemeList` method.

```Javascript
// Javascript
import { getThemeList } from "@themeit/native";

const themeList = getThemeList();
```

```Typescript
// Typescript
import { getThemeList } from "@themeit/native";

const themeList: Array<string> = getThemeList();
```

## How to use (React)

### Initialize

Import `@themeit/react` and setup the `ThemeProvider` in root file before using any other methods.
Note that `ThemeProvider` should be above `React.StrictMode` as it won't work the other way
around. (Do this after [Setup instructions](#setup-instructions)).

**`ThemeProvider` Props:**

1. `defaultTheme` – what theme should be set as the initial theme. (Default: no-preference)
2. `autoLoad` – whatever you should load the `defaultTheme` during initialization.

```Javascript
// Javascript
import { ThemeProvider } from "@themeit/react";

ReactDOM.createRoot(document.getElementById("root")).render(
 <ThemeProvider defaultTheme="my-theme" autoLoad>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);
```

```Typescript
// Typescript
import { ThemeProvider } from "@themeit/react";

type CustomThemes =  "light" | "dark" | "my-theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
 <ThemeProvider<CustomThemes> defaultTheme="my-theme" autoLoad>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);
```

### Actions

To change the theme use the `useTheme` hook from `@themeit/react`. The hook returns a tuple with `[state, action]` we are interested in the `action` here.

**Action Props:**

1. `changeTheme` – Call to change the current theme of the browser.

```Javascript
import { useTheme } from "@themeit/react";

const MyApp = () => {
   const [_, { changeTheme }] = useTheme();

   return (
      <button onClick={() => { changeTheme("dark") }}>
      Turn of the lights!
      </button>
   )
}
```

```Typescript
import { useTheme } from "@themeit/react";

type MyThemes = "light" | "dark" | "my-theme";

const MyApp = () => {
   const [_, { changeTheme }] = useTheme<MyThemes>();

   return (
      <button onClick={() => { changeTheme("dark") }}>
      Turn of the lights!
      </button>
   )
}
```

### State

To get the current theme use the `useTheme` hook from `@themeit/react`. The hook returns a tuple with `[state, action]` we are interested in the `state` here.

**State Props:**

1. `theme` – Current theme of `ThemeIT!`
2. `themeList` – All themes available for `ThemeIT!`

```Javascript
// Javascript
import { useTheme } from "@themeit/react";

const MyApp = () => {
   const [{ theme }] = useTheme();

   return (
      div>
         <h1>
            The curren theme is: {theme}
         </h1>
         <code>
         {JSON.stringify(themeList, null, 2)}
         </code>
      </div>
   )
}
```

```Typescript
// Typescript
import { useTheme } from "@themeit/react";

type MyThemes = "light" | "dark" | "my-theme";

const MyApp = () => {
   const [{ theme, themeList }] = useTheme<MyThemes>();

   return (
      <div>
         <h1>
            The curren theme is: {theme}
         </h1>
         <code>
         {JSON.stringify(themeList, null, 2)}
         </code>
      </div>
   )
}
```

## Contribution

The project could use support for: `Vue`, `Angular`, `NextJS`, `Svelte` and `Remix.run`. If you are willing to contribute please follow [CONTRIBUTE.md](./CONTRIBUTE.md) for more information.
