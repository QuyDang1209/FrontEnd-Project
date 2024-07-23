import React, { useState, useEffect } from 'react';
import {
    Typography,
    Card,
    CardContent,
    Box,
    Divider,
    TextField,
    Button,
    Select,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import axios from 'axios';
import ReviewSection from '../review/ReviewSection';


export default function ForrentHouseDetail({ house, onClose, forrentId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [status, setStatus] = useState(house ? house.status : '');
    const [openStatusDialog, setOpenStatusDialog] = useState(false);
    const [openReviewsDialog, setOpenReviewsDialog] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (forrentId) {
            axios.get(`/api/reviews/forrent/${forrentId}`)
                .then(response => {
                    setReviews(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the reviews!", error);
                });
        }
    }, [forrentId]);

    useEffect(() => {
        if (house) {
            const fetchComments = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/comment/forrent/${house.id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch comments');
                    }
                    const data = await response.json();
                    setComments(data);
                } catch (error) {
                    console.error('Error fetching comments:', error);
                }
            };
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
                    users: { id: user.id },
                    forrents: house.id
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

    const handleStatusChange = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/forrent-house/${house.id}/status?orderStatus=${status}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to update status');
        }
        const data = await response.json();
        setStatus(data.order_status);
        setOpenStatusDialog(false);
    } catch (error) {
        console.error('Error updating status:', error);
    }
    };


    if (!house) return null;

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <Card elevation={3} sx={{ p: 4, mt: 4 }}>
            <CardContent>
                {/* House Details */}
                <Typography variant="body1" mb={1}><strong>Tên nhà:</strong> {house.namehouse}</Typography>
                <Typography variant="body1" mb={1}><strong>Địa chỉ:</strong> {house.address}</Typography>
                <Typography variant="body1" mb={1}><strong>Số phòng ngủ:</strong> {house.bedroom}</Typography>
                <Typography variant="body1" mb={1}><strong>Số phòng tắm:</strong> {house.bathroom}</Typography>
                <Typography variant="body1" mb={1}><strong>Mô tả:</strong> {house.decription}</Typography>
                <Typography variant="body1" mb={1}><strong>Giá:</strong> {house.rentingprice}</Typography>
                <Typography variant="body1" mb={1}><strong>Loại nhà:</strong> {house.type === 1 ? "villa" : "homestay"}</Typography>
                <Typography variant="body1" mb={1}><strong>Trạng thái:</strong> {house.order_status}</Typography>

                {/* Status Update Button */}
                <Box mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={house.order_status === 'Rented'}
                        onClick={() => setOpenStatusDialog(true)}
                    >
                        Cập nhật trạng thái
                    </Button>
                </Box>

                {/* House Images */}
                <Box mt={2}>
                    <Typography variant="body1" mb={1}><strong>Ảnh nhà:</strong></Typography>
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
                <Typography variant="h5" component="h3" mb={2}>Bình luận</Typography>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <Box key={index} mb={2}>
                            <Typography variant="body1" mb={1}><strong>{comment.users.name}:</strong> {comment.content}</Typography>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body2">Chưa có bình luận nào.</Typography>
                )}

                {/* Comment Form */}
                <Box mt={2}>
                    <Typography variant="h6" mb={1}>Thêm bình luận mới</Typography>
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

            {/* Reviews Dialog */}
            <Dialog open={openReviewsDialog} onClose={() => setOpenReviewsDialog(false)}>
                <DialogTitle>Đánh giá</DialogTitle>
                <DialogContent>
                    <ul>
                        {reviews.map(review => (
                            <li key={review.id}>
                                <Typography variant="body1"><strong>User ID:</strong> {review.userId}</Typography>
                                <Typography variant="body1"><strong>Rating:</strong> {review.rating}</Typography>
                                <Typography variant="body1"><strong>Comment:</strong> {review.comment}</Typography>
                                <Typography variant="body1"><strong>Date:</strong> {review.reviewDate}</Typography>
                            </li>
                        ))}
                    </ul>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenReviewsDialog(false)} color="secondary">Đóng</Button>
                </DialogActions>
            </Dialog>

            {/* Status Update Dialog */}
            <Dialog open={openStatusDialog} onClose={() => setOpenStatusDialog(false)}>
                <DialogTitle>Xác nhận cập nhật trạng thái</DialogTitle>
                <DialogContent>
                    <DialogContentText>Bạn có chắc muốn cập nhật trạng thái cho nhà?</DialogContentText>
                    <Select
                        fullWidth
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        sx={{ mt: 2 }}
                    >
                        <MenuItem value="Available">Available</MenuItem>
                        <MenuItem value="Maintenance">Maintenance</MenuItem>
                        <MenuItem value="Rented">Rented</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenStatusDialog(false)} color="secondary">Hủy bỏ</Button>
                    <Button onClick={handleStatusChange} color="primary">Xác nhận</Button>
                </DialogActions>
            </Dialog>
            {/* Review Section */}
            {user && (
                <ReviewSection
                    forrentId={house.id}
                    userId={user.id}
                    userName={user.name}
                    userAvatar={user.avatar} // Assuming user has avatar
                    rentalStatus={house.status}
                />
            )}
        </Card>
    );
}
