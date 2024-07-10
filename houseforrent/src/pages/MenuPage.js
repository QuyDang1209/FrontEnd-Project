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
import Footer from "../components/Footer";
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
  };
}

export default function MenuPage(){
    return (
        <>
            <HeaderLogin />
            <Divider />
            <Container
        sx={{
          "@media (min-width: 1536px)": {
            maxWidth: "1300px",
          },
        }}
        style={{ paddingLeft: 0, paddingRight: 0, marginTop: "20px" }}
      >
        <Box>
          <Box>
            <ImageList sx={{ height: 600 }} variant="standard" cols={3} gap={8}>
              {itemData.map((item) => (
                <ImageListItem
                  key={item.img}
                  cols={item.cols || 1}
                  rows={item.rows || 1}
                >
                  <img src={`${item.img}`} alt={item.title} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Box>
        </Container>
        <Footer />
        </>
    );
}
const itemData = [
  {
    img: "https://demo-source.imgix.net/house.jpg?fit=max&w=944&h=351.333&dpr=2&q=50&auto=format%2Ccompress&cacheID=3432356195",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://th.bing.com/th/id/OIP.K2XHZApjhJtr7KaMROuZiQHaE7?rs=1&pid=ImgDetMain",
    title: "Burger",
    rows: 1,
    cols: 1,
  },
  {
    img: "https://th.bing.com/th/id/OIP.ci1E7m8wCISyHZ6um8z01gHaDt?rs=1&pid=ImgDetMain",
    title: "Camera",
    rows: 1,
    cols: 1,
  },
];