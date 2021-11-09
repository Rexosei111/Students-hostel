import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";

export default function ButtonAppBar() {
  const mobile = useMediaQuery("(max-width: 600px)");
  const xlscreens = useMediaQuery("(min-width: 1211px)");
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <AppBar position="static" elevation={0} sx={{ maxWidth: 1240 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Accomodation
          </Typography>
          <Button
            variant="contained"
            sx={{ mr: 2, backgroundColor: "#122C39", color: "#ffffff" }}
            style={{ display: mobile ? "none" : "block" }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            sx={{ mr: 2 }}
            style={{ display: mobile ? "none" : "block" }}
          >
            About
          </Button>
          <Button
            color="inherit"
            style={{ display: mobile ? "none" : "block" }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
