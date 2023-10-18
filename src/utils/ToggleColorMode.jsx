/* eslint-disable react/prop-types */
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useMemo } from "react";
import { createContext } from "react";

export const ColorModeContext = createContext();

export const ToggleColorMode = ({ children }) => {
  const [mode, setMode] = useState("dark");

  const ToggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={{ mode, setMode, ToggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
