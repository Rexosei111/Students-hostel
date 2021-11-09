import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import HeroSection from "./HeroSection";
import Hstyles from "./Hstyles";
import Summary from "./Summary";
import TopNav from "./TopNav";

function Header() {
  const classes = Hstyles();
  return (
    <div className={classes.bg}>
      <TopNav />
      <HeroSection />

      {/* <Summary /> */}
    </div>
  );
}

export default Header;
