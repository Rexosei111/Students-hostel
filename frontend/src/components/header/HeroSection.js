import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import React from "react";
import backgroundImage from "../../images/headerBg2.jpg";
import Summary from "./Summary";

function HeroSection() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        backgroundColor: "#ffffff",
        height: "70vh",
        mt: 3,
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        border: 1,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div>
        <Typography variant="h3" color="GrayText">
          Student?
        </Typography>
        <Typography variant="h5">Looking for appartment?</Typography>
        <Typography variant="h6">We have appartments for everyone</Typography>
        <Typography variant="body1">
          Just set your specs and lets pop it out!
        </Typography>
        <ButtonGroup sx={{ mt: 3 }}>
          <Button
            variant="contained"
            sx={{ bgcolor: "#122C39", color: "#ffffff" }}
            size="large"
          >
            Hostels
          </Button>
          <Button sx={{ borderColor: "#122C39", color: "#ffffff" }}>
            Rooms
          </Button>
        </ButtonGroup>
      </div>
      <Summary />
    </Container>
  );
}

export default HeroSection;
