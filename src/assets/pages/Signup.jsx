import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FinancialTips } from "../../components/FinancialTips";
import Signupform from "../../components/SignUpForm";

const Signup = () => {
  return (
    <Container className="page-container">
      <Row className="app-surface align-items-center">
        <Col md={6}>
          <FinancialTips />
        </Col>

        <Col md={6}>
          <Signupform />
        </Col>
      </Row>
    </Container>
  );
};
export default Signup;
