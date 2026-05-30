import { Form, Button } from "react-bootstrap";

const Signupform = () => {
  return (
    <div className="border p-4 rounded">
      <h2 className="mb-4">Create an Account</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            name="name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="I agree to the Terms & Conditions"
          />
        </Form.Group>

        <div className="d-grid">
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </div>

        <div className="text-center mt-3">
          Already have an account? <a href="/login">Login</a>
        </div>
      </Form>
    </div>
  );
};

export default Signupform;
