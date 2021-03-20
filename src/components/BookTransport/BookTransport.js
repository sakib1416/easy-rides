import React from 'react';
import { useParams } from 'react-router';


const BookTransport = () => {
    const {type} = useParams();
    return (
        <div>
            <h1>This is dynamic page {type}</h1>
        </div>
    );
};

export default BookTransport;