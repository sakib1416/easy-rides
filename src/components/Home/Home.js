import React from 'react';
import transportData from '../../fakeData/transportData.json';
import Transport from '../Transport/Transport';
import { Container, Col } from 'react-bootstrap';

const Home = () => {
    
    
    return (
        <div>
            <h1>Welcome to Easy Rides</h1>
            {
                transportData.map(transport =>  {
                    return (
                        <Container >
                            
                                <Col sm><Transport transport = {transport}></Transport></Col>
                            
                        </Container>
                    )
                })
            }
        </div>
    );
};

export default Home;