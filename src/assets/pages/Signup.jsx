import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FinancialTips } from "../../components/FinancialTips";
import Signupform from "../../components/SignUpForm";

const Signup = () => {
  return (
    <Container>
      <Row className="bg-dark p-5 rounded">
        <Col>
          <FinancialTips />{" "}
        </Col>

        <Col>
          <Signupform />
        </Col>
      </Row>
    </Container>
  );
};
export default Signup;
