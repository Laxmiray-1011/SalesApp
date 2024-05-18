import { Container, Nav, Navbar} from 'react-bootstrap';// Importing necessary components from react-bootstrap library
import {Link} from "react-router-dom";// Importing Link component from react-router-dom for navigation

// Function component for the top navigation bar
function TopNavbar() {
  
  return (
    <>
      <Navbar bg="primary" expand="lg" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">SALES APP</Navbar.Brand >  {/* Brand link to navigate to "/Addsales" */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" /> {/* Toggle button for mobile view */}
          <Navbar.Collapse id="basic-navbar-nav">{/* Navbar content that collapses on smaller screens */}
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/Addsales">ADD SALES</Nav.Link> 
              <Nav.Link as={Link} to="/Top5Sales">TOP 5 SALES</Nav.Link>
              <Nav.Link as={Link} to="/TodayRevenue">TODAYS TOTAL REVENUE</Nav.Link>
              <Nav.Link as={Link} to="/Login">LOGIN</Nav.Link>
              <Nav.Link as={Link} to="/Register">REGISTER</Nav.Link>
              <Nav.Link as={Link} to="/login">LOGOUT</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNavbar;// Exporting the TopNavbar component for use in other files


