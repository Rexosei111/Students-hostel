import React from "react";
import Homepage from "./pages/Home/homepage";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "./Layout";
import { Routes, Route, Link } from "react-router-dom";
import Roompage from "./pages/Rooms/Roompage";

// const useStyle = makeStyles({
//   App: {},
// });
function App({ children }) {
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
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="rooms" element={<Roompage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
