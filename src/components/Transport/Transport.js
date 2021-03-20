import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Transport = (props) => {
    const {type, image, passengers, price} = props.transport
    return (
        <div>
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{type}</Card.Title>
                <Link to = {"/destination/"+type}><Button variant="primary">Book</Button></Link>
            </Card.Body>
            </Card>
        </div>
    );
};

export default Transport;