import { Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { ListContainerStyles } from "./styles";
import homeStyles from "./styles";
import RoomsCard from "../../components/Cards/RoomsCard";

const SectionContainer = ({ children, title }) => {
  const classes = ListContainerStyles();
  return (
    <div className={classes.container}>
      <Typography variant="h5">{title}</Typography>
      {children}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="text">show more</Button>
      </div>
    </div>
  );
};

function Homepage() {
  const [avaibleRooms, SetAvailableRooms] = useState([]);
  const [hostels, SetHostels] = useState([]);
  const classes = homeStyles();

  useEffect(() => {
    fetch("http://localhost:8000/hostels/rooms?limit=4&occupied=false")
      .then((response) => response.json())
      .then((data) => SetAvailableRooms(data));

    fetch("http://localhost:8000/hostels?limit=4")
      .then((response) => response.json())
      .then((data) => SetHostels(data));
  }, []);

  return (
    <div className={classes.container}>
      <Header />
      <Container maxWidth="lg">
        {avaibleRooms ? (
          <SectionContainer title="Available Rooms">
            <div elevation={0} className={classes.rooms}>
              {avaibleRooms.map((room, index) => (
                <RoomsCard room={room} key={index} />
              ))}
            </div>
          </SectionContainer>
        ) : null}
        {hostels ? (
          <SectionContainer title="Available Hostels">
            <div elevation={0} className={classes.rooms}>
              {hostels.map((hostel, index) => (
                <RoomsCard room={hostel} key={index} />
              ))}
            </div>
          </SectionContainer>
        ) : null}
      </Container>
    </div>
  );
}

export default Homepage;
