import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import transportData from '../../fakeData/transportData.json'

const BookTransport = () => {
    const {transportType} = useParams();
    const transport = transportData.find(data => data.type === transportType);
    const {type, image, passengers, price} = transport;
    console.log(transport);
    const [searchResult, setSearchResult] = useState({
        from: '',
        to: '',
        value: false
    });
    const handleSearch = (event) => {
        console.log("search button clicked");
        event.preventDefault();
    }
    const handleBlur = (event) => {
        if(event.target.name === 'from') {
            let result = {...searchResult};
            result.from = event.target.value;
            setSearchResult(result);
            //console.log(result, searchResult)
        }
        if(event.target.name === 'to') {
            let result = {...searchResult};
            result.to = event.target.value;
            result.value = true;
            setSearchResult(result);
            console.log(result, searchResult)
        }
    }
    return (
        <div>
            <h1>This is dynamic page {type}</h1>
            {!searchResult.value && <Form onSubmit={handleSearch}>
                <Form.Group>
                    <Form.Control type="text" name = "from" onBlur = {handleBlur} required placeholder="Pick from"  />
                    <br />
                    <Form.Control type="text" name = "to" onBlur = {handleBlur} required  placeholder="Pick to" />
                    <Button variant="primary" type="submit">
                        Search
                    </Button>
                </Form.Group>
            </Form>}
            {searchResult.value && <Card style={{ width: '25rem' }}>
            <Card.Text>
                From: {searchResult.from}
            </Card.Text>
            <Card.Text>
                To: {searchResult.to}
            </Card.Text>
            <Card.Body>
                <Card.Title>{type}</Card.Title>
                <Card.Img style={{width: "100px"}} variant="top" src={image} />
                <Card.Link href="#">Passengers: {passengers}</Card.Link>
                <Card.Link href="#">Price: {price}</Card.Link>
                <Button variant="primary">Book your ride</Button>
            </Card.Body>
            
            </Card>}
        </div>
    );
};

export default BookTransport;