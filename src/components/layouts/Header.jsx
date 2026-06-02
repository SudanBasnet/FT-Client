import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { ImExit } from "react-icons/im";
import { FaReceipt, FaSignInAlt, FaTachometerAlt } from "react-icons/fa";
import { MdLogin } from "react-icons/md";

export const Header = () => {
  return (
    <Navbar expand="lg" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand href="#home">Finance Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link" to="/signup">
              <FaSignInAlt /> {""}
              Sign Up
            </Link>
            <Link className="nav-link" to="/">
              <MdLogin /> {""}
              Login In
            </Link>
            <Link className="nav-link" to="/dashboard">
              <FaTachometerAlt /> {""}
              Dashboard
            </Link>
            <Link className="nav-link" to="/transaction">
              <FaReceipt /> {""}
              Transaction
            </Link>
            <Link className="nav-link" to="/">
              <ImExit /> Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
