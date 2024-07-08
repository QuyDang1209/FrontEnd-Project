// components/edit.js
import React, { useState, useEffect } from 'react';
import validator from 'validator';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, TextField, Grid, Box, Typography, Paper } from "@mui/material";

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
            toast.success('Edit successful!');
            navigate('/profile');
        } catch (error) {
            setError('Lỗi khi cập nhật hồ sơ: ' + error.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
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
                        {/*<Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>*/}
                        {/*    <Avatar*/}
                        {/*        alt="User Avatar"*/}
                        {/*        src={profile.avatar}*/}
                        {/*        sx={{ width: 100, height: 100 }}*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                        {/*<Grid item xs={12} sm={8}>*/}
                        {/*    <TextField*/}
                        {/*        label="URL ảnh đại diện"*/}
                        {/*        variant="outlined"*/}
                        {/*        id="avatar"*/}
                        {/*        name="avatar"*/}
                        {/*        value={profile.avatar}*/}
                        {/*        onChange={handleInputChange}*/}
                        {/*        fullWidth*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                        <Grid item xs={12}>
                            <TextField
                                label="Họ và tên"
                                variant="outlined"
                                id="name"
                                name="name"
                                value={profile.name}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Địa chỉ"
                                variant="outlined"
                                id="address"
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
                                id="phone"
                                name="phone"
                                value={profile.phone}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                Lưu
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default ProfileForm;
