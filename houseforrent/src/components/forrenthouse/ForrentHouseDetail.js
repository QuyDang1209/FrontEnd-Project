import React , {useState} from 'react';
import {
    Typography,
    Card,
    CardContent,
    Box
} from '@mui/material';

export default function ForrentHouseDetail({ house , onClose }){
    if (!house) return null;
    console.log("House data:", house);
    console.log("Image data:", house.imgDTOs);
    return (
        <Card elevation={3} sx={{ p: 4, mt: 4 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="h5" component="h3" gutterBottom>
                    </Typography>
                </Box>
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
                    <strong>Giá:</strong> {house.rentingprice}
                </Typography>
                <Typography variant="body1" mb={1}>
                    <strong>Loại nhà:</strong> {house.type}
                </Typography>
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
            </CardContent>
        </Card>
    )
}