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
    Pagination
} from "@mui/material";

import AdminCardItem from "./../components/AdminCardItem";
import Footer from "../components/Footer";
import HeaderMenu1 from "../components/HeaderMenu0";

export default function AdminPage() {
    const [forrentList, setForrentList] = useState([]);
    const [page , setPage] = useState(1);
    const [pageSize] = useState(8);
    const [totalPages, setTotalPages] = useState(1);
    /* 
    useEffect(() => {
        axios.get('http://localhost:8080/api/forrent-house',{
            params : {
                page : page - 1,
                pageSize : pageSize
            }
        })
            .then(response => {
                console.log('API Response:', response.data); // Kiểm tra dữ liệu trả về từ API
                setForrentList(response.data);
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi gọi API:', error);
            });
    }, [page , pageSize]);*/
    
    useEffect(() => {
        fetchForRentHouses();
    },[page , pageSize])

    const fetchForRentHouses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/forrent-house/pagging',{
                params: {
                    page: page - 1,  // Backend might use zero-based index
                    pageSize: pageSize
                }
            });
            console.log('API response:', response.data);
            const {content , totalPages} = response.data;
            setForrentList(content);
            setTotalPages(totalPages);
        }
        catch (error) {
            console.log('Lỗi gọi API:', error);
        }
    }
    
    const handlePageChange = (event , value) => {
        setPage(value);
    };
    return (
        <>
            <HeaderMenu1 />
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
                    {/* <AdminCardItem img="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800" />
                    <AdminCardItem img="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800" />
                    <AdminCardItem img="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800" />
                    <AdminCardItem img="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800" />
                    <AdminCardItem img="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800" />
                    <AdminCardItem img="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800" />
                    <AdminCardItem img="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800" />
                    <AdminCardItem img="https://images.unsplash.com/photo-1469854523086-cc02fe5d880" /> */}
                    {forrentList.length > 0 ? (
                        forrentList.map((f) => (
                            <AdminCardItem
                                key={f.id}
                                img={f.imgDTOs.length > 0 ? f.imgDTOs[0].img : ''} // Lấy ảnh đầu tiên từ imgDTOs
                                title={f.namehouse} // Sử dụng address thay cho description
                                address={f.address}
                                description={f.description}
                                rentingprice={new Intl.NumberFormat().format(f.rentingprice)}
                            />
                        ))
                    ) : (
                        <p>Không có dữ liệu để hiển thị</p>
                    )}
                </Box>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    sx={{ marginTop: "20px", display : "flex", justifyContent : "center" }}
                />  
            </Container>
            <Divider />
            <Footer />
        </>
    );
}