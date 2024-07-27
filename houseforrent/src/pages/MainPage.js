import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import {
    Box,
    Container,
    Divider,
    Pagination
} from "@mui/material";

import AdminCardItem1 from "./../components/AdminCardItem1";
import Footer from "../components/Footer";
import HeaderDetail from "../components/HeaderDetail";
import axios from "axios";
import HeaderDetail0 from "../components/HeaderDetail0";

export default function MainPage() {
    const [forrentList, setForrentList] = useState([]);
    const [page , setPage] = useState(1);
    const [pageSize] = useState(6);
    const [totalPages, setTotalPages] = useState(1);
    
    useEffect(() => {
        fetchForRentHouses();
    },[page , pageSize])

     const fetchForRentHouses = async () => {
        // Gọi API để lấy danh sách forrent
        axios.get('http://localhost:8080/api/forrent-house/pagging',{
            params : {
                page : page - 1,
                pageSize : pageSize
            }
        })
            .then(response => {
                console.log('API Response:', response.data); // Kiểm tra dữ liệu trả về từ API
                const {content,totalPages} = response.data;
                setForrentList(response.data.content); // Assuming the API returns items in 'response.data.items'
                setTotalPages(totalPages);
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi gọi API:', error);
            });
    };

    const handlePageChange = (event , value) => {
        setPage(value);
    };

    const handleDataChange = (data) => {
        setForrentList(data);
    };

    return (
        <>
            <HeaderDetail0 onDataChange={handleDataChange} />
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
                            <AdminCardItem1
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