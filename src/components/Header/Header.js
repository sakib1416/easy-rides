import React, { useContext } from 'react';
import { Navbar, Nav, Form} from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../App';
import { handleSignOut } from '../Login/LoginManager';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const signOut = () => {
        handleSignOut()
        .then(response => {
            setLoggedInUser(response);
        })
    }
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand ><Link to ="/">Easy-Rides</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Form inline>
                    <NavLink style={{padding: '5px'}} to="/">Home</NavLink>
                    <NavLink style={{padding: '5px'}} to="/destination">Destination</NavLink>
                    <NavLink style={{padding: '5px'}} to="/blog">Blog</NavLink>
                    <NavLink style={{padding: '5px'}} to="/contact">Contact</NavLink>
                    {
                        loggedInUser.email ? <NavLink style={{padding: '5px'}} to="/contact">{loggedInUser.name}</NavLink> : <NavLink style={{padding: '5px'}} to="/login">Login</NavLink>
                    }
                    {
                        loggedInUser.email && <NavLink to="/login" onClick={signOut}>Sign Out</NavLink>
                    }
                </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;