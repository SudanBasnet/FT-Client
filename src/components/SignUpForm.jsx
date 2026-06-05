import { Form, Button } from "react-bootstrap";
import { CustomInput } from "./CustomInput";
import { toast } from "react-toastify";
import { postNewUser } from "../../helpers/axiosHelper";
import useForm from "../hooks/useForm";
import { Link } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const isValidPassword = (password = "") => {
  const hasMinLength = password.length >= 5;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialCharacter = /[^A-Za-z0-9]/.test(password);

  return hasMinLength && hasUpperCase && hasSpecialCharacter;
};

const Signupform = () => {
  const { form, setForm, handleOnchange } = useForm(initialState);
  const fields = [
    {
      label: "name",
      type: "text",
      required: true,
      placeholder: "Enter your name",
      name: "name",
      value: form.name,
    },
    {
      label: "email",
      type: "email",
      required: true,
      placeholder: "Enter your email",
      name: "email",
      value: form.email,
    },
    {
      label: "password",
      type: "password",
      required: true,
      placeholder: "Min 5 chars, 1 uppercase, 1 special character",
      name: "password",
      value: form.password,
    },
    {
      label: "Confirm Password",
      type: "password",
      required: true,
      placeholder: "Confirm your password",
      name: "confirmPassword",
      value: form.confirmPassword,
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.password) {
      return toast.error("Passwords do not match");
    }

    if (!isValidPassword(rest.password)) {
      return toast.error(
        "Password must be at least 5 characters and include one uppercase letter and one special character.",
      );
    }

    const { status, data, message } = await postNewUser(rest);

    if (status === "success") {
      const responseMessage = data?.message || "Account created successfully";
      setForm(initialState);
      const isErrorResponse = data?.status?.toLowerCase() === "error";

      if (isErrorResponse) {
        toast.error(responseMessage);
      } else {
        toast.success(responseMessage);
      }
    } else {
      toast.error(message || data?.message || "Something went wrong");
    }
  };
  return (
    <div className="auth-card led-border">
      <p className="auth-card__eyebrow">Start tracking today</p>
      <h2 className="auth-card__title">Create an Account</h2>
      <Form onSubmit={handleOnSubmit}>
        {fields.map((input) => (
          <CustomInput key={input.name} {...input} onChange={handleOnchange} />
        ))}
        <div className="d-grid">
          <Button className="app-button" variant="primary" type="submit">
            Sign Up
          </Button>
        </div>
        <div className="text-center mt-3">
          Already have an account? <Link to="/">Login</Link>
        </div>
      </Form>
    </div>
  );
};

export default Signupform;
