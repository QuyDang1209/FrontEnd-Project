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
import { Typography } from "@mui/material";
import {Link, useNavigate} from "react-router-dom";


export default function AdminCardItem({ img,id, title, address, description, rentingprice, handleBtnDetailClick }) {
    return (
        <Card
            style={{display: "flex", flexDirection:"column", justifyContent: "space-between"}}
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
            <Box>
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
                    <Button variant="contained" color="primary" aria-label="book now" onClick={(e) => handleBtnDetailClick(id)}>
                        Chi tiết
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );
}