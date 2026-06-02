import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Dashboard = () => {
  return (
    <Container>
      <Row className="bg-dark p-5 rounded">
        <Col></Col>

        <Col md={6}>
          <h1 className="text-light">Welcome to your Dashboard</h1>
        </Col>
      </Row>
    </Container>
  );
};
export default Dashboard;
