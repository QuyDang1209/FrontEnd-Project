import React, { useEffect, useState } from 'react'
import { imgUpload } from './ConfigImg'
import { toast } from 'react-toastify';
import { uploadBytes, ref, listAll, getDownloadURL,getStorage, deleteObject } from 'firebase/storage';
import { v4 } from 'uuid';
import { Avatar, Button, TextField, Grid, Box, Typography, Paper, Divider, Container, Select, MenuItem} from "@mui/material";
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
    const [img, setImg] = useState([])
    const [imgUrl, setImgUrl] = useState([])
    const [height, setHeight] = useState(0);

  useEffect(() => {
    const rows = Math.ceil(imgUrl.length / 3);
    setHeight(rows * 200); // Adjust 200 based on your desired row height
  }, [imgUrl]);
    const handleClick = (e) => {
        // setImg(e.target.files)
        let arr = [...formForrent.img];
        for(let i = 0; i < e.target.files.length; i++) {
            const imgRef = ref(imgUpload, `file/${v4()}`)
            uploadBytes(imgRef,e.target.files[i]).then((value)=>{
                console.log(value,"kiểm tra giá trị value sau khi úp ảnh");
                getDownloadURL(value.ref).then(url => {
                                arr.push({"img": url});
                                setImgUrl(data => [...data, url])
                                setFormForrent({
                                    ...formForrent,
                                    [e.target.name]: arr
                                })
                            })
            });
        }
    }
    // console.log(imgUrl);
    const id = JSON.parse(localStorage.getItem('user')).id ;
    const [error, setError] = useState(null);
    const [value, setValue] = useState(1);
    const [formForrent, setFormForrent] = useState({
        "address":"",
        "img":[],
        "decription": "",
        "rentingprice":"",
        "type":1,
        "users": id,
        "namehouse":"",
        "bedroom":"",
        "bathroom":""
    })
    const storage = getStorage();
    const handleDelete = (index) => {
        // for(let i = 0; i < imgUrl.length; i++) {
        //     if(index === (i)) {
        //         imgUrl.splice(i, 1);
        //         setImgUrl([...imgUrl]);
        //     }
        // }
        const imageUrl = imgUrl[index];
        const imageRef = ref(storage, imageUrl);

        deleteObject(imageRef).then(() => {
            console.log(`Deleted image at index: ${index}`);
            const newImgUrl = [...imgUrl];
            newImgUrl.splice(index, 1);
            setImgUrl(newImgUrl);
        }).catch((error) => {
            console.error('Error deleting image: ', error);
        });
    }
    const handleChange = (e) => {
        // console.log(e.target.value);
        setFormForrent({
            ...formForrent,
            [e.target.name]: e.target.value

        })
    }
    const handleChangeTypeHouse = (e) => {
        console.log("value select", e);
        setValue(e)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("value", formForrent);
        try{
            const response = axios.post('http://localhost:8080/api/forrent-house', formForrent)
            if(response.data.status === 200) {
                toast.success('Đăng kí nhà của bạn thành công, chờ admin duyệt');
            }
        }
        catch(error){
            console.log(error);
            // if (error.response && error.response.status === 409) {
            //     toast.error('Email này đã tồn tại, vui lòng đăng kí email khác');
            //   } else {
            //     toast.error('Registration failed. Please try again.');
            //   }
        }
        
       
    }
    const [progress, setProgress] = useState([
        ...Array(imgUrl.length).fill(0)]);

    useEffect(() => {
        const intervals = imgUrl.map((_, index) => {
            return setInterval(() => {
                setProgress((prevProgress) => {
                    const newProgress = [...prevProgress];
                    if (newProgress[index] < 100) {
                        newProgress[index] += 10; // Tăng tiến trình lên 10%
                    } else {
                        clearInterval(intervals[index]);
                    }
                    return newProgress;
                });
            }, 500); // Cập nhật mỗi 500ms
        });

        return () => intervals.forEach(clearInterval); // Clear intervals on unmount
    }, [imgUrl]);
    
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
                <Box sx={{ width: "75%"}}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Chia sẻ thông tin về nhà của bạn
                </Typography>
                {error && (
                    <Typography variant="body2" color="error" gutterBottom>
                        {error}
                    </Typography>
                )}
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
                                label="Số phòng ngủ"
                                variant="outlined"
                                id="outlined-size-small"
                                name="bedroom"
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
                                value={formForrent.bathroom}
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
                        <InputLabel id="house">Loại nhà của bạn</InputLabel>
                        <Select
                            labelId="house"
                            label="Loại nhà của bạn"
                            id="select"
                            value={formForrent.type}
                            onChange={handleChange }
                        >
                            <MenuItem value={1} > Villa </MenuItem>
                            <MenuItem value={2} > HomeStay</MenuItem>
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
                        {/* <input type="file" multiple="multiple" id="imgUpload" onChange={e => setImg(e.target.files)} />
                        <button onClick={handleClick}>Upload</button> */}
                        {/* <LinearProgress variant="determinate" value={progress} /> */}
                        <ImageList sx={{ width: 500, height: height }} spacing={2} cols={3} rowHeight={2}>
                            
                            {imgUrl.map((item, index) => (
                                
                                <ImageListItem key={index}>
                                <img
                                    srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                    alt={""}
                                    loading="lazy"
                                />
                                
                                <ImageListItemBar
                                    sx={{
                                        background:
                                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                    }}
                                    title={""}
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
                        
                        {/* <Box display={"flex"} sx={{ mt: 2 }}> */}
                            <Grid item xs={2}>
                            <Button variant="contained" color="success" type="submit" fullWidth>
                                Lưu
                            </Button>
                        </Grid>
                        {/* </Box> */}
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
  )
}
