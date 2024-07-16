import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { uploadBytes, ref, getDownloadURL, getStorage, deleteObject } from 'firebase/storage';
import { v4 } from 'uuid';
import { Link, useParams } from 'react-router-dom';
import { Avatar, Button, TextField, Grid, Box, Typography, Paper, Container, Select, MenuItem } from "@mui/material";
import HeaderMenu0 from '../HeaderMenu0';
import Footer from '../Footer';
import { imgUpload } from './ConfigImg';
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

const ForrentHouseEdit = () => {
    const { id } = useParams(); // Get the id parameter from the URL
    const [imgUrl, setImgUrl] = useState([]);
    const [progress, setProgress] = useState([]);
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const [address,setAddress] = useState('');
    const [img,setImg] = useState('');
    const [decription, setDecription] = useState('');
    const [rentingprice,setRentingprice] = useState('');
    const [type, setType] = useState(1);
    const [namehouse, setNamehouse] = useState('');
    const [bedroom, setBedroom] = useState('');
    const [bathroom, setBathroom] = useState('');

    useEffect(() => {
        const fetchForRentHouse = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/forrent-house/${id}`, {
                    headers: {
                        'Authorization':'Bearer <your_access_token>'
                    }
                });
                const data = response.data;
                setAddress(data.address);
                setDecription(data.decription);
                setRentingprice(data.rentingprice);
                setType(data.type.id);
                setNamehouse(data.namehouse);
                setBedroom(data.bedroom);
                setBathroom(data.bathroom);
                setImgUrl(data.img); // Assuming data.img is an array of images
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
            
        };
        fetchForRentHouse();
    }, [id]);

    const calculateGridHeight = () => {
        const rows = Math.ceil(imgUrl.length / 3);
        return rows * 200;
    }

    const handleDelete = (index,id) => {
        const storage = getStorage();
        const imageUrl = imgUrl[index].img;
        const imageRef = ref(storage, imageUrl);

        deleteObject(imageRef).then(() => {
            const newImgUrl = [...imgUrl];
            newImgUrl.splice(index, 1);
            axios.delete(`http://localhost:8080/api/img/delete/${id}`)
                .then(console.log("okkkkkkk"))
            setImgUrl(newImgUrl);
        }).catch((error) => {
            console.error('Error deleting image: ', error);
        });
    };

    const handleClick = (e) => {
        let arr = [];
        for (let i = 0; i < e.target.files.length; i++) {
            const imgRef = ref(imgUpload, `file/${v4()}`);
            uploadBytes(imgRef, e.target.files[i]).then((value) => {
                getDownloadURL(value.ref).then(url => {
                    arr.push({ "img":url });
                    setImgUrl(data => [...data, {"id":"","img":url} ]);
                    setImg(imgUrl);
                });
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formForrent = {
            address,
            img:imgUrl,
            decription,
            rentingprice,
            type,
            users: userId,
            namehouse,
            bedroom,
            bathroom
        };

        if (!address || !decription || !rentingprice || !namehouse || !bedroom || !bathroom) {
            toast.error('Please fill out all required fields.');
            return;
        }

        try {
            console.log("formForrent", formForrent);
            const response = await axios.patch(`http://localhost:8080/api/forrent-house/edit/${id}`, formForrent, {
                headers: {
                    'Authorization':'Bearer <your_access_token>'
                }
            });
            if (response.data.status === 200) {
                toast.success('Cập nhật thông tin nhà thành công');
            }
        } catch (error) {
            console.error('Error submitting form: ', error);
            toast.error('Cập nhật thông tin nhà thất bại. Vui lòng thử lại.');
        }
    }

    return (
        <>
            <HeaderMenu0 />
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
                                        Chỉnh sửa thông tin nhà cho thuê
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
                                                    value={namehouse}
                                                    onChange={(e) => setNamehouse(e.target.value)}
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
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
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
                                                    value={decription}
                                                    onChange={(e) => setDecription(e.target.value)}
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
                                                    value={rentingprice}
                                                    onChange={(e) => setRentingprice(e.target.value)}
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
                                                    value={bedroom}
                                                    onChange={(e) => setBedroom(e.target.value)}
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
                                                    value={bathroom}
                                                    onChange={(e) => setBathroom(e.target.value)}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <InputLabel id="house">Loại nhà của bạn</InputLabel>
                                                <Select
                                                    labelId="house"
                                                    label="Loại nhà của bạn"
                                                    id="select"
                                                    value={type}
                                                    onChange={(e) => setType(e.target.value)}
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
                                                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
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
                                                                        onClick={() => handleDelete(index,item.id)}
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
                                            <Grid item xs={12} mt={2}>
                                                <Button variant="contained" color="primary" type="submit" sx={{mt:2}}>
                                                    Lưu thay đổi
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12} mt={2}>
                                                <Button
                                                    component={Link}
                                                    to="/house"
                                                    variant="contained"
                                                    sx={{ mt: 2, backgroundColor: 'red', color: 'white' }}
                                                >
                                                    Quay lại
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
};

export default ForrentHouseEdit;
