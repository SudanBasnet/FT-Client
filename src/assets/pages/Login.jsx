import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { FaChartLine } from "react-icons/fa";

import { FaDollarSign } from "react-icons/fa";
import SignInform from "../../components/SignInForm ";

const Login = () => {
  return (
    <Container className="page-container">
      <Row className="app-surface align-items-center">
        <Col md={6}>
          <SignInform />
        </Col>
        <Col md={6}>
          <div className="auth-hero">
            <div className="auth-hero__line">
              <FaDollarSign className="dollar-spin" />
              Track Every Dollar
            </div>
            <div className="auth-hero__line auth-hero__line--muted">
              <FaChartLine className="me-2" />
              Turn Small Savings Into Big Growth
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
