import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Box, Button, Container, Divider, Grid, ImageList, ImageListItem, TextField, Typography } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { House } from "@mui/icons-material";
import {useParams, useNavigate} from "react-router-dom";
import HeaderMenu0 from "../HeaderMenu0";
import Footer from "../Footer";
import axios from "axios";
import Paper from '@mui/material/Paper';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import dayjs from 'dayjs';
import { format, parseISO,getTime } from 'date-fns';
import "./booking.css";
import { CustomButton } from '../../custom-component/CustomButton';
import { toast } from 'react-toastify';
import Comments from "../Comments/Comments";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
};

function Booking1({house}) {
    const {id} = useParams();
    const navigate = useNavigate();
    const [img, setImg] = useState([]);
    const [forrentDetail, setForrentDetail] = useState("");
    const [host, setHost] = useState("");
    const [user, setUser] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const userID = JSON.parse(localStorage.getItem('user')).id
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/user/${userID}`);
                setUser(res.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUser();
    }, [userID]);
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

    const [formState, setFormState] = useState({
        orderday: null,
        payday: null,
        deposite:"",
        forrent: id,
        users: userID,
        payment:1,
        status:1
    });
    useEffect(() => {
        axios.get(`http://localhost:8080/api/forrent-house/detail/${id}`)
            .then(res => {
                console.log(res.data,"aaaaaaaaaaaaaaaa");

                setForrentDetail(res.data)
                setHost(res.data.user)
                setImg(res.data.imgDTOs)
                })
    },[])

    const handleChangeDatePicker = (newValue) => {
        setFormState({
            ...formState,
            orderday: newValue[0],
            payday: newValue[1],
        });
    };
    const handleInputChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }
    const handleBooking = async() => {
        let sendObject = {
            ...formState,
            orderday: format(formState.orderday.toDate() , 'yyyy-MM-dd'),
payday: format(formState.payday.toDate(), 'yyyy-MM-dd'),
        }
        console.log(sendObject);
        try{
            let res = await axios.post("http://localhost:8080/api/booking", sendObject);
            console.log(res);
            if (res.status == 201) {
                toast.success("Đặt thuê thành công, vui lòng kiểm tra email");
                axios.post("http://localhost:8080/api/send-email/to-customer", {
                    recipient: user.email , //thay địa chỉ email bằng forrentDetail.users
                    subject: "Thông báo xác nhận thuê nhà",
                    user: host,
                    forrent: forrentDetail,
                    booking: sendObject
                });
                window.location.assign('/main');
            }
        }
        catch(error){
            console.log("error", error);
            toast.error("Đặt thuê thất bại, xem lại ngày đặt thuê của bạn");
            return;
        }

    }
    const handleCommentSubmit = async () => {
        try {
            let user = JSON.parse(localStorage.getItem("user"));
            const response = await fetch(`http://localhost:8080/api/comment/forrent/${house.id}`, {
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


    return (
        <>
            <HeaderMenu0 />
            <Divider />
            <Container
                sx={{
                    "@media (min-width: 1536px)": {
                        maxWidth: "1300px",
                    },
                }}
                style={{ paddingLeft: 0, paddingRight: 0, marginTop: "20px" }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box  >
                            <Box  >
                                <Slider {...settings}>
                                    {img.map((item) => (
                                        <Box key={item.img}>
                                            <img src={item.img} alt={item.title} style={{ width: '100%', height: '450px' }} loading="lazy" />
                                        </Box>
                                    ))}
                                </Slider>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                '& > :not(style)': {
                                    m: 1,
                                    width: "568px",
                                    height: '450px',
                                    margin: "0px"
                                },
                            }}
                        >
                            <Paper elevation={10}>
                                <Container>
                                    <Grid item xs={12} sx={{ fontSize: "15px"}}>
                                        <strong>{forrentDetail.namehouse}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px"}}>
<strong>Địa chỉ: {forrentDetail.address}</strong>
                                    </Grid>
                                    <Grid item xs={12}sx={{ fontSize: "15px"}}>
                                        <strong>Số phòng ngủ:{forrentDetail.bedroom}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px"}}>
                                        <strong>Số phòng tắm: {forrentDetail.bathroom}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px"}}>
                                        <strong>Giá thuê: {forrentDetail.rentingprice} VND/ ngày</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px"}}>
                                        <strong>Mô tả chung: {forrentDetail.decription}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{marginTop: "10px",marginBottom: "10px"}}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <DemoContainer components={['DateRangePicker']} >
                                                <DateRangePicker
                                                    localeText={{ start: 'Check-in', end: 'Check-out' }} className="demoxxx"
                                                    value={[dayjs(formState.orderday), dayjs(formState.payday)]}
                                                    onChange={handleChangeDatePicker}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Số tiền đặt cọc"
                                            variant="outlined"
                                            id="outlined-size-small"
                                            name="deposite"
                                            value={formState.deposite}
                                            onChange={handleInputChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{marginTop: "10px",marginBottom: "10px", fontSize: "15px"}}>
                                        <strong>Số tiền còn lại phải thanh toán: </strong>  { (formState.payday != null && formState.orderday != null) ? (forrentDetail.rentingprice * (formState.payday.diff(formState.orderday,'days') ) -  formState.deposite).toLocaleString('de-DE') : 0} VND
</Grid>
                                    <Grid item xs={12}>
                                        <Button onClick={handleBooking} variant="contained" color="primary" type="submit" sx={{marginTop: "10px", marginBottom: "10px", display: "block", width: "100%"}}>
                                            Đặt ngay
                                        </Button>
                                    </Grid>
                                </Container>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
                 <Comments houseId={id} />
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
            </Container>
            <Divider />
            <Footer sx={{marginTop: "80px !important"}}/>
        </>
    );
}

function Booking0({ house }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [img, setImg] = useState([]);
    const [forrentDetail, setForrentDetail] = useState("");
    const [host, setHost] = useState("");
    const [user, setUser] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const userID = JSON.parse(localStorage.getItem('user')).id;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/user/${userID}`);
                setUser(res.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUser();
    }, [userID]);

    useEffect(() => {
        const fetchForrentDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/forrent-house/detail/${id}`);
                setForrentDetail(res.data);
                setHost(res.data.user);
                setImg(res.data.imgDTOs);
            } catch (error) {
                console.error("Error fetching forrent details:", error);
            }
        };
        fetchForrentDetail();
    }, [id]);

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

    const [formState, setFormState] = useState({
        orderday: null,
        payday: null,
        deposite: "",
        forrent: id,
        users: userID,
        payment: 1,
        status: 1
    });

    const handleChangeDatePicker = (newValue) => {
        setFormState({
            ...formState,
            orderday: newValue[0],
            payday: newValue[1],
        });
    };

    const handleInputChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleBooking = async () => {
        const sendObject = {
            ...formState,
            orderday: format(formState.orderday.toDate(), 'yyyy-MM-dd'),
            payday: format(formState.payday.toDate(), 'yyyy-MM-dd'),
        };
        try {
            const res = await axios.post("http://localhost:8080/api/booking", sendObject);
            if (res.status === 201) {
                toast.success("Đặt thuê thành công, vui lòng kiểm tra email");
                await axios.post("http://localhost:8080/api/send-email/to-customer", {
                    recipient: user.email,
                    subject: "Thông báo xác nhận thuê nhà",
                    user: host,
                    forrent: forrentDetail,
                    booking: sendObject
                });
                navigate('/main');
            }
        } catch (error) {
            console.log("error", error);
            toast.error("Đặt thuê thất bại, xem lại ngày đặt thuê của bạn");
        }
    };

    const handleCommentSubmit = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
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

    return (
        <>
            <HeaderMenu0 />
            <Divider />
            <Container
                sx={{
                    "@media (min-width: 1536px)": {
                        maxWidth: "1300px",
                    },
                }}
                style={{ paddingLeft: 0, paddingRight: 0, marginTop: "20px" }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box>
                            <Slider {...settings}>
                                {img.map((item) => (
                                    <Box key={item.img}>
                                        <img src={item.img} alt={item.title} style={{ width: '100%', height: '450px' }} loading="lazy" />
                                    </Box>
                                ))}
                            </Slider>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                '& > :not(style)': {
                                    m: 1,
                                    width: "568px",
                                    height: '450px',
                                    margin: "0px"
                                },
                            }}
                        >
                            <Paper elevation={10}>
                                <Container>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>{forrentDetail.namehouse}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>Địa chỉ: {forrentDetail.address}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>Số phòng ngủ: {forrentDetail.bedroom}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>Số phòng tắm: {forrentDetail.bathroom}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>Giá thuê: {forrentDetail.rentingprice} VND/ ngày</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>Mô tả chung: {forrentDetail.decription}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ marginTop: "10px", marginBottom: "10px" }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DateRangePicker']}>
                                                <DateRangePicker
                                                    localeText={{ start: 'Check-in', end: 'Check-out' }} className="demoxxx"
                                                    value={[dayjs(formState.orderday), dayjs(formState.payday)]}
                                                    onChange={handleChangeDatePicker}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Số tiền đặt cọc"
                                            variant="outlined"
                                            id="outlined-size-small"
                                            name="deposite"
                                            value={formState.deposite}
                                            onChange={handleInputChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ marginTop: "10px", marginBottom: "10px", fontSize: "15px" }}>
                                        <strong>Số tiền còn lại: {formState.deposite !== "" ? forrentDetail.rentingprice - formState.deposite : forrentDetail.rentingprice}</strong>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            style={{
                                                marginBottom: "10px",
                                                height: "45px",
                                                width: "150px",
                                                float: "right",
                                            }}
                                            variant="contained"
                                            color="success"
                                            onClick={handleBooking}
                                        >
                                            Đặt thuê ngay
                                        </Button>
                                    </Grid>
                                </Container>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper elevation={10} sx={{ padding: "20px", marginBottom: "20px" }}>
                            <Typography variant="h6">Reviews</Typography>
                            {comments.map((comment) => (
                                <Paper key={comment.id} sx={{ padding: "10px", marginBottom: "10px" }}>
                                    <Typography variant="subtitle1"><strong>{comment.user.username}</strong></Typography>
                                    <Typography variant="body1">{comment.content}</Typography>
                                </Paper>
                            ))}
                            <Box>
                                <TextField
                                    label="Add a comment"
                                    variant="outlined"
                                    fullWidth
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    sx={{ marginBottom: "10px" }}
                                />
                                <Button variant="contained" onClick={handleCommentSubmit}>Submit</Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

