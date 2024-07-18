import axios from 'axios';
const API_URL = 'http://localhost:8080/api/forrent-house';
const getForrentList = async (page , pageSize) => {
    try {
        const response = await axios.get(API_URL,{
            params: {
                page: page,
                pageSize: pageSize
            }
        });
        return response.data;
    }
    catch (error){
        console.error('Có lỗi xảy ra khi gọi API:',error);
        throw error;
    }
};
export default {
    getForrentList,
};