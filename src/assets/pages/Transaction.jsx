import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TransactionForm } from "../../components/layouts/TransactionForm";
import { TransactionTable } from "../../components/layouts/TransactionTable";

const Transaction = () => {
  return (
    <Container>
      <Row className="bg-dark p-5 rounded">
        <Col>
          <TransactionForm />
          <hr />
          <TransactionTable />
        </Col>
      </Row>
    </Container>
  );
};
export default Transaction;
