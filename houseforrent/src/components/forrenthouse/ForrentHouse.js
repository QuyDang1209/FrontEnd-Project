import React, { useEffect, useState } from 'react';
import { imgUpload } from './ConfigImg';
import { toast } from 'react-toastify';
import { uploadBytes, ref, getDownloadURL, getStorage, deleteObject } from 'firebase/storage';
import { v4 } from 'uuid';
import { Avatar, Button, TextField, Grid, Box, Typography, Paper, Divider, Container, Select, MenuItem } from "@mui/material";
import HeaderMenu from '../HeaderMenu';
import Footer from '../Footer';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function ForrentHouse() {
    const [imgUrl, setImgUrl] = useState([]);

    const [progress, setProgress] = useState([]);
    const id = JSON.parse(localStorage.getItem('user')).id ;
    const [formForrent, setFormForrent] = useState({
        "address": "",
        "img": [],
        "decription": "",
        "rentingprice": "",
        "type": 1,
        "users": id,
        "namehouse":"",
        "bedroom":"",
        "bathroom":""
    });

    useEffect(() => {
        setProgress([...Array(imgUrl.length).fill(0)]);
    }, [imgUrl]);

    const handleChange = (e) => {
        setFormForrent({
            ...formForrent,
            [e.target.name]: e.target.value
        });
    }

    const handleChangeTypeHouse = (e) => {
        const value = e.target.value;
        setFormForrent({
            ...formForrent,
            type: value
        });
    }

    const handleDelete = (index) => {
        const storage = getStorage();
        const imageUrl = imgUrl[index];
        const imageRef = ref(storage, imageUrl);

        deleteObject(imageRef).then(() => {
            const newImgUrl = [...imgUrl];
            newImgUrl.splice(index, 1);
            setImgUrl(newImgUrl);
        }).catch((error) => {
            console.error('Error deleting image: ', error);
        });
    }


    const handleClick = (e) => {
        let arr = [...formForrent.img];
        for (let i = 0; i < e.target.files.length; i++) {
            const imgRef = ref(imgUpload, `file/${v4()}`)
            uploadBytes(imgRef, e.target.files[i]).then((value) => {
                getDownloadURL(value.ref).then(url => {
                    arr.push({ "img": url });
                    setImgUrl(data => [...data, url]);
                    setFormForrent({
                        ...formForrent,
                        [e.target.name]: arr
                    });
                })
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formForrent,"-------------------------------");
        // Basic validation example (you can customize this as per your requirements)
        if (!formForrent.address || !formForrent.decription || !formForrent.rentingprice) {
            toast.error('Please fill out all required fields.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/forrent-house', formForrent);
            if (response.data.status === 200) {
                toast.success('Đăng kí nhà của bạn thành công, chờ admin duyệt');
            }
        } catch (error) {
            console.error('Error submitting form: ', error);
            toast.error('Registration failed. Please try again.');
        }
    }

    useEffect(() => {
        const intervals = imgUrl.map((_, index) => {
            return setInterval(() => {
                setProgress((prevProgress) => {
                    const newProgress = [...prevProgress];
                    if (newProgress[index] < 100) {
                        newProgress[index] += 10; // Increase progress by 10%
                    } else {
                        clearInterval(intervals[index]);
                    }
                    return newProgress;
                });
            }, 500); // Update every 500ms
        });

        return () => intervals.forEach(clearInterval); // Xóa interval khi unmount
    }, [imgUrl]);
    const calculateGridHeight = () => {
        const rows = Math.ceil(imgUrl.length / 3);
        return rows * 200; // Adjust 200 based on your desired row height
    }
    return (
        <>
            <HeaderMenu />
            <Container
                sx={{
                    "@media (min-width: 1536px)": {
                        maxWidth: "1400px",
                        width: "2400px",
                    },
                }}
                style={{ paddingLeft: 0, paddingRight: 0, marginTop: "20px" }}
            >
                <Box>
                    <Grid container justifyContent="center">
                        <Grid item xs={8}>
                            <Box sx={{ width: "75%" }}>
                                <Paper elevation={3} sx={{ p: 4 }}>
                                    <Typography variant="h4" component="h2" gutterBottom>
                                        Chia sẻ thông tin về nhà của bạn
                                    </Typography>
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={12}>
                                                <TextField
                                                    sx={{ mt: 2 }}
                                                    label="Tên nhà"
                                                    variant="outlined"
                                                    id="outlined-size-small"
                                                    name="namehouse"
                                                    value={formForrent.namehouse}
                                                    onChange={handleChange}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    sx={{ mt: 2 }}
                                                    label="Địa chỉ nhà"
                                                    variant="outlined"
                                                    id="outlined-size-small"
                                                    name="address"
                                                    value={formForrent.address}
                                                    onChange={handleChange}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    sx={{ mt: 2 }}
                                                    label="Mô tả nhà"
                                                    variant="outlined"
                                                    id="outlined-size-small"
                                                    name="decription"
                                                    value={formForrent.decription}
                                                    onChange={handleChange}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    sx={{ mt: 2 }}
                                                    label="Giá thuê nhà (VND/ngày)"
                                                    variant="outlined"
                                                    id="outlined-size-small"
                                                    name="rentingprice"
                                                    value={formForrent.rentingprice}
                                                    onChange={handleChange}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    sx={{ mt: 2 }}
                                                    label="Số phòng ngủ"
                                                    variant="outlined"
                                                    id="outlined-size-small"
                                                    name="bedroom"
                                                    type="number"
                                                    value={formForrent.bedroom}
                                                    onChange={handleChange}
                                                    fullWidth
                                            />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    sx={{ mt: 2 }}
                                                    label="Số phòng tắm"
                                                    variant="outlined"
                                                    id="outlined-size-small"
                                                    name="bathroom"
                                                    type="number"
                                                    value={formForrent.bathroom}
                                                    onChange={handleChange}
                                                    fullWidth
                                            />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <InputLabel id="house">Loại nhà của bạn</InputLabel>
                                                <Select
                                                    labelId="house"
                                                    label="Loại nhà của bạn"
                                                    id="select"
                                                    value={formForrent.type}
                                                    onChange={handleChangeTypeHouse}
                                                >
                                                    <MenuItem value={1}>Villa</MenuItem>
                                                    <MenuItem value={2}>HomeStay</MenuItem>
                                                </Select>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button
                                                    component="label"
                                                    role={undefined}
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Thêm ảnh của bạn
                                                    <VisuallyHiddenInput name='img' multiple="multiple" onChange={handleClick} type="file" />
                                                </Button>
                                                <ImageList sx={{ width: 500, height: calculateGridHeight() }} spacing={2} cols={3} rowHeight={2}>
                                                    {imgUrl.map((item, index) => (
                                                        <ImageListItem key={index}>
                                                            <img
                                                                srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                                src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                                                alt=""
                                                                loading="lazy"
                                                            />
                                                            <ImageListItemBar
                                                                sx={{
                                                                    background:
                                                                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                                                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                                                }}
                                                                title=""
                                                                position="top"
                                                                actionIcon={
                                                                    <IconButton
                                                                        sx={{ color: 'white' }}
                                                                        aria-label={`star ${item.title}`}
                                                                        onClick={() => handleDelete(index)}
                                                                    >
                                                                        <DeleteForeverSharpIcon />
                                                                    </IconButton>
                                                                }
                                                                actionPosition="left"
                                                            />
                                                            <LinearProgress variant="determinate" value={progress[index]} sx={{ position: 'absolute', bottom: 0, width: '100%' }} />
                                                        </ImageListItem>
                                                    ))}
                                                </ImageList>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Button variant="contained" color="success" type="submit" fullWidth>
                                                    Lưu
                                                </Button>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Button variant="contained" color="primary" to="/house" fullWidth
                                                    onClick={() => window.history.back()}>
                                                    Back
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </>
    );
}