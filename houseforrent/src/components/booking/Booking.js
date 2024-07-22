import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Box, Container, Divider, Grid, ImageList, ImageListItem } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { House } from "@mui/icons-material";
import {useParams} from "react-router-dom";
import HeaderMenu0 from "../HeaderMenu0";
import Footer from "../Footer";
import axios from "axios";
import Paper from '@mui/material/Paper';

import "./booking.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

export default function Booking() {
    const {id} = useParams();
    const [img, setImg] = useState([]);
    const [forrent, setForrent] = useState("");
    useEffect(() => {
        axios.get(`http://localhost:8080/api/forrent-house/${id}`)
            .then(res => {
                console.log(res.data,"aaaaaaaaaaaaaaaa");
                setForrent(res.data)
                setImg(res.data.img)})
    },[])
  return (
    <>
      <HeaderMenu0 />
      <Divider />
      <Container
        sx={{
          "@media (min-width: 1536px)": {
            maxWidth: "1300px",
          },
        }}
        style={{ paddingLeft: 0, paddingRight: 0, marginTop: "20px" }}
      >
        <Grid container spacing={2}>
        <Grid item xs={6}>
  
        <Box  >
          <Box  >
            <Slider {...settings}>
              {img.map((item) => (
                <Box key={item.img}>
                  <img src={item.img} alt={item.title} style={{ width: '100%', height: '450px' }} loading="lazy" />
                </Box>
              ))}
            </Slider>
          </Box>
        </Box>
        </Grid>
        <Grid item xs={6}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 1,
                    width: "568px",
                    height: '450px',
                    margin: "0px"
                    },
                }}
                >
                
                <Paper elevation={10}>
                <Grid item xs={12}>aaaaa</Grid>
                </Paper>
            </Box>
        </Grid>
        </Grid>
      </Container>
      <Divider />
      <Footer sx={{marginTop: "80px !important"}}/>
    </>
  );
}
