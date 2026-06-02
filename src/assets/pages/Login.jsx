import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { FaChartLine } from "react-icons/fa";

import { FaDollarSign } from "react-icons/fa";
import SignInform from "../../components/SignInForm ";

const Login = () => {
  return (
    <Container>
      <Row className="bg-dark p-5 rounded">
        <Col md={6}>
          <SignInform />
        </Col>
        <Col md={6}>
          <div
            className="d-flex flex-column justify-content-center fs-1"
            style={{ height: "100%" }}
          >
            <div className="text-danger">
              <FaDollarSign className="dollar-spin text-warning" />
              Track Every Dollar
            </div>
            <div className="text-success">
              <FaChartLine className="text-success me-2" />
              Turn Small Savings Into Big Growth
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
