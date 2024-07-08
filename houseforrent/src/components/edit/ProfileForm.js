// components/edit.js
import React, { useState, useEffect } from 'react';
import validator from 'validator';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { Avatar, Button, TextField, Grid, Box, Typography, Paper, Divider, Container } from "@mui/material";
import HeaderMenu from '../HeaderMenu';
import Footer from '../Footer';

const ProfileForm = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        // avatar: '',
        name: '',
        address: '',
        phone: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);
    const id = JSON.parse(localStorage.getItem('user')).id ;
    console.log(id);
    const fetchProfile = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/user/'+id, {
                headers: {
                    'Authorization': 'Bearer <your_access_token>'
                }
            });
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
            profile.role = profile.role[0].id;
            profile.active = profile.active.id;
            const response = await axios.patch('http://localhost:8080/api/user/edit/'+id, profile, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer <your_access_token>'
                }
            });
            setProfile(response.data);
            setError(null);
            toast.success('Cập nhật thông tin cá nhân thành công');
            navigate('/main');
        } catch (error) {
            setError('Lỗi khi cập nhật hồ sơ: ' + error.message);
        }
    };

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
            <Grid container justifyContent="center">
                <Grid item xs={8}>
                <Box sx={{ width: "75%"}}>
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
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Số điện thoại"
                                variant="outlined"
                                id="outlined-size-small"
                                name="phone"
                                value={profile.phone}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Box display={"flex"} sx={{ mt: 2 }}>
                            <Grid item xs={12}>
                            <Button variant="contained" color="success" type="submit" fullWidth>
                                Lưu
                            </Button>
                        </Grid>
                        </Box>
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

export default ProfileForm;
