import React, { useState, useEffect } from 'react';
import {
    Typography,
    Card,
    CardContent,
    Box,
    Divider,
    TextField,
    Button
} from '@mui/material';

export default function ForrentHouseDetail({ house, onClose }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/comment/forrent/${house.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }
                const data = await response.json();
                setComments(data); // Assuming data is an array of comment objects
            }
            catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        if (house) {
            fetchComments();
        }
    }, [house]);

    const handleCommentSubmit = async () => {
        try {

            let user = JSON.parse(localStorage.getItem("user"));
            const response = await fetch('http://localhost:8080/api/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: newComment,
                    users: {
                        id : user.id
                    },
                    forrents:  house.id 
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to add comment');
            }
            const data = await response.json();
            setComments([...comments, data]); 
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    if (!house) return null;

    return (
        <Card elevation={3} sx={{ p: 4, mt: 4 }}>
            <CardContent>
                {/* House Details */}
                <Typography variant="body1" mb={1}>
                    <strong>Tên nhà:</strong> {house.namehouse}
                </Typography>
                <Typography variant="body1" mb={1}>
                    <strong>Địa chỉ:</strong> {house.address}
                </Typography>
                <Typography variant="body1" mb={1}>
                    <strong>Số phòng ngủ:</strong> {house.bedroom}
                </Typography>
                <Typography variant="body1" mb={1}>
                    <strong>Số phòng tắm:</strong> {house.bathroom}
                </Typography>
                <Typography variant="body1" mb={1}>
                    <strong>Mô tả:</strong> {house.decription}
                </Typography>
                <Typography variant="body1" mb={1}>
                    <strong>Giá:</strong> {house.rentingprice} vnd/ngày
                </Typography>
                <Typography variant="body1" mb={1}>
                    <strong>Loại nhà:</strong> {house.type == 1 ? "villa" : "homestay"}
                </Typography>
                {/* House Images */}
                <Box mt={2}>
                    <Typography variant="body1" mb={1}>
                        <strong>Ảnh nhà:</strong>
                    </Typography>
                    {house.imgDTOs && house.imgDTOs.length > 0 ? (
                        house.imgDTOs.map((img, index) => (
                            <Box key={index} mb={2}>
                                <img src={img.img} alt={`House image ${index + 1}`} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body2">Không có ảnh để hiển thị</Typography>
                    )}
                </Box>
                {/* Divider */}
                <Divider sx={{ my: 2 }} />
                {/* Comment Section */}
                <Typography variant="h5" component="h3" mb={2}>
                    Bình luận
                </Typography>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <Box key={index} mb={2}>
                            <Typography variant="body1" mb={1}><strong>{comment.users.name}:</strong> {comment.content}</Typography>
                            {/* <Typography variant="caption" color="text.secondary">{new Date(comment.createdAt).toLocaleString()}</Typography> */}
                        </Box>
                    ))
                ) : (
                    <Typography variant="body2">Chưa có bình luận nào.</Typography>
                )}
                {/* Comment Form */}
                <Box mt={2}>
                    <Typography variant="h6" mb={1}>
                        Thêm bình luận mới
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleCommentSubmit} sx={{ mt: 2 }}>
                        Gửi bình luận
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}
