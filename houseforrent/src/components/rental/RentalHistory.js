import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    Typography,
    Alert,
} from '@mui/material';
import HeaderMenu1 from '../components/HeaderMenu1';
import Footer from '../components/Footer';

export default function RentalHistory() {
    const [rentalHistory, setRentalHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchRentalHistory();
    }, []);

    const fetchRentalHistory = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:8080/api/user/rental-history', {
                params: {
                    userId: 1 // Replace with actual user ID from authentication context
                }
            });
            setRentalHistory(response.data);
        } catch (error) {
            setError('Error fetching rental history.');
            console.error('Error fetching rental history:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelRental = async (rentalId) => {
        try {
            await axios.post('http://localhost:8080/api/user/cancel-rental', { rentalId });
            fetchRentalHistory(); // Refresh the rental history after cancellation
        } catch (error) {
            setError('Error cancelling rental.');
            console.error('Error cancelling rental:', error);
        }
    };

    return (
        <>
            <HeaderMenu1 />
            <Divider />
            <Container sx={{ marginTop: '20px', marginBottom: '20px' }}>
                <Typography variant="h4" gutterBottom>Rental History</Typography>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : rentalHistory.length > 0 ? (
                    rentalHistory.map((rental) => (
                        <Box key={rental.id} mb={2} p={2} border={1} borderRadius={4}>
                            <Typography variant="h6">{rental.namehouse}</Typography>
                            <Typography>Rental Time: {rental.rentalTime}</Typography>
                            <Typography>Total Order: {rental.totalOrder}</Typography>
                            <Typography>Status: {rental.orderStatus}</Typography>
                            <Typography>House:{rental.forrents.id}</Typography>
                            <Typography>House:{rental.users.id}</Typography>
                            {rental.status === 'Pending' && rental.daysUntilRental > 1 && (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleCancelRental(rental.id)}
                                >
                                    Cancel Rental
                                </Button>
                            )}
                        </Box>
                    ))
                ) : (
                    <Typography>No rental history available.</Typography>
                )}
            </Container>
            <Divider />
            <Footer />
        </>
    );
}
