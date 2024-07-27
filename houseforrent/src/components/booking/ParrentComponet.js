import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Booking from './Booking';
import {useParams} from 'react-router-dom';

export default function ParentComponent() {
    const [house, setHouse] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchHouse = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/forrent-house/${id}`);
                setHouse(response.data);
            } catch (error) {
                console.error('Error fetching house data:', error);
            }
        };
        fetchHouse();
    }, [id]);

    return (
        <div>
            {house && <Booking house={house} />}
        </div>
    );
}
