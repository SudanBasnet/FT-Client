import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Dashboard = () => {
  return (
    <Container className="page-container">
      <Row className="app-surface dashboard-surface align-items-center">
        <Col md={5}>
          <div className="dashboard-orb">$</div>
        </Col>
        <Col md={7}>
          <p className="auth-card__eyebrow">Dashboard</p>
          <h1 className="dashboard-title">Welcome to your Dashboard</h1>
          <p className="dashboard-copy">
            Review your balances, track spending patterns, and keep your money
            decisions visible.
          </p>
        </Col>
      </Row>
    </Container>
  );
};
export default Dashboard;
