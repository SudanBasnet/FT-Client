import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TransactionForm } from "../../components/layouts/TransactionForm";
import { TransactionTable } from "../../components/layouts/TransactionTable";
import { useEffect } from "react";
import { useUser } from "../../context/userContext.js";
import { CustomModal } from "../../components/CustomModal.jsx";
import { AppSpinner } from "../../components/AppSpinner.jsx";

const Transaction = () => {
  const { user, getTransactions, hasLoadedTransactions } = useUser();
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

  if (!hasLoadedTransactions) {
    return (
      <Container className="py-5">
        <AppSpinner label="Loading your transactions..." />
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row>
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
