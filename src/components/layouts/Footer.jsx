import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="mt-auto border-top bg-white py-4 text-body-secondary">
      <Container className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        <div>
          <Link className="fw-bold text-decoration-none text-primary" to="/">
            Finance Tracker
          </Link>
          <p className="mb-0 small">A clearer way to follow your money.</p>
        </div>
        <nav className="d-flex gap-3 small" aria-label="Footer navigation">
          <Link className="text-body-secondary text-decoration-none" to="/#features">
            Features
          </Link>
          <Link
            className="text-body-secondary text-decoration-none"
            to="/#how-it-works"
          >
            How it works
          </Link>
          <Link className="text-body-secondary text-decoration-none" to="/login">
            Sign in
          </Link>
        </nav>
        <p className="mb-0 small">&copy; 2026 Finance Tracker</p>
      </Container>
    </footer>
  );
};
