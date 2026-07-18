import { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import {
  FaArrowRight,
  FaChartPie,
  FaCheckCircle,
  FaLock,
  FaReceipt,
  FaRegLightbulb,
  FaWallet,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../context/userContext";

const features = [
  {
    icon: FaWallet,
    title: "One clear balance",
    copy: "See income, expenses, and your current balance without piecing numbers together.",
  },
  {
    icon: FaReceipt,
    title: "Simple transaction tracking",
    copy: "Add, search, edit, and organize everyday transactions from one focused workspace.",
  },
  {
    icon: FaChartPie,
    title: "Useful visual insights",
    copy: "Understand cash flow and top expenses through charts designed for quick decisions.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your account",
    copy: "Set up a private Finance Tracker workspace in a few moments.",
  },
  {
    number: "02",
    title: "Record your money movement",
    copy: "Add income and expenses with a title, amount, and transaction date.",
  },
  {
    number: "03",
    title: "Use the dashboard to adjust",
    copy: "Review your balance and spending patterns, then make informed choices.",
  },
];

const LandingPage = () => {
  const { user } = useUser();
  const { hash } = useLocation();
  const primaryPath = user?._id ? "/dashboard" : "/signup";
  const primaryLabel = user?._id ? "Open dashboard" : "Start tracking free";

  useEffect(() => {
    if (!hash) {
      return;
    }

    const section = document.getElementById(hash.slice(1));
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  return (
    <>
      <section className="landing-hero py-5">
        <Container className="position-relative py-lg-5">
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <span className="badge rounded-pill bg-primary-subtle px-3 py-2 text-primary-emphasis">
                A simpler view of your financial life
              </span>
              <h1 className="display-3 mt-4 fw-bold lh-sm">
                Know where your money goes. Decide what comes next.
              </h1>
              <p className="lead my-4 text-body-secondary">
                Finance Tracker brings your income, expenses, and cash-flow
                insights into one calm, easy-to-use dashboard.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <Button
                  as={Link}
                  to={primaryPath}
                  size="lg"
                  className="px-4 fw-semibold"
                >
                  {primaryLabel} <FaArrowRight className="ms-2" />
                </Button>
                {!user?._id && (
                  <Button
                    as={Link}
                    to="/login"
                    size="lg"
                    variant="outline-primary"
                    className="px-4 fw-semibold"
                  >
                    Sign in
                  </Button>
                )}
              </div>
              <div className="d-flex flex-wrap gap-4 mt-4 small text-body-secondary">
                <span>
                  <FaCheckCircle className="me-2 text-success" />Easy setup
                </span>
                <span>
                  <FaLock className="me-2 text-success" />Private workspace
                </span>
              </div>
            </Col>

            <Col lg={6}>
              <Card className="landing-preview border-0 shadow-lg">
                <Card.Body className="p-4 p-md-5">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                      <span className="small fw-semibold text-body-secondary">
                        AVAILABLE BALANCE
                      </span>
                      <div className="display-6 fw-bold">$12,480</div>
                    </div>
                    <span className="rounded-circle bg-primary-subtle p-3 text-primary">
                      <FaWallet size={24} />
                    </span>
                  </div>

                  <Row className="g-3 mb-4">
                    <Col xs={6}>
                      <div className="rounded-3 bg-success-subtle p-3">
                        <span className="small text-success-emphasis">Income</span>
                        <strong className="d-block fs-5 text-success">$6,240</strong>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="rounded-3 bg-danger-subtle p-3">
                        <span className="small text-danger-emphasis">Expenses</span>
                        <strong className="d-block fs-5 text-danger">$3,180</strong>
                      </div>
                    </Col>
                  </Row>

                  <div className="rounded-4 border bg-body-tertiary p-4">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <strong>Monthly cash flow</strong>
                      <span className="badge bg-success-subtle text-success-emphasis">
                        +18.4%
                      </span>
                    </div>
                    <div className="landing-bars" aria-label="Cash-flow chart preview">
                      {[42, 58, 49, 72, 65, 88, 76].map((height, index) => (
                        <span
                          key={height + index}
                          style={{ "--landing-bar-height": `${height}%` }}
                        />
                      ))}
                    </div>
                    <div className="d-flex justify-content-between mt-2 small text-body-secondary">
                      <span>Jan</span>
                      <span>Mar</span>
                      <span>May</span>
                      <span>Jul</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="features" className="landing-section bg-white py-5">
        <Container className="py-lg-5">
          <div className="mx-auto mb-5 text-center landing-heading">
            <span className="small fw-semibold text-uppercase text-primary">
              Built for everyday clarity
            </span>
            <h2 className="display-6 mt-2 fw-bold">The essentials, without the clutter</h2>
            <p className="text-body-secondary">
              Everything you need to understand daily cash flow and keep your
              financial records organized.
            </p>
          </div>
          <Row className="g-4">
            {features.map(({ icon: Icon, title, copy }) => (
              <Col md={4} key={title}>
                <Card className="h-100 border-0 bg-body-tertiary p-2">
                  <Card.Body className="p-4">
                    <div className="landing-icon mb-4">
                      <Icon aria-hidden="true" />
                    </div>
                    <h3 className="h5 fw-bold">{title}</h3>
                    <p className="mb-0 text-body-secondary">{copy}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section id="how-it-works" className="landing-section py-5">
        <Container className="py-lg-5">
          <Row className="align-items-center g-5">
            <Col lg={5}>
              <span className="small fw-semibold text-uppercase text-primary">
                How it works
              </span>
              <h2 className="display-6 mt-2 fw-bold">
                From scattered numbers to a useful routine
              </h2>
              <p className="text-body-secondary">
                Finance Tracker keeps the workflow short so maintaining your
                records feels manageable, not like another complicated task.
              </p>
              <div className="d-flex gap-3 rounded-4 border bg-white p-4 mt-4">
                <FaRegLightbulb className="mt-1 flex-shrink-0 text-warning" size={24} />
                <div>
                  <strong className="d-block">A better money habit</strong>
                  <span className="text-body-secondary">
                    A few accurate entries create a much clearer monthly picture.
                  </span>
                </div>
              </div>
            </Col>
            <Col lg={7}>
              <div className="d-grid gap-3">
                {steps.map((step) => (
                  <div
                    className="d-flex gap-4 rounded-4 border bg-white p-4 shadow-sm"
                    key={step.number}
                  >
                    <span className="landing-step flex-shrink-0">{step.number}</span>
                    <div>
                      <h3 className="h5 fw-bold">{step.title}</h3>
                      <p className="mb-0 text-body-secondary">{step.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="bg-primary py-5 text-white">
        <Container className="py-lg-4 text-center">
          <h2 className="display-6 fw-bold">Give every dollar a clearer story.</h2>
          <p className="mx-auto mb-4 text-white-50 landing-heading">
            Start recording your transactions today and turn everyday numbers
            into a dashboard you can act on.
          </p>
          <Button
            as={Link}
            to={primaryPath}
            size="lg"
            variant="light"
            className="px-4 fw-semibold text-primary"
          >
            {primaryLabel} <FaArrowRight className="ms-2" />
          </Button>
        </Container>
      </section>
    </>
  );
};

export default LandingPage;
