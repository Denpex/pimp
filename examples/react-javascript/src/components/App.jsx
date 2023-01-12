/*
 * File: /src/components/App.jsx
 * Project: @example/react-js
 * Created: Sunday, 13th November 2022
 * Author: rashadajtou
 * -----
 * Copyright 2022, ©rashadajtou
 * -----
 */

import "../css/App.css";

import { useTheme } from "@themeit/react";

function App() {
  const [{ theme, themeList }, { changeTheme }] = useTheme();
  console.log("themeList ::>>", themeList);

  const onChange = (event) => {
    const newTheme = event.target.value;

    if (typeof newTheme !== "string") {
      console.error(`Selected theme is of wrong type: ${newTheme}`);
      return; // Don't go further
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
