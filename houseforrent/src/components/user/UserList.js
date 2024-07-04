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
    Switch,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import UserDetail from './UserDetail';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

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

            const updatedUsers = users.map(user => {
                if (user.id === userId) {
                    return {
                        ...user,
                        active: {
                            active: newStatus ? 'open' : 'close'
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
    const [checked, setChecked] = useState(true);
    const [unchecked, setUnChecked] = useState(false);
    const [roleId, setRoleId] = useState("");
    const handleChange = async (id, newRole) =>{
        console.log("id " + id+ " role " + newRole);
        
        console.log(roleId);
        try{
            await axios.patch(`http://localhost:8080/api/user/change-role`, [{
                id: id,
                role: newRole
            }], {
                headers: {
                    'Authorization': 'Bearer <your_access_token>',
                    'Content-Type': 'application/json'
                }
            });
            const updatedUsers = users.map(user => {
                if (user.id === id) {
                    return {
                        ...user,
                        role: [{
                            rolename: newRole == "1" ? "user" : "host",
                            id: newRole == "1" ? 1 : 2
                        }]
                    };
                }
                return user;
                
            });
            console.log(updatedUsers);
            setUsers(updatedUsers);
        }
        catch(error){
            setError('Lỗi khi thay đổi vai trò: '+ error.message);
        }
    }

    const handleViewClick = (user) => {
        setSelectedUser(user);
    };

    const handleCloseDetail = () => {
        setSelectedUser(null);
    };

    return (
        <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 4 }} >
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
                                <TableCell>Chi tiết</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => {
                                if(user.role[0].id !=3){
                                    return ((
                                        <TableRow key={user.id}>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.address}</TableCell>
                                            <TableCell>{user.phone}</TableCell>
                                            <TableCell>{new Date(user.dob).toLocaleDateString('en-GB')}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                    <Select
                                                    id="select"
                                                    value={user.role[0].id}
                                                    onChange={(evn) => {handleChange(user.id, evn.target.value)} }
                                                    >
                                                    <MenuItem value={1} > User </MenuItem>
                                                    <MenuItem value={2} > Host</MenuItem>
                                                    </Select>
                                            </FormControl>
                                            </TableCell>
                                            <TableCell>
                                                <Switch
                                                    checked={user.active.active === 'open' ? checked : unchecked }
                                                    onChange={(event) => handleSwitchChange(user.id, event.target.checked)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleViewClick(user)}
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            } )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog
                    open={!!selectedUser}
                    onClose={handleCloseDetail}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>Thông tin chi tiết người dùng</DialogTitle>
                    <DialogContent>
                        {selectedUser && (
                            <UserDetail user={selectedUser} onClose={handleCloseDetail} />
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDetail} color="primary">
                            Đóng
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Box>
    );
};

export default UserList;
