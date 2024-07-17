import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    Typography,
    Paper,
    Box,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
} from '@mui/material';

const BookingsByUser = () => {
    const [bookings, setBookings] = useState([]);
    const { userId } = useParams(); // Lấy userId từ route params
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/booking/user/${userId}`);
                setBookings(response.data);
            } catch (error) {
                toast.error("Lỗi khi lấy thông tin đặt phòng!");
                setError('Lỗi khi lấy thông tin đặt phòng: ' + error.message);
            }
        };
        fetchBookings();
    }, [userId]);

    const handleCheckIn = async (bookingId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/booking/checkin/${bookingId}/2`)
            setBookings(bookings.map(booking =>
                booking.id === bookingId ? { ...booking, statusHouse: {
                    id: 2, status: "forrent",
                    } } : booking
            ));
            toast.success('Đã check-in thành công!');
        } catch (error) {
            toast.error('Lỗi khi thực hiện check-in!');
            console.error('Lỗi khi thực hiện check-in:', error);
        }
    };

    const handleCheckOut = async (bookingId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/booking/checkout/${bookingId}/3`);
            setBookings(bookings.map(booking =>
                booking.id === bookingId ? { ...booking,  statusHouse: {
                        id: 3, status: "forrented",
                    } } : booking
            ));
            toast.success('Đã check-out thành công!');
        } catch (error) {
            toast.error('Lỗi khi thực hiện check-out!');
            console.error('Lỗi khi thực hiện check-out:', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h2">
                    Đặt phòng của người dùng
                </Typography>
                {error && (
                    <Typography variant="body2" color="error" gutterBottom>
                        {error}
                    </Typography>
                )}
                <Divider sx={{ my: 3 }} />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Mã đặt phòng</TableCell>
                                <TableCell>Nhà cho thuê</TableCell>
                                <TableCell>Ngày đặt</TableCell>
                                <TableCell>Ngày thanh toán</TableCell>
                                <TableCell>Tiền đặt cọc</TableCell>
                                <TableCell>Trạng thái nhà</TableCell>
                                <TableCell>Loại nhà</TableCell>
                                <TableCell>Người dùng</TableCell>
                                <TableCell>Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell>{booking.id}</TableCell>
                                    <TableCell>{booking.forrent.namehouse}</TableCell>
                                    <TableCell>{booking.orderDay}</TableCell>
                                    <TableCell>{booking.payDay}</TableCell>
                                    <TableCell>{booking.deposite}</TableCell>
                                    <TableCell>{booking.statusHouse.status}</TableCell>
                                    <TableCell>{booking.typeHouse.name}</TableCell>
                                    <TableCell>{booking.user.name}</TableCell>
                                    <TableCell>
                                        {booking.statusHouse.id === 1 && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleCheckIn(booking.id)}
                                            >
                                                Check-in
                                            </Button>
                                        )}
                                        {booking.statusHouse.id === 2 && (
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleCheckOut(booking.id)}
                                            >
                                                Check-out
                                            </Button>
                                        )}
                                        {booking.statusHouse.id === 3 && (
                                            <Typography color="textSecondary">
                                                Đã trả phòng
                                            </Typography>
                                        )}
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

export default BookingsByUser;
