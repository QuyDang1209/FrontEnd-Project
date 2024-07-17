import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";
import {
    Box,
    Container,
    Grid,
    Paper,
    CircularProgress,
} from "@mui/material";
import HeaderMenu0 from "../components/HeaderMenu0";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DetailForrentPage() {
    const { id } = useParams();
    const [forrent, setForrent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchForrent = async () => {
            try {
                console.log("id: ", id);
                const response = await axios.get(`http://localhost:8080/api/forrent-house/detail/${id}`);
                console.log(response.data);
                setForrent(response.data);
                setLoading(false);
            } catch (error) {
                console.log("error", error);
                setError(error);
                setLoading(false);
            }
        };
        fetchForrent();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <HeaderMenu0 />
            <Divider />
            <Container
                sx={{
                    "@media (min-width: 1536px)": {
                        maxWidth: "1400px",
                    },
                }}
                style={{ paddingLeft: 0, paddingRight: 0, marginTop: "20px" }}
            >
                <Box>
                    {forrent && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4" component="h1" gutterBottom>
                                    {forrent.namehouse}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Paper elevation={3} sx={{ padding: 2 }}>
                                    <Typography variant="h6">Details</Typography>
                                    <Typography>Address: {forrent.address}</Typography>
                                    <Typography>Description: {forrent.description}</Typography>
                                    <Typography>Renting Price: ${forrent.rentingprice}</Typography>
                                    <Typography>Bedrooms: {forrent.bedroom}</Typography>
                                    <Typography>Bathrooms: {forrent.bathroom}</Typography>
                                    <Typography>Type: {forrent.type.name}</Typography>
                                    <Typography>Owner: {forrent.users.name}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper elevation={3} sx={{ padding: 2 }}>
                                    <Typography variant="h6">Images</Typography>
                                    <ImageList cols={2} rowHeight={164}>
                                        {forrent.imgDTOs.map((image) => (
                                            <ImageListItem key={image.id}>
                                                <img
                                                    src={`${image.img}`}
                                                    alt="House"
                                                    loading="lazy"
                                                />
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                </Paper>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Container>
            <Divider />
            <Footer />
        </>
    );
}
