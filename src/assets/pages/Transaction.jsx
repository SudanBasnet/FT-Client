import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TransactionForm } from "../../components/layouts/TransactionForm";
import { TransactionTable } from "../../components/layouts/TransactionTable";
import { useEffect } from "react";
import { useUser } from "../../context/userContext.js";
import { CustomModal } from "../../components/CustomModal.jsx";

const Transaction = () => {
  const { user, getTransactions } = useUser();
  useEffect(() => {
    if (!user?._id) {
      return;
    }

    getTransactions();

    const intervalId = setInterval(() => {
      getTransactions();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [user?._id, getTransactions]);
  return (
    <Container className="page-container">
      <Row className="app-surface">
        <Col>
          <CustomModal>
            <TransactionForm />
          </CustomModal>
          <hr />
          <TransactionTable />
        </Col>
      </Row>
    </Container>
  );
};
export default Transaction;
