import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import CardImage from "../../images/headerBg.jpg";

const CardName = ({ hostel_name, room_number, total_rooms }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h6">{hostel_name}</Typography>
      <Typography variant="body1">
        {room_number}{" "}
        <Typography variant="body2" component="span">
          out of
        </Typography>{" "}
        {total_rooms}
      </Typography>
    </div>
  );
};

function RoomsCard({ room }) {
  return (
    <Card elevation={1}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={CardImage}
          alt="green iguana"
        />
        <CardContent>
          <CardName
            hostel_name={room.hostel.name}
            room_number={room.room_number}
            total_rooms={room.hostel.number_of_rooms}
          />
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button size="small" color="primary" variant="contained">
          View
        </Button>
        <Typography variant="h6">
          <Typography variant="overline">
            <sup>GH₵</sup>
          </Typography>
          {room.price}
        </Typography>
      </CardActions>
    </Card>
  );
}

export default RoomsCard;
