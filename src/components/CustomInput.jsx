import Form from "react-bootstrap/Form";

export const CustomInput = ({ label, ...rest }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label className="fw-semibold text-capitalize">{label}</Form.Label>
      <Form.Control {...rest} />
    </Form.Group>
  );
};
