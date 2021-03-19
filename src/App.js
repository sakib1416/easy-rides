
import './App.css';
import Button from 'react-bootstrap/Button';
import { Navbar, Nav, Form} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Easy-Rides</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Form inline>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Destination</Nav.Link>
            <Nav.Link href="#home">Blog</Nav.Link>
            <Nav.Link href="#link">Contact</Nav.Link>
            <Nav.Link href="#link">Login</Nav.Link>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default App;
