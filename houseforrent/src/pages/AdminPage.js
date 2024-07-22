import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Divider,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    TextField,
} from "@mui/material";

import AdminCardItem from "./../components/AdminCardItem";
import Footer from "../components/Footer";
import HeaderMenu0 from "../components/HeaderMenu0";
import {Link, useNavigate} from "react-router-dom";


export default function AdminPage() {
    const [forrentList, setForrentList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8080/api/forrent-house')
            .then(response => {
                console.log('API Response:', response.data); // Kiểm tra dữ liệu trả về từ API
                setForrentList(response.data);
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi gọi API:', error);
            });
    }, []);
    const handleDataChange = (data) => {
        setForrentList(data);
    }
    const handleBtnDetailClick = (idCardDetail)=>{
        console.log("idCardDetail", idCardDetail);
        navigate(`/booking/${idCardDetail}`)
    }
    return (
        <>
            <HeaderMenu0 onDataChange={handleDataChange}/>
            <Divider />
            <Container
                sx={{
                    "@media (min-width: 1536px)": {
                        maxWidth: "1400px",
                    },
                }}
                style={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    marginTop: "20px",
                    marginBottom: "20px",
                }}
            >
                <Box display={"flex"} gap={"20px"} flexWrap={"wrap"}>
                    {forrentList.length > 0 ? (
                        forrentList.map((f) => (
                            <AdminCardItem
                                key={f.id}
                                id = {f.id}
                                img={f.imgDTOs.length > 0 ? f.imgDTOs[0].img : ''} // Lấy ảnh đầu tiên từ imgDTOs
                                title={f.namehouse} // Sử dụng address thay cho description
                                address={f.address}
                                description={f.description}
                                rentingprice={new Intl.NumberFormat().format(f.rentingprice)}
                                handleBtnDetailClick = {handleBtnDetailClick}
                            />
                                
                        ))
                    ) : (
                        <p>Không có dữ liệu để hiển thị</p>
                    )}
                </Box>
            </Container>
            <Divider />
            <Footer />
        </>
    );
}