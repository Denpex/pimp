/*
 * File: /src/components/App.tsx
 * Project: @example/react-ts
 * Created: Sunday, 13th November 2022
 * Author: Denpex
 * -----
 * Copyright 2022, ©Denpex
 * -----
 */

import "../css/App.css";

import { useTheme } from "@themeit/react";
import { ChangeEvent } from "react";

function App() {
  const [{ theme, themeList }, { changeTheme }] = useTheme();
  console.log("themeList ::>>", themeList);

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newTheme = event.target.value;

    if (typeof newTheme !== "string") {
      console.error(`Selected theme is of wrong type: ${newTheme}`);
      return; // Guard
    }

    changeTheme?.(newTheme);
    console.log("newTheme ::>>", newTheme);
  };

  return (
    <div className="App">
      <h1>@themeit/react</h1>
      <p className="read-the-docs">Theme chosen is displayed bellow</p>
      <h2>Theme = {theme}</h2>
      <div className="card">
        <form>
          <select
            name="themeSelect"
            className="color-select"
            value={theme}
            onChange={onChange}
          >
            {themeList?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </form>
      </div>
    </div>
  );
}

export default App;
