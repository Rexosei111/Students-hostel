import React from "react";
import HeroSection from "./HeroSection";
import Hstyles from "./Hstyles";
import TopNav from "./TopNav";

function Header() {
  const classes = Hstyles();
  return (
    <div className={classes.bg}>
      <HeroSection />
      {/* <Summary /> */}
    </div>
  );
}

export default Header;
