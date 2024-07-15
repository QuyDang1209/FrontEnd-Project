import React from "react";

import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Divider,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    TextField,
} from "@mui/material";

import AdminCardItem from "./../components/AdminCardItem";
import Footer from "../components/Footer";
import HeaderMenu0 from "../components/HeaderMenu0";

export default function AdminPage() {
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
                style={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    marginTop: "20px",
                    marginBottom: "20px",
                }}
            >
                <Box display={"flex"} gap={"20px"} flexWrap={"wrap"}>
                    <AdminCardItem img="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800" />
                    <AdminCardItem img="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800" />
                    <AdminCardItem img="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800" />
                    <AdminCardItem img="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800" />
                    <AdminCardItem img="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800" />
                    <AdminCardItem img="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800" />
                    <AdminCardItem img="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800" />
                    <AdminCardItem img="https://images.unsplash.com/photo-1469854523086-cc02fe5d880" />
                </Box>
            </Container>
            <Divider />
            <Footer />
        </>
    );
}