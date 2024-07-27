import React, { useState } from "react";
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
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function AdminCardItem1({ img, id, title, address, description, rentingprice }) {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
/*
  const handleBooking = () => {
    if (startDate && endDate) {
      const days = (endDate - startDate) / (1000 * 3600 * 24);
      const price = days * rentingprice;
      setTotalPrice(price);
      alert(`Booking successful! Total price: ${price}`);
      handleClose();
    }
  };  */
    const handleBtnDetailClick = () => {
    // You can add your login check here
    // For now, it just shows the toast notification
    toast.error("Oops! You have to login");
  };
  return (
    <Card
      style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
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
      {/* <CardActions disableSpacing style={{ marginBottom: "10px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="contained" color="primary"
              aria-label="book now" onClick={handleOpen}
              sx={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Đặt mua ngay
            </Button>
            <Button variant="contained"
                  color="primary" aria-label="details"
                  onClick={() => handleBtnDetailClick(id)}>
              Chi tiết
            </Button>
          </Box>
        </Box>
      </CardActions> */}
    <CardActions disableSpacing style={{ marginBottom: "10px" }}>
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
    {/* Icon Container */}
    <Box sx={{ display: "flex", gap: 1, mr: 2 }}>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
      </IconButton>
      <IconButton aria-label="share">
        <ShareIcon />
      </IconButton>
    </Box>
    
    {/* Button Container */}
    <Box sx={{ display: "flex", gap: 1, flex: 1 }}>
      {/* <Button
        variant="contained"
        color="primary"
        aria-label="book now"
        onClick={handleOpen}
      >
        Đặt mua ngay
      </Button> */}
      <Button
        variant="contained"
        color="primary"
        aria-label="details"
        onClick={() => handleBtnDetailClick(id)}
        sx={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", ml: 1 }}
      >
        Chi tiết
      </Button>
    </Box>
  </Box>
</CardActions>
<ToastContainer />
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Đặt thuê nhà:</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy/MM/dd"
              placeholderText="Chọn ngày bắt đầu"
              isClearable
              style={{ width: "100%" }}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="yyyy/MM/dd"
              placeholderText="Chọn ngày kết thúc"
              isClearable
              style={{ width: "100%" }}
            />
            <Typography variant="body2" color="text.secondary">
              Tổng tiền: {totalPrice}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleBooking} color="primary" disabled={!startDate || !endDate}>
            Đặt thuê
          </Button>
        </DialogActions>
      </Dialog> */}
    </Card>
  );
}
