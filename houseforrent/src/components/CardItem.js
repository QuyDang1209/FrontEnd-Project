import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function CardItem({ img }) {
  return (
    <>
      <Card
        sx={{
          width: "calc(calc(100% - 60px) / 4)",
          "@media (max-width: 1200px)": {
            width: "calc(calc(100% - 40px) / 3)", // 3 cards per row
          },
          "@media (max-width: 900px)": {
            width: "calc(calc(100% - 20px) / 2)", // 2 cards per row
          },
          "@media (max-width: 600px)": {
            width: "100%", // 1 card per row
          },
        }}
      >
        <CardMedia
          component="img"
          height="300px"
          image={img}
          alt="Paella dish"
          style={{ borderRadius: "10px" }}
        />
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
        />
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
