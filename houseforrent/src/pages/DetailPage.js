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

import HeaderDetail from "../components/HeaderDetail";
import BasicList from "../components/BasicList";
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
  };
}

export default function DetailPage() {
  return (
    <>
      <HeaderDetail />
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
          <Box>
            <Grid container>
              <Grid item xs={8}>
                <Box sx={{ width: "75%" }}>
                  <form>
                    <h1>Create profile</h1>
                    <TextField
                      fullWidth
                      label="Enter your name"
                      id="outlined-size-small"
                    />
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      label="Enter your email"
                      id="outlined-size-small"
                    />
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      label="Enter your address"
                      id="outlined-size-small"
                    />
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      label="Enter your phone number"
                      id="outlined-size-small"
                    />

                    <Box display={"flex"} sx={{ mt: 2 }}>
                      <Button variant="contained" color="success">
                        Save
                      </Button>
                      <Button
                        sx={{ ml: 2 }}
                        variant="contained"
                        color="warning"
                      >
                        Cancel
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <BasicList />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
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
