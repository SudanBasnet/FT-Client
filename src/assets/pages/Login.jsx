import { Card, Col, Container, Row } from "react-bootstrap";
import { FaChartLine, FaShieldAlt, FaWallet } from "react-icons/fa";
import SignInform from "../../components/SignInForm ";

const Login = () => {
  return (
    <Container className="py-4 py-lg-5">
      <Row className="justify-content-center">
        <Col xl={10}>
          <Card className="overflow-hidden border-0 shadow-lg">
            <Row className="g-0">
              <Col lg={6}>
                <SignInform />
              </Col>
              <Col
                lg={6}
                className="d-none align-items-center bg-primary p-5 text-white d-lg-flex"
              >
                <div>
                  <FaWallet className="display-3 mb-4" aria-hidden="true" />
                  <h2 className="fw-bold">Your finances, clearly organized.</h2>
                  <p className="mb-4 text-white-50">
                    Keep income, expenses, and recent activity in one simple
                    dashboard.
                  </p>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <FaChartLine aria-hidden="true" />
                    <span>See your cash flow at a glance</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <FaShieldAlt aria-hidden="true" />
                    <span>Your account keeps your records private</span>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
