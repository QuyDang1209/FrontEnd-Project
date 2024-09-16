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
// import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
    Unstable_NumberInput as BaseNumberInput,
    numberInputClasses,
} from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';

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
    const navigate = useNavigate();

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
        "bedroom": "",
        "bathroom": ""
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
    const handleChangeBedRoom = (e, newValue)=>{

        setFormForrent({
            ...formForrent,
            'bedroom': parseInt(newValue, 10)
        });
    }
    const handleChangeBathRoom = (e, newValue)=>{
        setFormForrent({
            ...formForrent,
           "bathroom": parseInt(newValue, 10)
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
            console.log(response,"response");
            if (response.status == 201) {
                toast.success('Đăng kí nhà của bạn thành công, chờ admin duyệt');
                navigate('/house');
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
                                                <CustomNumberInput    name="bedroom" value={formForrent.bedroom} onChange={handleChangeBedRoom} aria-label="Demo number input" placeholder="Số lượng phòng ngủ" />
                                                {/*<TextField*/}
                                                {/*    sx={{ mt: 2 }}*/}
                                                {/*    label="Số phòng ngủ"*/}
                                                {/*    variant="outlined"*/}
                                                {/*    id="outlined-size-small"*/}
                                                {/*    name="bedroom"*/}
                                                {/*    type="number"*/}
                                                {/*    value={formForrent.bedroom}*/}
                                                {/*    onChange={handleChange}*/}
                                                {/*    fullWidth*/}
                                                {/*/>*/}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <CustomNumberInput   name="bathroom" value={formForrent.bathroom} onChange={handleChangeBathRoom} aria-label="Demo number input" placeholder="Số lượng phòng tắm" />
                                                {/*<TextField*/}
                                                {/*    sx={{ mt: 2 }}*/}
                                                {/*    label="Số phòng tắm"*/}
                                                {/*    variant="outlined"*/}
                                                {/*    id="outlined-size-small"*/}
                                                {/*    name="bathroom"*/}
                                                {/*    type="number"*/}
                                                {/*    value={formForrent.bathroom}*/}
                                                {/*    onChange={handleChange}*/}
                                                {/*    fullWidth*/}
                                                {/*/>*/}
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


const CustomNumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
    return (
        <BaseNumberInput
            slots={{
                root: StyledInputRoot,
                input: StyledInputElement,
                incrementButton: StyledButton,
                decrementButton: StyledButton,
            }}
            slotProps={{
                incrementButton: {
                    children: '▴',
                    type: 'button'
                },
                decrementButton: {
                    children: '▾',
                    type: 'button'
                },
            }}
            {...props}
            ref={ref}
        />
    );
});

const blue = {
    100: '#DAECFF',
    200: '#80BFFF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const StyledInputRoot = styled('div')(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
        theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
    };
  display: grid;
  grid-template-columns: 1fr 19px;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  column-gap: 8px;
  padding: 4px;

  &.${numberInputClasses.focused} {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
  }

  &:hover {
    border-color: ${blue[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledInputElement = styled('input')(
    ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  grid-column: 1/2;
  grid-row: 1/3;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
`,
);

const StyledButton = styled('button')(
    ({ theme }) => `
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  appearance: none;
  padding: 0;
  width: 19px;
  height: 19px;
  font-family: system-ui, sans-serif;
  font-size: 0.875rem;
  line-height: 1;
  box-sizing: border-box;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 0;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    cursor: pointer;
  }

  &.${numberInputClasses.incrementButton} {
    grid-column: 2/3;
    grid-row: 1/2;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border: 1px solid;
    border-bottom: 0;
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};

    &:hover {
      cursor: pointer;
      color: #FFF;
      background: ${theme.palette.mode === 'dark' ? blue[600] : blue[500]};
      border-color: ${theme.palette.mode === 'dark' ? blue[400] : blue[600]};
    }
  }

  &.${numberInputClasses.decrementButton} {
    grid-column: 2/3;
    grid-row: 2/3;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px solid;
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  }

  &:hover {
    cursor: pointer;
    color: #FFF;
    background: ${theme.palette.mode === 'dark' ? blue[600] : blue[500]};
    border-color: ${theme.palette.mode === 'dark' ? blue[400] : blue[600]};
  }

  & .arrow {
    transform: translateY(-1px);
  }

  & .arrow {
    transform: translateY(-1px);
  }
`,
);