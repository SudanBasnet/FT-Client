import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TransactionForm } from "../../components/layouts/TransactionForm";
import { TransactionTable } from "../../components/layouts/TransactionTable";
import { useEffect } from "react";
import { useUser } from "../../context/userContext.js";

const Transaction = () => {
  const { getTransactions } = useUser();
  useEffect(() => {
    getTransactions();

    const intervalId = setInterval(() => {
      getTransactions();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [getTransactions]);
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
