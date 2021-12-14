import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Divider, Paper, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    height: 120,
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
  },
  info: {
    height: "inherit",
    padding: "8px 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "&:last-child": {
      borderRadius: 15,
    },
  },
}));

function Summary() {
  const [summary, SetSummary] = useState({});
  const classes = useStyles();

  useEffect(() => {
    fetch("http://localhost:8000/hostels/summary")
      .then((response) => response.json())
      .then((data) => SetSummary(data));
  }, []);

  return (
    <Paper
      className={classes.container}
      sx={{ borderRadius: "15px", minWidth: 400 }}
      elevation={8}
    >
      <div className={classes.info}>
        <Typography variant="body1" color="GrayText">
          Number of Hostels
        </Typography>
        <Typography variant="h2">{summary.number_of_hostels}</Typography>
      </div>
      <Divider orientation="vertical" variant="middle" flexItem />
      <div className={classes.info}>
        <Typography variant="body1" color="GrayText">
          Number of Rooms
        </Typography>
        <Typography variant="h2">{summary.number_of_rooms}</Typography>
      </div>
      <Divider orientation="vertical" variant="middle" flexItem />
      <div className={classes.info}>
        <Typography variant="body1" color="GrayText">
          Available Rooms
        </Typography>
        <Typography variant="h2">{summary.available_rooms}</Typography>
      </div>
      <Divider orientation="vertical" variant="middle" flexItem />
      <div
        className={classes.info}
        style={{ backgroundColor: "#122C39", color: "#ffffff" }}
        elevation={10}
      >
        <Typography variant="body1" color="White">
          Average price of Rooms
        </Typography>
        <Typography variant="h2">
          <sup style={{ fontSize: 16 }}>GH₵</sup>
          {summary.average_price}
        </Typography>
      </div>
    </Paper>
  );
}

export default Summary;
