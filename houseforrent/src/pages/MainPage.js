import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    Divider
} from "@mui/material";

import CardItem from "./../components/CardItem";
import Footer from "../components/Footer";
import HeaderDetail from "../components/HeaderDetail";
import axios from "axios";
import HeaderMenu0 from "../components/HeaderMenu0";

export default function MainPage() {
    const [forrentList, setForrentList] = useState([]);

    useEffect(() => {
        // Gọi API để lấy danh sách forrent
        axios.get('http://localhost:8080/api/forrent-house')
            .then(response => {
                console.log('API Response:', response.data); // Kiểm tra dữ liệu trả về từ API
                setForrentList(response.data);
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi gọi API:', error);
            });
    }, []);

    return (
        <>
            <HeaderMenu0 />
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
                            <CardItem
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
            </Container>
            <Divider />
            <Footer />
        </>
    );
}