function Booking2({ house = {} }) {  // Default value set to an empty object
    const { id } = useParams();
    const navigate = useNavigate();
    const [img, setImg] = useState([]);
    const [forrentDetail, setForrentDetail] = useState("");
    const [host, setHost] = useState("");
    const [user, setUser] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const userID = JSON.parse(localStorage.getItem('user')).id;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/user/${userID}`);
                setUser(res.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUser();
    }, [userID]);

    useEffect(() => {
        const fetchForrentDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/forrent-house/detail/${id}`);
                setForrentDetail(res.data);
                setHost(res.data.user);
                setImg(res.data.imgDTOs);
            } catch (error) {
                console.error("Error fetching forrent details:", error);
            }
        };
        fetchForrentDetail();
    }, [id]);

    useEffect(() => {
        if (house && house.id) {
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

    const [formState, setFormState] = useState({
        orderday: null,
        payday: null,
        deposite: "",
        forrent: id,
        users: userID,
        payment: 1,
        status: 1
    });

    const handleChangeDatePicker = (newValue) => {
        setFormState({
            ...formState,
            orderday: newValue[0],
            payday: newValue[1],
        });
    };

    const handleInputChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleBooking = async () => {
        const sendObject = {
            ...formState,
            orderday: format(formState.orderday.toDate(), 'yyyy-MM-dd'),
            payday: format(formState.payday.toDate(), 'yyyy-MM-dd'),
        };
        try {
            const res = await axios.post("http://localhost:8080/api/booking", sendObject);
            if (res.status === 201) {
                toast.success("Đặt thuê thành công, vui lòng kiểm tra email");
                await axios.post("http://localhost:8080/api/send-email/to-customer", {
                    recipient: user.email,
                    subject: "Thông báo xác nhận thuê nhà",
                    user: host,
                    forrent: forrentDetail,
                    booking: sendObject
                });
                navigate('/main');
            }
        } catch (error) {
            console.log("error", error);
            toast.error("Đặt thuê thất bại, xem lại ngày đặt thuê của bạn");
        }
    };

    const handleCommentSubmit = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const response = await fetch(`http://localhost:8080/api/comment/forrent/${house.id}`, {
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

    return (
        <>
            <HeaderMenu0 />
            <Divider />
            <Container
                sx={{
                    "@media (min-width: 1536px)": {
                        maxWidth: "1300px",
                    },
                }}
                style={{ paddingLeft: 0, paddingRight: 0, marginTop: "20px" }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box>
                            <Slider {...settings}>
                                {img.map((item) => (
                                    <Box key={item.img}>
                                        <img src={item.img} alt={item.title} style={{ width: '100%', height: '450px' }} loading="lazy" />
                                    </Box>
                                ))}
                            </Slider>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                '& > :not(style)': {
                                    m: 1,
                                    width: "568px",
                                    height: '450px',
                                    margin: "0px"
                                },
                            }}
                        >
                            <Paper elevation={10}>
                                <Container>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>{forrentDetail.namehouse}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>Địa chỉ: {forrentDetail.address}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>Số phòng ngủ: {forrentDetail.bedroom}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>Số phòng tắm: {forrentDetail.bathroom}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>Giá thuê: {forrentDetail.rentingprice} VND/ ngày</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>Mô tả chung: {forrentDetail.decription}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ marginTop: "10px", marginBottom: "10px" }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DateRangePicker']}>
                                                <DateRangePicker
                                                    localeText={{ start: 'Check-in', end: 'Check-out' }} className="demoxxx"
                                                    value={[dayjs(formState.orderday), dayjs(formState.payday)]}
                                                    onChange={handleChangeDatePicker}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Số tiền đặt cọc"
                                            variant="outlined"
                                            id="deposite"
                                            name="deposite"
                                            value={formState.deposite}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            sx={{ marginBottom: "10px" }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <strong style={{ float: "right" }}>Tổng số tiền cần thanh
                                            toán lại: {formState.deposite !== "" ? forrentDetail.rentingprice - formState.deposite : forrentDetail.rentingprice}</strong>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            style={{
                                                marginBottom: "10px",
                                                height: "45px",
                                                width: "150px",
                                                float: "right",
                                            }}
                                            variant="contained"
                                            color="success"
                                            onClick={handleBooking}
                                        >
                                            Đặt thuê ngay
                                        </Button>
                                    </Grid>
                                </Container>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper elevation={10} sx={{ padding: "20px", marginBottom: "20px" }}>
                            <Typography variant="h6">Reviews</Typography>
                            {comments.map((comment) => (
                                <Paper key={comment.id} sx={{ padding: "10px", marginBottom: "10px" }}>
                                    <Typography variant="subtitle1"><strong>{comment.user.username}</strong></Typography>
                                    <Typography variant="body1">{comment.content}</Typography>
                                </Paper>
                            ))}
                            <Box>
                                <TextField
                                    label="Add a comment"
                                    variant="outlined"
                                    fullWidth
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    sx={{ marginBottom: "10px" }}
                                />
                                <Button variant="contained" onClick={handleCommentSubmit}>Submit</Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

function Booking3({ house = {} }) {  // Default value set to an empty object
    const { id } = useParams();
    const navigate = useNavigate();
    const [img, setImg] = useState([]);
    const [forrentDetail, setForrentDetail] = useState("");
    const [host, setHost] = useState("");
    const [user, setUser] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const userID = JSON.parse(localStorage.getItem('user')).id;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/user/${userID}`);
                setUser(res.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUser();
    }, [userID]);

    useEffect(() => {
        const fetchForrentDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/forrent-house/detail/${id}`);
                setForrentDetail(res.data);
                setHost(res.data.user);
                setImg(res.data.imgDTOs);
            } catch (error) {
                console.error("Error fetching forrent details:", error);
            }
        };
        fetchForrentDetail();
    }, [id]);

    useEffect(() => {
        if (house && house.id) {
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

    const [formState, setFormState] = useState({
        orderday: null,
        payday: null,
        deposite: "",
        forrent: id,
        users: userID,
        payment: 1,
        status: 1
    });

    const handleChangeDatePicker = (newValue) => {
        setFormState({
            ...formState,
            orderday: newValue[0],
            payday: newValue[1],
        });
    };

    const handleInputChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleBooking = async () => {
        if (!formState.orderday || !formState.payday) {
            toast.error("Please select a valid date range");
            return;
        }
        const sendObject = {
            ...formState,
            orderday: formState.orderday.format('YYYY-MM-DD'),
            payday: formState.payday.format('YYYY-MM-DD'),
        };

        console.log("Booking data being sent:", sendObject);

        try {
            const res = await axios.post("http://localhost:8080/api/booking", sendObject);
            if (res.status === 201) {
                toast.success("Đặt thuê thành công, vui lòng kiểm tra email");
                await axios.post("http://localhost:8080/api/send-email/to-customer", {
                    recipient: user.email,
                    subject: "Thông báo xác nhận thuê nhà",
                    user: host,
                    forrent: forrentDetail,
                    booking: sendObject
                });
                navigate('/main');
            }
        } catch (error) {
            console.log("Booking error:", error.response);
            toast.error("Đặt thuê thất bại, xem lại ngày đặt thuê của bạn");
        }
    };

    const handleCommentSubmit = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const commentData = {
            content: newComment,
            users: { id: user.id },
            forrents: house.id
        };

        console.log("Comment data being sent:", commentData);

        try {
            const response = await fetch(`http://localhost:8080/api/comment/forrent/${house.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData),
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

    return (
        <>
            <HeaderMenu0 />
            <Divider />
            <Container
                sx={{
                    "@media (min-width: 1536px)": {
                        maxWidth: "1300px",
                    },
                }}
                style={{ paddingLeft: 0, paddingRight: 0, marginTop: "20px" }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box>
                            <Slider {...settings}>
                                {img.map((item) => (
                                    <Box key={item.img}>
                                        <img src={item.img} alt={item.title} style={{ width: '100%', height: '450px' }} loading="lazy" />
                                    </Box>
                                ))}
                            </Slider>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                '& > :not(style)': {
                                    m: 1,
                                    width: "568px",
                                    height: '450px',
                                    margin: "0px"
                                },
                            }}
                        >
                            <Paper elevation={10}>
                                <Container>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>{forrentDetail.namehouse}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>Địa chỉ: {forrentDetail.address}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>Số phòng ngủ: {forrentDetail.bedroom}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>Số phòng tắm: {forrentDetail.bathroom}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>Giá thuê: {forrentDetail.rentingprice} VND/ ngày</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>Mô tả chung: {forrentDetail.decription}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ marginTop: "10px", marginBottom: "10px" }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DateRangePicker']}>
                                                <DateRangePicker
                                                    localeText={{ start: 'Check-in', end: 'Check-out' }} className="demoxxx"
                                                    value={[dayjs(formState.orderday), dayjs(formState.payday)]}
                                                    onChange={handleChangeDatePicker}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Số tiền đặt cọc"
                                            variant="outlined"
                                            id="deposite"
                                            name="deposite"
                                            value={formState.deposite}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            sx={{ marginBottom: "10px" }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <strong style={{ float: "right" }}>Tổng số tiền cần thanh
                                            toán lại: {formState.deposite !== "" ? forrentDetail.rentingprice - formState.deposite : forrentDetail.rentingprice}</strong>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            style={{
                                                marginBottom: "10px",
                                                height: "45px",
                                                width: "150px",
                                                float: "right",
                                            }}
                                            variant="contained"
                                            color="success"
                                            onClick={handleBooking}
                                        >
                                            Đặt thuê ngay
                                        </Button>
                                    </Grid>
                                </Container>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper elevation={10} sx={{ padding: "20px", marginBottom: "20px" }}>
                            <Typography variant="h6">Reviews</Typography>
                            {comments.map((comment) => (
                                <Paper key={comment.id} sx={{ padding: "10px", marginBottom: "10px" }}>
                                    <Typography variant="subtitle1"><strong>{comment.user.username}</strong></Typography>
                                    <Typography variant="body1">{comment.content}</Typography>
                                </Paper>
                            ))}
                            <Box>
                                <TextField
                                    label="Add a comment"
                                    variant="outlined"
                                    fullWidth
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    sx={{ marginBottom: "10px" }}
                                />
                                <Button variant="contained" onClick={handleCommentSubmit}>Submit</Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default function Booking ({house = {}}){
    const { id } = useParams();
    const navigate = useNavigate();
    const [img, setImg] = useState([]);
    const [forrentDetail, setForrentDetail] = useState("");
    const [host, setHost] = useState("");
    const [user, setUser] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const userID = JSON.parse(localStorage.getItem('user')).id;
useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/user/${userID}`);
                setUser(res.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUser();
    }, [userID]);

    useEffect(() => {
        const fetchForrentDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/forrent-house/detail/${id}`);
                setForrentDetail(res.data);
                setHost(res.data.user);
                setImg(res.data.imgDTOs);
            } catch (error) {
                console.error("Error fetching forrent details:", error);
            }
        };
        fetchForrentDetail();
    }, [id]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/comment/forrent/${id}`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchComments();
    }, [id]);

    const [formState, setFormState] = useState({
        orderday: null,
        payday: null,
        deposite: "",
        forrent: id,
        users: userID,
        payment: 1,
        status: 1
    });

    const handleChangeDatePicker = (newValue) => {
        setFormState({
            ...formState,
            orderday: newValue[0],
            payday: newValue[1],
        });
    };

    const handleInputChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleBooking = async () => {
        if (!formState.orderday || !formState.payday) {
            toast.error("Please select a valid date range");
            return;
        }
        const sendObject = {
            ...formState,
            orderday: formState.orderday.format('YYYY-MM-DD'),
            payday: formState.payday.format('YYYY-MM-DD'),
        };

        console.log("Booking data being sent:", sendObject);

        try {
            const res = await axios.post("http://localhost:8080/api/booking", sendObject);
            if (res.status === 201) {
                toast.success("Đặt thuê thành công, vui lòng kiểm tra email");
                await axios.post("http://localhost:8080/api/send-email/to-customer", {
                    recipient: user.email,
                    subject: "Thông báo xác nhận thuê nhà",
                    user: host,
                    forrent: forrentDetail,
                    booking: sendObject
                });
                navigate('/main');
            }
        } catch (error) {
            console.log("Booking error:", error.response);
            toast.error("Đặt thuê thất bại, xem lại ngày đặt thuê của bạn");
        }
    };

    const handleCommentSubmit = async () => {
        const token = localStorage.getItem('token');
         if (!token) {
            toast.error('User is not authenticated');
            return;
        }
        const commentData = {
            content: newComment,
            users: { id: userID },
            forrents: id
        };

        console.log("Comment data being sent:", commentData);

        try {
            const response = await axios.post(`http://localhost:8080/api/comment/forrent/${id}`, commentData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
            toast.error('Error adding comment');
        }
    };

    return (
        <>
            <HeaderMenu0 />
            <Divider />
            <Container
                sx={{
                    "@media (min-width: 1536px)": {
                        maxWidth: "1300px",
                    },
                }}
                style={{ paddingLeft: 0, paddingRight: 0, marginTop: "20px" }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box>
                            <Slider {...settings}>
                                {img.map((item) => (
                                    <Box key={item.img}>
                                        <img src={item.img} alt={item.title} style={{ width: '100%', height: '450px' }} loading="lazy" />
                                    </Box>
                                ))}
                            </Slider>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                '& > :not(style)': {
                                    m: 1,
                                    width: "568px",
                                    height: '450px',
                                    margin: "0px"
                                },
                            }}
                        >
                            <Paper elevation={10}>
                                <Container>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>{forrentDetail.namehouse}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>Địa chỉ: {forrentDetail.address}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>Số phòng ngủ: {forrentDetail.bedroom}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>Số phòng tắm: {forrentDetail.bathroom}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>Giá thuê: {forrentDetail.rentingprice} VND/ ngày</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ fontSize: "15px" }}>
                                        <strong>Mô tả chung: {forrentDetail.decription}</strong>
                                    </Grid>
                                    <Grid item xs={12} sx={{ marginTop: "10px", marginBottom: "10px" }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateRangePicker
                                                localeText={{ start: 'Check-in', end: 'Check-out' }}
                                                value={[dayjs(formState.orderday), dayjs(formState.payday)]}
                                                onChange={handleChangeDatePicker}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Số tiền đặt cọc"
                                            variant="outlined"
                                            id="deposite"
                                            name="deposite"
                                            value={formState.deposite}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            sx={{ marginBottom: "10px" }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <strong style={{ float: "right" }}>Tổng số tiền cần thanh toán lại: {formState.deposite !== "" ? forrentDetail.rentingprice - formState.deposite : forrentDetail.rentingprice}</strong>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            style={{
                                                marginBottom: "10px",
                                                height: "45px",
                                                width: "150px",
                                                float: "right",
                                            }}
                                            variant="contained"
                                            color="success"
                                            onClick={handleBooking}
                                        >
                                            Đặt thuê ngay
                                        </Button>
                                    </Grid>
                                </Container>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper elevation={10} sx={{ padding: "20px", marginBottom: "20px" }}>
                            <Typography variant="h6">Reviews</Typography>
                            {comments.map((comment) => (
                                <Box key={comment.id} sx={{ marginBottom: "10px" }}>
                                    <Typography variant="body2"><strong>{comment.users.name}</strong></Typography>
                                    <Typography variant="body2">{comment.content}</Typography>
                                    <Divider />
                                </Box>
                            ))}
                            <Box sx={{ marginTop: "20px" }}>
                                <Typography variant="h6">Add a Review</Typography>
                                <TextField
                                    variant="outlined"
                                    multiline
                                    fullWidth
                                    rows={4}
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ marginTop: "10px" }}
                                    onClick={handleCommentSubmit}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

function Booking4({ house }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [img, setImg] = useState([]);
  const [forrentDetail, setForrentDetail] = useState("");
  const [host, setHost] = useState("");
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const userID = JSON.parse(localStorage.getItem("user")).id;

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/user/${userID}`);
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/comment/forrent/${house.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    if (house) {
      fetchComments();
    }
  }, [house]);

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newComment,
          users: {
            id: user.id,
          },
          forrents: house.id,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add comment");
      }
      const data = await response.json();
      setComments([...comments, data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const [formState, setFormState] = useState({
    orderday: null,
    payday: null,
    deposite: "",
    forrent: id,
    users: userID,
    payment: 1,
    status: 1,
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/forrent-house/${id}`).then((res) => {
      setForrentDetail(res.data);
      setHost(res.data.users);
      setImg(res.data.img);
    });
  }, [id]);

  const handleChangeDatePicker = (newValue) => {
    setFormState({
      ...formState,
      orderday: newValue[0],
      payday: newValue[1],
    });
  };

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async () => {
    let sendObject = {
      ...formState,
      orderday: dayjs(formState.orderday).format("YYYY-MM-DD"),
      payday: dayjs(formState.payday).format("YYYY-MM-DD"),
    };

    try {
      let res = await axios.post("http://localhost:8080/api/booking", sendObject);
      if (res.status === 201) {
        toast.success("Đặt thuê thành công, vui lòng kiểm tra email");
        await axios.post("http://localhost:8080/api/send-email/to-customer", {
          recipient: user.email,
          subject: "Thông báo xác nhận thuê nhà",
          user: host,
          forrent: forrentDetail,
          booking: sendObject,
        });
        navigate("/main");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Đặt thuê thất bại, xem lại ngày đặt thuê của bạn");
    }
  };

  if (!house) return null;

  return (
    <>
      <HeaderMenu0 />
      <Divider />
      <Container
        sx={{
          "@media (min-width: 1536px)": {
            maxWidth: "1300px",
          },
        }}
        style={{ paddingLeft: 0, paddingRight: 0, marginTop: "20px" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box>
              <Box>
                <Slider {...settings}>
                  {img.map((item) => (
                    <Box key={item.img}>
                      <img
                        src={item.img}
                        alt={item.title}
                        style={{ width: "100%", height: "450px" }}
                        loading="lazy"
                      />
                    </Box>
                  ))}
                </Slider>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  m: 1,
                  width: "568px",
                  height: "450px",
                  margin: "0px",
                },
              }}
            >
              <Paper elevation={10}>
                <Container>
                  <Grid item xs={12} sx={{ fontSize: "15px" }}>
                    <strong>{forrentDetail.namehouse}</strong>
                  </Grid>
                  <Grid item xs={12} sx={{ fontSize: "15px" }}>
                    <strong>Địa chỉ: {forrentDetail.address}</strong>
                  </Grid>
                  <Grid item xs={12} sx={{ fontSize: "15px" }}>
                    <strong>Số phòng ngủ: {forrentDetail.bedroom}</strong>
                  </Grid>
                  <Grid item xs={12} sx={{ fontSize: "15px" }}>
                    <strong>Số phòng tắm: {forrentDetail.bathroom}</strong>
                  </Grid>
                  <Grid item xs={12} sx={{ fontSize: "15px" }}>
                    <strong>Giá thuê: {forrentDetail.rentingprice} VND/ ngày</strong>
                  </Grid>
                  <Grid item xs={12} sx={{ fontSize: "15px" }}>
                    <strong>Mô tả chung: {forrentDetail.decription}</strong>
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: "10px", marginBottom: "10px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateRangePicker"]}>
                        <DateRangePicker
                          localeText={{ start: "Check-in", end: "Check-out" }}
                          className="demoxxx"
                          value={[dayjs(formState.orderday), dayjs(formState.payday)]}
                          onChange={handleChangeDatePicker}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Số tiền đặt cọc"
                      variant="outlined"
                      id="outlined-size-small"
                      name="deposite"
                      value={formState.deposite}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ marginTop: "10px", marginBottom: "10px", fontSize: "15px" }}
                  >
                    <strong>Số tiền còn lại phải thanh toán: </strong>
                    {formState.payday != null && formState.orderday != null
                      ? (
                          forrentDetail.rentingprice *
                            formState.payday.diff(formState.orderday, "days") -
                          formState.deposite
                        ).toLocaleString("de-DE")
                      : 0}{" "}
                    VND
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      onClick={handleBooking}
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        display: "block",
                        width: "100%",
                      }}
                    >
                      Đặt ngay
                    </Button>
                  </Grid>
                </Container>
              </Paper>
            </Box>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" component="h3" mb={2}>
            Bình luận
          </Typography>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <Box key={index} mb={2} p={2} border={1} borderRadius={2}>
                <Typography variant="body1">{comment.content}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {comment.createdAt}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              Chưa có bình luận
            </Typography>
          )}
          <Divider sx={{ my: 2 }} />
          <Box display="flex" flexDirection="column">
            <TextField
              label="Bình luận mới"
              variant="outlined"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              fullWidth
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCommentSubmit}
              disabled={!newComment.trim()}
            >
              Gửi bình luận
            </Button>
          </Box>
        </Grid>
      </Container>
      <Divider sx={{ my: 4 }} />
      <Footer />
    </>
  );
}