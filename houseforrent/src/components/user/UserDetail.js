import React from 'react';
import {
    Typography,
    Card,
    CardContent,
    Box
} from '@mui/material';

const UserDetail = ({ user, onClose }) => {
    if (!user) return null;

    return (
        <Card elevation={3} sx={{ p: 4, mt: 4 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="h5" component="h3" gutterBottom>
                        Thông tin chi tiết người dùng 111
                    </Typography>
                    {/* <Typography variant="button" onClick={onClose} sx={{ cursor: 'pointer' }}>
                        Đóng
                    </Typography> */}
                </Box>
                <Typography variant="body1" mb={1}>
                    <strong>Họ và tên:</strong> {user.name}
                </Typography>
                <Typography variant="body1" mb={1}>
                    <strong>Địa chỉ:</strong> {user.address}
                </Typography>
                <Typography variant="body1" mb={1}>
                    <strong>Số điện thoại:</strong> {user.phone}
                </Typography>
                <Typography variant="body1" mb={1}>
                    <strong>Ngày/Tháng/Năm sinh:</strong> {user.dob}
                </Typography>
                <Typography variant="body1" mb={1}>
                    <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="body1" mb={1}>
                    <strong>Vai Trò:</strong> {user.role[0].rolename}
                </Typography>
                <Typography variant="body1" mb={1}>
                    <strong>Trạng Thái:</strong> {user.active.active === 'OPEN' ? 'Hoạt động' : 'Không hoạt động'}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default UserDetail;
