import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Transaction = () => {
  return (
    <Container>
      <Row className="bg-dark p-5 rounded">
        <Col md={6}>
          <h1 className="text-light">Transaction History</h1>
        </Col>
      </Row>
    </Container>
  );
};
export default Transaction;
