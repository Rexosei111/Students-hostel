import React from "react";
import Homepage from "./pages/Home/homepage";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

// const useStyle = makeStyles({
//   App: {},
// });
function App() {
  // const classes = useStyle();

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Homepage />
    </ThemeProvider>
  );
}

export default App;
