import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';

const Comments = ({ houseId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const userID = user ? user.id : null;

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/comment/forrent/${houseId}`);
                setComments(res.data);
            } catch (error) {
                toast.error('Lỗi khi lấy bình luận!');
                console.error('Lỗi khi lấy bình luận:', error);
            }
        };
        fetchComments();
    }, [houseId]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim() === '') {
            toast.error('Bình luận không được để trống!');
            return;
        }
        try {
            const token = localStorage.getItem('token');

            if (!userID) {
                toast.error('User ID không tồn tại!');
                return;
            }

            if (!token) {
                toast.error('Token không tồn tại!');
                return;
            }

            console.log('Submitting comment:', {
                user: userID,
                content: newComment,
            });

            const res = await axios.post(
                `http://localhost:8080/api/comment/forrent/${houseId}`,
                {
                    user: userID,
                    content: newComment,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setComments([...comments, res.data]);
            setNewComment('');
            toast.success('Đã thêm bình luận thành công!');
        } catch (error) {
            toast.error('Lỗi khi thêm bình luận!');
            console.error('Error details:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                Bình luận
            </Typography>
            {comments.map((comment, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                    {comment.user ? (
                        <Typography variant="body1"><strong>{comment.user.name}:</strong> {comment.content}</Typography>
                    ) : (
                        <Typography variant="body1"><strong>Unknown User:</strong> {comment.content}</Typography>
                    )}
                </Box>
            ))}
            <Box>
                <TextField
                    label="Thêm bình luận"
                    variant="outlined"
                    fullWidth
                    value={newComment}
                    onChange={handleCommentChange}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
                    Gửi
                </Button>
            </Box>
        </Paper>
    );
};

export default Comments;
