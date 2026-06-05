import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { ImExit } from "react-icons/im";
import { FaReceipt, FaSignInAlt, FaTachometerAlt } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { useUser } from "../../context/userContext";
import { useState } from "react";

export const Header = () => {
  const { user, setUser } = useUser();
  const [expanded, setExpanded] = useState(false);

  const closeNavbar = () => setExpanded(false);

  const handleOnlogout = () => {
    closeNavbar();
    localStorage.removeItem("accessJWT");
    //reset user object from the state
    setUser({});
  };
  return (
    <Navbar
      expand="lg"
      variant="dark"
      className="app-navbar mb-4"
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container>
        <Navbar.Brand className="app-navbar__brand" as={Link} to="/" onClick={closeNavbar}>
          Finance Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user?._id ? (
              <>
                <Link className="nav-link" to="/dashboard" onClick={closeNavbar}>
                  <FaTachometerAlt /> {""}
                  Dashboard
                </Link>
                <Link className="nav-link" to="/transaction" onClick={closeNavbar}>
                  <FaReceipt /> {""}
                  Transaction
                </Link>
                <Link onClick={handleOnlogout} className="nav-link" to="/">
                  <ImExit /> Logout
                </Link>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/signup" onClick={closeNavbar}>
                  <FaSignInAlt /> {""}
                  Sign Up
                </Link>
                <Link className="nav-link" to="/" onClick={closeNavbar}>
                  <MdLogin /> {""}
                  Login In
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
