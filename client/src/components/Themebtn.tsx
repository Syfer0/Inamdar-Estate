import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import useTheme from "../context/theme"; // Import the useTheme hook

function Togglebtn() {
  const { themeMode, darkTheme, lightTheme } = useTheme(); // Access theme mode and theme toggling functions from the context

  const toggleDarkMode = () => {
    if (themeMode === "light") {
      darkTheme(); // Switch to dark theme if currently in light mode
    } else {
      lightTheme(); // Switch to light theme if currently in dark mode
    }
  };

  return (
    <button onClick={toggleDarkMode}>
      {themeMode === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
}

export default Togglebtn;
