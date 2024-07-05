import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const ChangePassword = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/api/user')
            .then((response) => setUsers(response.data))
            .catch(error => {
                console.error('Error fetching users:', error);
                toast.error('Không thể tải danh sách người dùng.');
            });
    }, []);

    const user = JSON.parse(localStorage.getItem('user'));
    const id = user ? user.id : null;

    if (!id) {
        return <Typography variant="h6" color="error">Người dùng không xác định.</Typography>;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await axios.patch(`http://localhost:8080/api/user/change-password/${id}`, {
                id: id,
                password: formData.newPassword,
            });

            if (response.status === 200) {
                toast.success('Thay đổi mật khẩu thành công!');
                setFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            } else {
                toast.error('Thay đổi mật khẩu thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi thay đổi mật khẩu.');
        }

        setLoading(false);
    };

    const validateForm = () => {
        let newErrors = {};

        if (users.some(user => user.password === formData.currentPassword)) {
            newErrors.currentPassword = "Mật khẩu hiện tại không chính xác.";
        }

        if (!formData.currentPassword) newErrors.currentPassword = "Mật khẩu hiện tại là bắt buộc.";
        if (!formData.newPassword || formData.newPassword.length < 6 || formData.newPassword.length > 8) {
            newErrors.newPassword = "Mật khẩu mới phải từ 6 đến 8 kí tự.";
        }
        if (!formData.confirmPassword) newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu mới.";
        if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu mới không trùng khớp.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Thay đổi mật khẩu
            </Typography>
            <form onSubmit={handleSubmit}>
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
                    color="primary"
                    fullWidth
                    disabled={loading}
                    sx={{ mt: 2 }}
                >
                    {loading ? 'Đang xử lý...' : 'Xác nhận'}
                </Button>
            </form>
        </Box>
    );
};

export default ChangePassword;
