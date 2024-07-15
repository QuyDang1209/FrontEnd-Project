import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailForrent = () => {
    const { id } = useParams();
    const [forrent, setForrent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchForrent = async () => {
            try {
                console.log("id: ", id)
                const response = await axios.get(`http://localhost:8080/api/forrent-house/detail/${id}`);

                console.log(response.data);
                setForrent(response.data);
                setLoading(false);
            } catch (error) {

                console.log("error", error)
                setError(error);
                setLoading(false);
            }
        };

        fetchForrent();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            {forrent && (
                <div>
                    <h1>{forrent.namehouse}</h1>
                    <p>Address: {forrent.address}</p>
                    <p>Description: {forrent.description}</p>
                    <p>Renting Price: ${forrent.rentingprice}</p>
                    <p>Bedrooms: {forrent.bedroom}</p>
                    <p>Bathrooms: {forrent.bathroom}</p>
                    <p>Type: {forrent.type.name}</p>
                    <p>Owner: {forrent.users.name}</p>
                    <div>
                        {forrent.imgDTOs.map(i => (
                            <img key={i.id} src={i.img} alt={i.img} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailForrent;
