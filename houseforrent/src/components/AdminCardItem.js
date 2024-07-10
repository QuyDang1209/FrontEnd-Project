import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function AdminCardItem({ img }) {
  return (
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
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <Box>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </Box>
          <Button variant="contained" color="primary" aria-label="book now">
            Đặt mua ngay
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}