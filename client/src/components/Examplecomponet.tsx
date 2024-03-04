// ExampleComponent.js
import React from "react";
import { useDarkMode } from "../context/theme-context";

export default function ExampleComponent() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
      <p>Current mode: {isDarkMode ? "Dark" : "Light"}</p>
    </div>
  );
}
