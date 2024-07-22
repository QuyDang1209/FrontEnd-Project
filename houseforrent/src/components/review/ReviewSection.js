import React, { useState, useEffect } from 'react';
import {
    Typography,
    TextField,
    Button,
    Box,
    Avatar,
    CircularProgress,
    Alert
} from '@mui/material';
import axios from 'axios';

const ReviewSection = ({ forrentId, userId, userName, userAvatar, rentalStatus }) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            if (rentalStatus !== 'Checked-out') {
                throw new Error('Rental status must be "Checked-out" to submit a review.');
            }
            await axios.post('/api/reviews', {
                forrentId,
                userId,
                content
            });
            setSuccess(true);
            setContent('');
        } catch (e) {
            setError(e.response ? e.response.data : e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box mt={3}>
            <Typography variant="h6" mb={2}>
                Để lại nhận xét
            </Typography>
            <Avatar src={userAvatar} alt={userName} />
            <Typography variant="body1" mb={2}>
                {userName}
            </Typography>
            <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder="Nhập nhận xét của bạn"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mt: 2 }}>Nhận xét đã được gửi!</Alert>}
            <Box mt={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'Gửi'}
                </Button>
            </Box>
        </Box>
    );
};

export default ReviewSection;
