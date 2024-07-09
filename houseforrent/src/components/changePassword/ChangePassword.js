import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Divider, Container, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import bcrypt from 'bcryptjs';
import Footer from '../Footer';
import HeaderMenu from '../HeaderMenu';
import { Link, useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [oldUser, setOldUser] = useState(null);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/user/${user.id}`);
                setOldUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
                toast.error('Không thể tải thông tin người dùng.');
            }
        };
        fetchUser();
    }, [user.id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!(await validateForm())) return;

        setLoading(true);

        try {
            const response = await axios.patch(`http://localhost:8080/api/user/change-password/${user.id}`, {
                id: user.id,
                password: formData.newPassword,
            });

            if (response.status === 200) {
                toast.success('Thay đổi mật khẩu thành công!');
                setFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                navigate("/main");
            } else {
                toast.error('Thay đổi mật khẩu thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi thay đổi mật khẩu.');
        }

        setLoading(false);

    };

    const validateForm = async () => {
        let newErrors = {};

        if (!formData.currentPassword) {
            newErrors.currentPassword = "Mật khẩu hiện tại là bắt buộc.";
        } else if (!(await bcrypt.compare(formData.currentPassword, oldUser.password))) {
            newErrors.currentPassword = "Mật khẩu hiện tại không chính xác.";
        }

        if (!formData.newPassword || formData.newPassword.length < 6 || formData.newPassword.length > 8) {
            newErrors.newPassword = "Mật khẩu mới phải từ 6 đến 8 kí tự.";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu mới.";
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu mới không trùng khớp.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    if (!user) {
        return (
            <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
                <Typography variant="h6" color="error">Người dùng không xác định.</Typography>
            </Box>
        );
    }

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
                style={{ paddingLeft: 0, paddingRight: 0, marginTop: "20px" , minHeight: "80vh" }}
            >
                <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <Typography variant="h4" component="h2" gutterBottom style={{ fontSize: '24px', color: 'black' }}>
                            Thay đổi mật khẩu
                        </Typography>
                        <Box>
                            <Grid container>
                                <Box sx={{ width: "75%" }}>
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={2} alignItems="center">
                                            <TextField
                                                label="Mật khẩu hiện tại (*)"
                                                name="currentPassword"
                                                type="password"
                                                value={formData.currentPassword}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="normal"
                                                error={!!errors.currentPassword}
                                                helperText={errors.currentPassword}
                                            />
                                            <TextField
                                                label="Mật khẩu mới (*)"
                                                name="newPassword"
                                                type="password"
                                                value={formData.newPassword}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="normal"
                                                error={!!errors.newPassword}
                                                helperText={errors.newPassword}
                                            />
                                            <TextField
                                                label="Nhập lại mật khẩu (*)"
                                                name="confirmPassword"
                                                type="password"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="normal"
                                                error={!!errors.confirmPassword}
                                                helperText={errors.confirmPassword}
                                            />
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="success"
                                                fullWidth
                                                disabled={loading}
                                                sx={{ mt: 2 }}
                                            >
                                                {loading ? 'Đang xử lý...' : 'Xác nhận'}
                                            </Button>
                                        </Grid>
                                    </form>
                                </Box>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default ChangePassword;
