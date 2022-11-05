import type { DefaultTheme } from "@themeit/native";
import { getTheme, useTheme, init, getThemeList } from "@themeit/native";

// - Types
type CustomTheme = "spider-man" | "batman";
type AllThemes = CustomTheme | DefaultTheme; // spider-man | batman | light | dark | "no-preference"

// - Const
const H2_ID = "selected-theme-title";
const SELECT_NAME = "colorTheme";

/* Call before rending content */
init("spider-man", true);

// - Render
const selectedTheme = getTheme<CustomTheme>();

// - Helpers
const optionSelected = (theme: string) =>
  selectedTheme === theme ? "selected" : "";

function changeThemeTitle(newTheme: AllThemes) {
  const h2Element = document.getElementById(H2_ID);
  h2Element!.textContent = `Theme = ${newTheme}`;
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <h1>@themeit/native</h1>
  <p class="read-the-docs">
    Theme chosen is displayed bellow
    <br/>
    <span>Don't forget to call mom.</span>
  </p>
  <h2 id="${H2_ID}"> Theme = ${selectedTheme} </h1>
  <form>
    <select name="${SELECT_NAME}" class="color-select">
      ${getThemeList().map(
        (theme) =>
          `<option value="${theme}" ${optionSelected(theme)}>${theme}</option>`
      )}
    </select>
    <br/>
    <br/>
    <button type="submit">Change theme</button>
  </form>
`;

document.querySelector("form")!.onsubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target! as HTMLFormElement);
  const newTheme = formData.get(SELECT_NAME) as AllThemes;

  if (typeof newTheme !== "string") {
    console.error(`Selected theme is of wrong type: ${newTheme}`);
    return; // Don't go further
  }

  useTheme<AllThemes>(newTheme);
  changeThemeTitle(newTheme);
  console.log("Theme selected ::>>", newTheme);
};
