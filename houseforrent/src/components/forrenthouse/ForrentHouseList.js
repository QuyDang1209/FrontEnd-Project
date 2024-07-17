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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import ForrentHouseDetail from "./ForrentHouseDetail";
import { Link } from 'react-router-dom';
import SortIcon from '@mui/icons-material/Sort';

export default function ForrentHouseList() {
    const [houses, setHouses] = useState([]);
    const [error, setError] = useState(null);
    const [selectedHouse, setSelectedHouse] = useState(null);
    const [filter, setFilter] = useState('all');
    const userId = 1;

    useEffect(() => {
        fetchHouses();
    }, [filter]);

    const fetchHouses = async () => {
        try {
            let response;

            console.log(filter);
            if (filter === 'all') {
                console.log("kkkkkkkkkk");
                response = await axios.get(`http://localhost:8080/api/forrent-house/users/${userId}`, {
                    headers: {
                        'Authorization': 'Bearer <your_access_token>'
                    }
                });
            }
            else {
                const typeId = filter == 'villa' ? 1 : 2;
                response = await axios.get(`http://localhost:8080/api/forrent-house/filter-house-by-type?typeId=${typeId}`, {
                    headers: {
                        'Authorization': 'Bearer <your_access_token>'
                    }
                });
            }
            setHouses(response.data);
        } catch (error) {
            console.error('Error fetching houses:', error);
            setError('Lỗi khi lấy danh sách nhà cho thuê');
        }
    };

    const handleViewClick = (house) => {
        console.log(house,"uuuuuuuuuuuuuuuuuuuuuuuuuuuuu"        )
        setSelectedHouse(house);
    };

    const handleCloseDetail = () => {
        setSelectedHouse(null);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    }

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4" component="h2">
                    Danh sách nhà cho thuê
                </Typography>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="filter-label">Filter</InputLabel>
                    <Select
                        labelId="filter-label"
                        id="filter-select"
                        value={filter}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="all"><SortIcon />All</MenuItem>
                        <MenuItem value="villa">Villa</MenuItem>
                        <MenuItem value="homestay">Homestay</MenuItem>
                        {/* Add more filter options as needed */}
                    </Select>
                </FormControl>
            </Box>
            {error && (
                <Typography variant="body2" color="error" gutterBottom>
                    {error}
                </Typography>
            )}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Tên nhà</TableCell>
                            <TableCell>Địa chỉ</TableCell>
                            <TableCell>Số phòng ngủ</TableCell>
                            <TableCell>Số phòng tắm</TableCell>
                            <TableCell>Mô tả</TableCell>
                            <TableCell>Giá</TableCell>
                            <TableCell>Loại nhà</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {houses.map((house, index) => {
                            return (
                                <TableRow key={house.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{house.namehouse}</TableCell>
                                    <TableCell>{house.address}</TableCell>
                                    <TableCell>{house.bedroom}</TableCell>
                                    <TableCell>{house.bathroom}</TableCell>
                                    <TableCell>{house.description}</TableCell>
                                    <TableCell>{house.rentingprice}</TableCell>
                                    {/* <TableCell>{house.type[0].id == 1 ? "Villa" : "Homestay"}</TableCell> */}
                                    {/* <TableCell>{house.type && house.type[0] ? (house.type[0].id == 1 ? "Villa" : "Homestay") : "Unknown"}</TableCell> */}
                                    <TableCell>{house.type == 1 ? "Villa" : "Homestay"}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleViewClick(house)}
                                        >
                                            View
                                        </Button>
                                        <Link to={`/forrent-house/edit/${house.id}`} style={{ textDecoration: "none", color: "black" }}>
                                            <Button>Edit</Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={!!selectedHouse}
                onClose={handleCloseDetail}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Thông tin chi tiết</DialogTitle>
                <DialogContent>
                    {selectedHouse && (
                        <ForrentHouseDetail house={selectedHouse} onClose={handleCloseDetail} />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetail} color="primary">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
