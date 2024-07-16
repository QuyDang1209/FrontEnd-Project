import React from "react";
import { Card, CardHeader, CardMedia, CardActions, IconButton, Typography, Button, Box } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

export default function CardItem({ img, title, address, description, rentingprice }) {
    return (
        <Card
            style={{display: "flex", flexDirection:"column", justifyContent: "space-between"}}
            sx={{
                maxWidth: 345,
                margin: "10px",
                "@media (max-width: 1200px)": {
                    width: "calc(calc(100% - 40px) / 3)",
                },
                "@media (max-width: 900px)": {
                    width: "calc(calc(100% - 20px) / 2)",
                },
                "@media (max-width: 600px)": {
                    width: "100%", // 1 card per row
                },
            }}
        >
            <Box>
            <CardMedia
                component="img"
                height="200"
                image={img}
                alt={title}
                style={{ borderRadius: "10px" }}
            />
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={title}
                subheader={`Address: ${address}`}
                sx={{ paddingBottom: "0px" }}
            />
            <Typography variant="body2" color="text.secondary" style={{ padding: "16px" }}>
                {description}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ padding: "0 16px 16px" }}>
                {`Renting Price: ${rentingprice}`}
            </Typography>
            </Box>
            <CardActions disableSpacing style={{ marginBottom: "10px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Box>
        <Button variant="contained" color="primary" aria-label="book now">
          Đặt trước
        </Button>
      </Box>
      </CardActions>
        </Card>
    );
}
