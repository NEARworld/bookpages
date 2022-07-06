import React from "react";
import { Card, Box, CardMedia, Button, CardActions } from "@mui/material";

const BookCard = ({ item, navigate }) => {
  console.log(item);
  return (
    <Card key={item._id} className="gallery-card">
      <Box
        className="gallery-card-media"
        onClick={() => navigate(`/info/${item._id}`)}
      >
        <CardMedia
          component="img"
          image={`data:image/png;base64, ${item.picture}`}
          alt="Paella dish"
        />
      </Box>
      <CardActions
        sx={{
          justifyContent: "end",
        }}
      >
        <Button size="small" onClick={() => navigate(`/info/${item._id}`)}>
          More info
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
