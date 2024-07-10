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

import HeaderLogin from "../components/HeaderLogin";
import BasicList from "../components/BasicList";
import UserList from "../components/user/UserList";
import Footer from "../components/Footer";
import HeaderMenu from "../components/HeaderMenu";


export default function UserPage() {
  return (
    <>
    <HeaderMenu />
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
            <UserList />
        </Box>
      </Container>
      <Divider />
      <Footer />
      </>
  )
}

const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
      rows: 2,
      cols: 2,
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
      rows: 1,
      cols: 1,
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
      rows: 1,
      cols: 1,
    },
  ];
  