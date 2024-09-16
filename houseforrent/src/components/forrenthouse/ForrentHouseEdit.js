import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { uploadBytes, ref, getDownloadURL, getStorage, deleteObject } from 'firebase/storage';
import { v4 } from 'uuid';
import { Link, useParams,useNavigate } from 'react-router-dom';
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
import {numberInputClasses, Unstable_NumberInput as BaseNumberInput} from "@mui/base/Unstable_NumberInput";

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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchForRentHouse = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/forrent-house/detail/${id}`, {
                    headers: {
                        'Authorization':'Bearer <your_access_token>'
                    }
                });
                console.log(response.data,"aaaaaaaa");
                const data = response.data;
                setAddress(data.address);
                setDecription(data.description);
                setRentingprice(data.rentingprice);
                setType(data.type);
                setNamehouse(data.namehouse);
                setBedroom(data.bedroom);
                setBathroom(data.bathroom);
                setImgUrl(data.imgDTOs); // Assuming data.img is an array of images
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
            
        };
        fetchForRentHouse();
    }, [id]);
    const handleChangeBedRoom = (e, newValue)=>{

        setBedroom(
             parseInt(newValue, 10)
        );
    }
    const handleChangeBathRoom = (e, newValue)=>{
        setBathroom(
             parseInt(newValue, 10)
        );
    }

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
        navigate('/house');
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
                                                <CustomNumberInput   aria-label="Compact number input" name="bedroom" value={bedroom} onChange={handleChangeBedRoom} aria-label="Demo number input" placeholder="Số lượng phòng ngủ" />

                                                {/*<TextField*/}
                                                {/*    sx={{ mt: 2 }}*/}
                                                {/*    label="Số phòng ngủ"*/}
                                                {/*    variant="outlined"*/}
                                                {/*    id="outlined-size-small"*/}
                                                {/*    name="bedroom"*/}
                                                {/*    type="number"*/}
                                                {/*    value={bedroom}*/}
                                                {/*    onChange={(e) => setBedroom(e.target.value)}*/}
                                                {/*    fullWidth*/}
                                                {/*/>*/}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <CustomNumberInput   aria-label="Compact number input" name="bathroom" value={bathroom} onChange={handleChangeBathRoom} aria-label="Demo number input" placeholder="Số lượng phòng tắm" />

                                                {/*<TextField*/}
                                                {/*    sx={{ mt: 2 }}*/}
                                                {/*    label="Số phòng tắm"*/}
                                                {/*    variant="outlined"*/}
                                                {/*    id="outlined-size-small"*/}
                                                {/*    name="bathroom"*/}
                                                {/*    type="number"*/}
                                                {/*    value={bathroom}*/}
                                                {/*    onChange={(e) => setBathroom(e.target.value)}*/}
                                                {/*    fullWidth*/}
                                                {/*/>*/}
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
