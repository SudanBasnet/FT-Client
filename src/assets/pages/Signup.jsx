import { Card, Col, Container, Row } from "react-bootstrap";
import { FinancialTips } from "../../components/FinancialTips";
import Signupform from "../../components/SignUpForm";

const Signup = () => {
  return (
    <Container className="py-4 py-lg-5">
      <Row className="justify-content-center">
        <Col xl={10}>
          <Card className="overflow-hidden border-0 shadow-lg">
            <Row className="g-0">
              <Col lg={6} className="d-none bg-primary text-white d-lg-block">
                <FinancialTips />
              </Col>
              <Col lg={6}>
                <Signupform />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Signup;
