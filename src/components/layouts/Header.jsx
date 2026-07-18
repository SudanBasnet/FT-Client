import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { ImExit } from "react-icons/im";
import { FaReceipt, FaTachometerAlt, FaWallet } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { useUser } from "../../context/userContext";
import { useState } from "react";
import { toast } from "react-toastify";

export const Header = () => {
  const { user, setUser, clearTransactions } = useUser();
  const [expanded, setExpanded] = useState(false);

  const closeNavbar = () => setExpanded(false);

  const handleOnlogout = () => {
    closeNavbar();
    localStorage.removeItem("accessJWT");
    clearTransactions();
    setUser({});
    toast.success("You have been signed out.");
  };
  return (
    <Navbar
      expand="lg"
      className="sticky-top border-bottom bg-white py-3 shadow-sm"
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container>
        <Navbar.Brand
          className="d-flex align-items-center gap-2 fw-bold text-primary"
          as={Link}
          to="/"
          onClick={closeNavbar}
        >
          <FaWallet /> Finance Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="align-items-lg-center gap-lg-2 ms-auto">
            {user?._id ? (
              <>
                <Nav.Link
                  as={Link}
                  className="d-flex align-items-center gap-2"
                  to="/dashboard"
                  onClick={closeNavbar}
                >
                  <FaTachometerAlt /> {""}
                  Dashboard
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  className="d-flex align-items-center gap-2"
                  to="/transaction"
                  onClick={closeNavbar}
                >
                  <FaReceipt /> {""}
                  Transactions
                </Nav.Link>
                <Button
                  as={Link}
                  onClick={handleOnlogout}
                  className="d-flex align-items-center justify-content-center gap-2 mt-2 mt-lg-0"
                  variant="outline-primary"
                  to="/"
                >
                  <ImExit /> Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/" onClick={closeNavbar}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/#features" onClick={closeNavbar}>
                  Features
                </Nav.Link>
                <Nav.Link as={Link} to="/#how-it-works" onClick={closeNavbar}>
                  How it works
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  className="d-flex align-items-center gap-2"
                  to="/login"
                  onClick={closeNavbar}
                >
                  <MdLogin /> {""}
                  Log In
                </Nav.Link>
                <Button
                  as={Link}
                  to="/signup"
                  onClick={closeNavbar}
                  className="mt-2 px-3 fw-semibold mt-lg-0"
                >
                  Get Started
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
