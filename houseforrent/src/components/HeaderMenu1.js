import React, { useState } from 'react';
import { Box, Button, Container, Grid, Menu, MenuItem, Popover, TextField, Typography, useMediaQuery, useTheme, ButtonGroup, CustomButton , FormControl, Input, InputAdornment} from '@mui/material';
import { SearchRounded } from "@mui/icons-material";
import LanguageIcon from "@mui/icons-material/Language";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsPage from "../pages/NotificationsPage";
import { Link, useNavigate } from "react-router-dom";

const HeaderMenu1 = ({ username, landlordId }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [accountAnchorEl, setAccountAnchorEl] = useState(null);
    const [anchorElPopover, setAnchorElPopover] = useState(null);
    const [anchorElPopoverWeek, setAnchorElPopoverWeek] = useState(null);
    const [showNotifications, setShowNotifications] = useState(false);

    const theme = useTheme();
    const navigation = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.up("xs"));
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

    const open = Boolean(anchorEl);
    const accountOpen = Boolean(accountAnchorEl);
    const openPopover = Boolean(anchorElPopover);
    const openPopoverWeek = Boolean(anchorElPopoverWeek);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAccountClick = (event) => {
        setAccountAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setAccountAnchorEl(null);
    };

    const handleMenuClick = (url) => {
        handleClose();
        navigation(url);
    };

    const handleClickPopover = (event) => {
        setAnchorElPopover(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorElPopover(null);
    };

    const handleClickPopoverWeek = (event) => {
        setAnchorElPopoverWeek(event.currentTarget);
    };

    const handleClosePopoverWeek = () => {
        setAnchorElPopoverWeek(null);
    };

    const idPopover = openPopover ? "simple-popover" : undefined;
    const idPopoverWeek = openPopoverWeek ? "simple-popover" : undefined;

    if (matchesXS && matchesMD && openPopoverWeek) {
        handleClosePopoverWeek();
    }

    if (matchesXS && matchesMD && openPopover) {
        handleClosePopover();
    }

    return (
        <Container
            sx={{
                "@media (min-width: 1536px)": {
                    maxWidth: "1400px",
                },
            }}
            style={{ paddingLeft: 0, paddingRight: 0, marginTop: "20px" }}
        >
            <Grid container>
                <Grid item md={3} xs={3} sm={3}>
                    <img
                        style={{ width: "100px", height: "50px" }}
                        src={"/images/logo-airbnb.png"}
                        alt="Airbnb Logo"
                    />
                </Grid>
                <Grid
                    item
                    md={6}
                    sx={{ display: { xs: "none", sm: "none", md: "block" } }}
                >
                    <ButtonGroup
                        variant="contained"
                        aria-label="Basic button group"
                        style={{
                            borderRadius: "30px",
                            overflow: "hidden",
                            paddingRight: "10px",
                        }}
                    >
                        <CustomButton
                            sx={{
                                position: "relative",
                                display: "inline-block",
                            }}
                            onClick={handleClickPopover}
                        >
                            Any wherEEEEEEEE
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "10%",
                                    right: 0,
                                    width: "1px",
                                    height: "80%",
                                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                                }}
                            />
                        </CustomButton>
                        <CustomButton
                            sx={{
                                position: "relative",
                                display: "inline-block",
                            }}
                            onClick={handleClickPopoverWeek}
                        >
                            Any week
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "10%",
                                    right: 0,
                                    width: "1px",
                                    height: "80%",
                                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                                }}
                            />
                        </CustomButton>
                        <FormControl variant="standard" style={{ paddingLeft: "10px" }}>
                            <Input
                                id="input-with-icon-adornment"
                                placeholder="Add guests"
                                style={{ height: "100%" }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Box
                                            style={{
                                                backgroundColor: "red",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: "50%",
                                                width: "30px",
                                                height: "30px",
                                            }}
                                        >
                                            <SearchRounded style={{ color: "white" }} />
                                        </Box>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </ButtonGroup>
                </Grid>
                <Grid item md={3} xs={9} sm={9}>
                    <Box display="flex" justifyContent="flex-end" alignItems={"center"}>
                        <Link to="/main" style={{ textDecoration: 'none' }}>
                            <Button variant="text" style={{ color: "black" }}>
                                Become a host
                            </Button>
                        </Link>
                        <LanguageIcon style={{ color: "black", marginLeft: "10px" }} />
                        <span className="notification-icon" onClick={() => setShowNotifications(!showNotifications)}>
                            <NotificationsPage landlordId={landlordId} />
                        </span>
                        <Button
                            onClick={handleClick}
                            style={{
                                border: "1px solid black",
                                borderRadius: "20px",
                                marginLeft: "10px",
                            }}
                        >
                            <FormatListBulletedIcon style={{ color: "black" }} />
                            <AccountCircle style={{ color: "black" }} />
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                sx={{
                    transform: "translateX(70px)",
                }}
            >
                <MenuItem onClick={() => handleMenuClick("/messages")} style={{ paddingRight: "100px" }}>
                    <Link to="/messages" style={{ textDecoration: "none", color: "black" }}>
                        <Typography>Tin nhắn</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick("/notifications")} style={{ paddingRight: "100px" }}>
                    <Link to="/notifications" style={{ textDecoration: "none", color: "black" }}>
                        <Typography>Thông báo</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick("/trips")} style={{ paddingRight: "100px" }}>
                    <Link to="/trips" style={{ textDecoration: "none", color: "black" }}>
                        <Typography>Chuyến đi</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick("/house")} style={{ paddingRight: "100px" }}>
                    <Link to="/house" style={{ textDecoration: "none", color: "black" }}>
                        <Typography>Danh sách nhà cho thuê</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick("/hosting")} style={{ paddingRight: "100px" }}>
                    <Link to="/hosting" style={{ textDecoration: "none", color: "black" }}>
                        <Typography>Cho thuê chỗ ở qua Airbnb</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleAccountClick} style={{ paddingRight: "100px" }}>
                    <Typography>Tài khoản</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick("/")} style={{ paddingRight: "100px" }}>
                    <Link to="/register" style={{ textDecoration: "none", color: "black" }}>
                        <Typography>Đăng ký tài khoản</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick("/")} style={{ paddingRight: "100px" }}>
                    <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
                        <Typography>Đăng nhập</Typography>
                    </Link>
                </MenuItem>
            </Menu>
            <Popover
                id={idPopover}
                open={openPopover}
                anchorEl={anchorElPopover}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                {/* Add the content for "Any wherEEEEEEEE" */}
            </Popover>
            <Popover
                id={idPopoverWeek}
                open={openPopoverWeek}
                anchorEl={anchorElPopoverWeek}
                onClose={handleClosePopoverWeek}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                {/* Add the content for "Any week" */}
            </Popover>
            {/* Notification component rendering */}
            {showNotifications && <NotificationsPage landlordId={landlordId} />}
        </Container>
    );
};

export default HeaderMenu1;
