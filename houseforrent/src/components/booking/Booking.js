import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Box, Button, Container, Divider, Grid, ImageList, ImageListItem, TextField } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { House } from "@mui/icons-material";
import {useParams, useNavigate} from "react-router-dom";
import HeaderMenu0 from "../HeaderMenu0";
import Footer from "../Footer";
import axios from "axios";
import Paper from '@mui/material/Paper';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import dayjs from 'dayjs';
import { format, parseISO,getTime } from 'date-fns';
import "./booking.css";
import { CustomButton } from '../../custom-component/CustomButton';
import { toast } from 'react-toastify';

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
    const navigate = useNavigate();
    const [img, setImg] = useState([]);
    const [forrentDetail, setForrentDetail] = useState("");
    const [host, setHost] = useState("");
    const [user, setUser] = useState("");
    
    const [formState, setFormState] = useState({
      orderday: null,
      payday: null,
      deposite:"",
      forrent: id,
      users: JSON.parse(localStorage.getItem('user')).id,
      payment:1,
      status:1
    });
    useEffect(() => {
        axios.get(`http://localhost:8080/api/forrent-house/${id}`)
            .then(res => {
                console.log(res.data,"aaaaaaaaaaaaaaaa");
                setForrentDetail(res.data)
                setHost(res.data.users)
                setImg(res.data.img)})
    },[])

    const handleChangeDatePicker = (newValue) => {
      setFormState({
          ...formState,
          orderday: newValue[0],
          payday: newValue[1],
      });
  };
  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }
  const handleBooking = async() => {
    let sendObject = {
      ...formState,
      orderday: format(formState.orderday.toDate() , 'yyyy-MM-dd'),
      payday: format(formState.payday.toDate(), 'yyyy-MM-dd'),
    }
    console.log(sendObject);
    try{
      let res = await axios.post("http://localhost:8080/api/booking", sendObject);
      console.log(res);
      if (res.status == 201) {
        toast.success("Đặt thuê thành công, vui lòng kiểm tra email");
         axios.post("http://localhost:8080/api/send-email", {
            recipient: "dangphuocquy1996@gmail.com", //thay địa chỉ email bằng forrentDetail.users
            subject: "Thông báo xác nhận thuê nhà",
            user: host,
            forrent: forrentDetail,
            booking: sendObject
        });
        navigate("/main")
      }
    }
    catch(error){
      console.log("error", error);
      toast.error("Đặt thuê thất bại, xem lại ngày đặt thuê của bạn");
      return;
    }
  
  }
  

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
                <Container> 
                <Grid item xs={12} sx={{ fontSize: "15px"}}>
                    <strong>{forrentDetail.namehouse}</strong>
                </Grid>
                <Grid item xs={12} sx={{ fontSize: "15px"}}>
                    <strong>Địa chỉ: {forrentDetail.address}</strong>
                </Grid>
                <Grid item xs={12}sx={{ fontSize: "15px"}}>
                    <strong>Số phòng ngủ:{forrentDetail.bedroom}</strong>
                </Grid>
                <Grid item xs={12} sx={{ fontSize: "15px"}}>
                    <strong>Số phòng tắm: {forrentDetail.bathroom}</strong>
                </Grid>
                <Grid item xs={12} sx={{ fontSize: "15px"}}>
                    <strong>Giá thuê: {forrentDetail.rentingprice} VND/ ngày</strong>
                </Grid>
                <Grid item xs={12} sx={{ fontSize: "15px"}}>
                    <strong>Mô tả chung: {forrentDetail.decription}</strong>
                </Grid>
                <Grid item xs={12} sx={{marginTop: "10px",marginBottom: "10px"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DemoContainer components={['DateRangePicker']} >
                  <DateRangePicker
                      localeText={{ start: 'Check-in', end: 'Check-out' }} className="demoxxx"
                      value={[dayjs(formState.orderday), dayjs(formState.payday)]}
                        onChange={handleChangeDatePicker}
                        />
                  </DemoContainer>
              </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                <TextField
                    label="Số tiền đặt cọc"
                    variant="outlined"
                    id="outlined-size-small"
                    name="deposite"
                    value={formState.deposite}
                    onChange={handleInputChange}
                    fullWidth
                />
                </Grid>
                <Grid item xs={12} sx={{marginTop: "10px",marginBottom: "10px", fontSize: "15px"}}>
                  <strong>Số tiền còn lại phải thanh toán: </strong>  { (formState.payday != null && formState.orderday != null) ? (forrentDetail.rentingprice * (formState.payday.diff(formState.orderday,'days') ) -  formState.deposite).toLocaleString('de-DE') : 0} VND
                </Grid>
                <Grid item xs={12}>
                <Button onClick={handleBooking} variant="contained" color="primary" type="submit" sx={{marginTop: "10px", marginBottom: "10px", display: "block", width: "100%"}}>
                    Đặt ngay
                </Button>
                </Grid>
                </Container>
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
