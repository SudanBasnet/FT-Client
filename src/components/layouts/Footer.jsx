import { Container, Row } from "react-bootstrap";

export const Footer = () => {
  return (
    <Container fluid className="bg-dark text-light mt-5 p-3 ">
      <Row className="text-center py-3">
        <p className="mb-0">Financial Tips &copy; 2024. All rights reserved.</p>
      </Row>
    </Container>
  );
};
