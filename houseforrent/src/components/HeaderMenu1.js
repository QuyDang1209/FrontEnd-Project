import React from "react";
import { CustomButton } from "./../custom-component/CustomButton";
import {
    Box,
    Button,
    ButtonGroup,
    Container,
    FormControl,
    Grid,
    InputAdornment,
    TextField,
    useMediaQuery,
    Menu,
    MenuItem,
    Popover,
    Typography,
} from "@mui/material";
import Input from "@mui/material/Input";
import { SearchRounded } from "@mui/icons-material";
import LanguageIcon from "@mui/icons-material/Language";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

export default function HeaderMenu0() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [accountAnchorEl, setAccountAnchorEl] = React.useState(null);
    const [anchorElPopover, setAnchorElPopover] = React.useState(null);
    const [anchorElPopoverWeek, setAnchorElPopoverWeek] = React.useState(null);

    const navigation = useNavigate();
    const theme = useTheme();
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
        <>
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
                                                    borderRadius: "50%", // Làm tròn Box
                                                    width: "30px", // Đặt kích thước của Box
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
            </Container>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                sx={{
                    transform: "translateX(70px)", // Dịch chuyển Menu 80px sang bên trái
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
                <MenuItem
                    onClick={handleAccountClick}
                    style={{ paddingRight: "100px" }}
                >
                    <Typography>Tài khoản</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick("/")} style={{ paddingRight: "100px" }} >
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
            <Menu
                id="account-menu"
                anchorEl={accountAnchorEl}
                open={accountOpen}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "account-button",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                sx={{
                    transform: "translateY(-30px)", // Dịch chuyển Menu 80px sang bên trái
                }}
            >
                <MenuItem onClick={() => handleMenuClick("/profile")} style={{ paddingRight: "100px" }}>
                    <Typography>Thay đổi thông tin cá nhân</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick("/change-password")} style={{ paddingRight: "100px" }}>
                    <Typography>Thay đổi mật khẩu</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick("/users")} style={{ paddingRight: "100px" }}>
                    <Typography>Trạng thái hoạt động</Typography>
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
                sx={{ marginTop: "2px" }}
            >
                <Box padding={2}>
                    <Typography paddingBottom={2}>Search by:</Typography>
                    <Grid container width={"300px"} spacing={2}>
                        <Grid item>
                            <TextField name="" id="" label="City" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="" id="" label="City" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Box
                        display={"flex"}
                        justifyContent={"flex-end"}
                        sx={{ marginTop: "10px" }}
                    >
                        <Button variant="contained" color="success">
                            Search
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ marginLeft: "10px" }}
                            color="warning"
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
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
                sx={{ marginTop: "2px" }}
            >
                <Box padding={2}>
                    <Typography paddingBottom={2}>Search by any week:</Typography>
                    <Grid container width={"300px"} spacing={2}>
                        <Grid item>
                            <TextField name="" id="" label="City" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="" id="" label="City" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Box
                        display={"flex"}
                        justifyContent={"flex-end"}
                        sx={{ marginTop: "10px" }}
                    >
                        <Button variant="contained" color="success">
                            Search
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ marginLeft: "10px" }}
                            color="warning"
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Popover>
        </>
    );
}