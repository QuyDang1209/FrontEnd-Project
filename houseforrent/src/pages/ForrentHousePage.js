import React from "react";
import Divider from "@mui/material/Divider";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { CustomButton } from "../custom-component/CustomButton";
import HeaderMenu0 from "../components/HeaderMenu0";
import BasicList from "../components/BasicList";
import Footer from "../components/Footer";
import ForrentHouseList from "../components/forrenthouse/ForrentHouseList";

export default function ForrentHousePage(){
    return (
        <>
            <HeaderMenu0 />
            <Divider/>
            <Container
                sx={{
                "@media (min-width: 1536px)": {
                maxWidth: "1400px",
            },
        }}
        style={{ paddingLeft: 0, paddingRight: 0, marginTop: "20px" }}
        >
        <Box>
            <ForrentHouseList />
        </Box>
            </Container>
            <Divider />
            <Footer />
        </>
    )
}