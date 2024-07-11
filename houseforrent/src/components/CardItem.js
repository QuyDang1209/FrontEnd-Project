import React from "react";
import { Card, CardHeader, CardMedia, CardActions, IconButton, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

export default function CardItem({ img, title, address, description, rentingprice }) {
    return (
        <Card
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
            <CardMedia
                component="img"
                height="140"
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
            <CardActions disableSpacing sx={{ padding: "8px 16px", justifyContent: "flex-end" }}>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
