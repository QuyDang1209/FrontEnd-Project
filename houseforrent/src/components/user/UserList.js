import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Switch
} from '@mui/material';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/user', {
                headers: {
                    'Authorization': 'Bearer <your_access_token>'
                }
            });
            setUsers(response.data);
        } catch (error) {
            setError('Lỗi khi lấy danh sách người dùng: ' + error.message);
        }
    };

    const handleChangeStatus = async (userId, newStatus) => {
        try {
            await axios.patch(
                `http://localhost:8080/api/user/change-active`,
                [{
                    id: userId,
                    active: newStatus ? 1 : 2
                }],
                {
                    headers: {
                        'Authorization': 'Bearer <your_access_token>',
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Cập nhật lại state sau khi thành công
            const updatedUsers = users.map(user => {
                if (user.id === userId) {
                    return {
                        ...user,
                        active: {
                            active: newStatus ? 'OPEN' : 'CLOSE'
                        }
                    };
                }
                return user;
            });
            setUsers(updatedUsers);
        } catch (error) {
            setError('Lỗi khi cập nhật trạng thái: ' + error.message);
        }
    };

    const handleSwitchChange = (userId, isChecked) => {
        handleChangeStatus(userId, isChecked);
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Danh sách người dùng
                </Typography>
                {error && (
                    <Typography variant="body2" color="error" gutterBottom>
                        {error}
                    </Typography>
                )}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Họ và tên</TableCell>
                                <TableCell>Địa chỉ</TableCell>
                                <TableCell>Số điện thoại</TableCell>
                                <TableCell>Ngày/Tháng/Năm sinh</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Vai Trò</TableCell>
                                <TableCell>Trạng Thái</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.address}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.dob}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role[0].rolename}</TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={user.active.active === 'OPEN'}
                                            onChange={(event) => handleSwitchChange(user.id, event.target.checked)}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default UserList;
