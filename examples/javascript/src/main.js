/*
 * File: /src/main.js
 * Project: @example/javascript
 * Created: Sunday, 13th November 2022
 * Author: rashadajtou
 * -----
 * Copyright 2022, ©rashadajtou
 * -----
 */

import { getTheme, useTheme, init } from "@themeit/native";

// - Const
const H2_ID = "selected-theme-title";
const SELECT_NAME = "colorTheme";

// - Helpers
const optionSelected = (theme) => (selectedTheme === theme ? "selected" : "");

function changeThemeTitle(newTheme) {
  const h2Element = document.getElementById(H2_ID);
  h2Element.textContent = `Theme = ${newTheme}`;
}

// - Render
/* Call before using content */
init("batman", true);

// - Props
const selectedTheme = getTheme();

document.querySelector("#app").innerHTML = `
  <h1>@themeit/native</h1>
  <p class="read-the-docs">
    Theme chosen is displayed bellow
    <br/>
    <span>Don't forget to call mom.</span>
  </p>
  <h2 id="${H2_ID}"> Theme = ${selectedTheme} </h1>
  <form>
    <select name="${SELECT_NAME}" class="color-select">
      <option value="light" ${optionSelected("light")}>Light</option>
      <option value="dark" ${optionSelected("dark")}>Dark</option>
      <option value="spider-man" ${optionSelected(
        "spider-man"
      )}>Spider-man</option>
      <option value="batman" ${optionSelected("batman")}>Batman</option>
    </select>
    <br/>
    <br/>
    <button type="submit">Change theme</button>
  </form>
`;

document.querySelector("form").onsubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const newTheme = formData.get(SELECT_NAME);

  if (typeof newTheme !== "string") {
    console.error(`Selected theme is of wrong type: ${newTheme}`);
    return; // Don't go further
  }

  useTheme(newTheme);
  changeThemeTitle(newTheme);
  console.log("Theme selected ::>>", newTheme);
};
