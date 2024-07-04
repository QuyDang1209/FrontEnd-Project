import React, { useState } from 'react';
import axios from 'axios';
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Box
} from '@mui/material';

const ChangePasswordForm = () => {
    let userId = 1;
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        // Kiểm tra các điều kiện đầu vào
        if (newPassword === currentPassword) {
            setError('Mật khẩu mới không được trùng với mật khẩu cũ');
            return;
        }

        if (newPassword.length < 6 || newPassword.length > 8) {
            setError('Mật khẩu mới phải từ 6-8 ký tự');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('Các trường dấu (*) không được để trống');
            return;
        }

        try {
            const response = await axios.patch(
                `http://localhost:8080/api/user/change-password/${userId}`,
                {
                    currentPassword,
                    newPassword
                },
                {
                    headers: {
                        'Authorization': 'Bearer <your_access_token>',
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                setSuccess('Mật khẩu đã được thay đổi thành công');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            setError('Đã xảy ra lỗi khi thay đổi mật khẩu: ' + error.message);
        }
    };

    return (
        <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    Thay Đổi Mật Khẩu
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Bao gồm các trường:
                    <br />
                    - Mật khẩu hiện tại ()
                    <br />
                    - Mật khẩu mới ()
                    <br />
                    - Nhập lại mật khẩu (*)
                </Typography>
                {error && (
                    <Typography variant="body2" color="error" gutterBottom>
                        {error}
                    </Typography>
                )}
                {success && (
                    <Typography variant="body2" color="success" gutterBottom>
                        {success}
                    </Typography>
                )}
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Mật khẩu hiện tại"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Mật khẩu mới"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Nhập lại mật khẩu"

                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Thay Đổi Mật Khẩu
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ChangePasswordForm;
