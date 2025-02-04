import React, { useState, useEffect } from 'react';
import validator from 'validator';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { Avatar, Button, TextField, Grid, Box, Typography, Paper, Divider, Container, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import HeaderLogin from '../HeaderLogin';
import Footer from '../Footer';
import HeaderMenu0 from "../HeaderMenu0";

const ProfileForm0 = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: '',
        address: '',
        phone: ''
    });
    const [error, setError] = useState(null);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const user = JSON.parse(localStorage.getItem('user'));
    const id = user.id;

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/user/${id}`);
            setProfile(response.data);
        } catch (error) {
            setError('Lỗi khi lấy dữ liệu hồ sơ: ' + error.message);
        }
    };

    const handleInputChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!profile.name || !profile.phone) {
            setError('Họ và tên và số điện thoại là bắt buộc');
            return;
        }

        if (!validator.isAlphanumeric(profile.name.replace(/\s/g, ''))) {
            setError('Họ và tên chỉ được chứa ký tự chữ và số');
            return;
        }

        if (!validator.isMobilePhone(profile.phone)) {
            setError('Định dạng số điện thoại không hợp lệ');
            return;
        }

        try {
            let objSend = {
                ...profile,
                role: profile.role[0].id,
                active: profile.active.id
            }
            const response = await axios.patch(`http://localhost:8080/api/user/edit/${id}`, objSend);
            setProfile(response.data);
            setError(null);
            setIsEditingName(false);
            setIsEditingAddress(false);
            setIsEditingPhone(false);
            toast.success('Cập nhật thông tin cá nhân thành công');
            navigate('/profile');
        } catch (error) {
            setError('Lỗi khi cập nhật hồ sơ: ' + error.message);
        }
    };

    const handleBack = () => {
        navigate('/users');
    };

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
                style={{ paddingLeft: 0, paddingRight: 0, marginTop: "20px", minHeight: "80vh" }}
            >
                <Box>
                    <Grid container justifyContent="center">
                        <Grid item xs={8}>
                            <Box sx={{ width: "75%" }}>
                                <Paper elevation={3} sx={{ p: 4 }}>
                                    <Typography variant="h4" component="h2" gutterBottom>
                                        Hồ sơ
                                    </Typography>
                                    {error && (
                                        <Typography variant="body2" color="error" gutterBottom>
                                            {error}
                                        </Typography>
                                    )}
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={12}>
                                                {isEditingName ? (
                                                    <TextField
                                                        sx={{ mt: 2 }}
                                                        label="Họ và tên"
                                                        variant="outlined"
                                                        id="outlined-size-small"
                                                        name="name"
                                                        value={profile.name}
                                                        onChange={handleInputChange}
                                                        fullWidth
                                                    />
                                                ) : (
                                                    <Box display="flex" alignItems="center">
                                                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                                            {profile.name}
                                                        </Typography>
                                                        <IconButton onClick={() => setIsEditingName(true)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Box>
                                                )}
                                            </Grid>
                                            <Grid item xs={12}>
                                                {isEditingAddress ? (
                                                    <TextField
                                                        sx={{ mt: 2 }}
                                                        label="Địa chỉ"
                                                        variant="outlined"
                                                        id="outlined-size-small"
                                                        name="address"
                                                        value={profile.address}
                                                        onChange={handleInputChange}
                                                        fullWidth
                                                    />
                                                ) : (
                                                    <Box display="flex" alignItems="center">
                                                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                                            {profile.address}
                                                        </Typography>
                                                        <IconButton onClick={() => setIsEditingAddress(true)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Box>
                                                )}
                                            </Grid>
                                            <Grid item xs={12}>
                                                {isEditingPhone ? (
                                                    <TextField
                                                        label="Số điện thoại"
                                                        variant="outlined"
                                                        id="outlined-size-small"
                                                        name="phone"
                                                        value={profile.phone}
                                                        onChange={handleInputChange}
                                                        fullWidth
                                                    />
                                                ) : (
                                                    <Box display="flex" alignItems="center">
                                                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                                            {profile.phone}
                                                        </Typography>
                                                        <IconButton onClick={() => setIsEditingPhone(true)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Box>
                                                )}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box display="flex" justifyContent="space-between" mt={2}>
                                                    <Button variant="contained" color="primary" type="submit">
                                                        Lưu
                                                    </Button>
                                                    <Link to="/main" style={{ textDecoration: 'none' }}>
                                                        <Button variant="outlined" color="primary">
                                                            Quay lại
                                                        </Button>
                                                    </Link>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default ProfileForm0;