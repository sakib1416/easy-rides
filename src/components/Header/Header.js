import React from 'react';
import { Navbar, Nav, Form} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Easy-Rides</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Form inline>
                    <NavLink style={{padding: '5px'}} to="/">Home</NavLink>
                    <NavLink style={{padding: '5px'}} to="/">Destination</NavLink>
                    <NavLink style={{padding: '5px'}} to="/blog">Blog</NavLink>
                    <NavLink style={{padding: '5px'}} to="/contact">Contact</NavLink>
                    <NavLink style={{padding: '5px'}} to="/login">Login</NavLink>
                </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;