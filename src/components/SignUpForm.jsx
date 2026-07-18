import { Form, Button } from "react-bootstrap";
import { CustomInput } from "./CustomInput";
import { toast } from "react-toastify";
import { postNewUser } from "../../helpers/axiosHelper";
import useForm from "../hooks/useForm";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AppSpinner } from "./AppSpinner";
import { requestWithToast } from "../utils/notifications";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    setIsSubmitting(true);

    const { status } = await requestWithToast(postNewUser(rest), {
      pending: "Creating your account...",
      success: "Account created successfully.",
      error: "Unable to create your account.",
    });

    setIsSubmitting(false);

    if (status === "success") {
      setForm(initialState);
    }
  };
  return (
    <div className="bg-white p-4 p-md-5">
      <p className="mb-2 small fw-semibold text-uppercase text-primary">
        Start tracking today
      </p>
      <h1 className="h3 fw-bold">Create your account</h1>
      <p className="mb-4 text-body-secondary">
        Set up your account and start organizing your finances.
      </p>
      <Form onSubmit={handleOnSubmit}>
        {fields.map((input) => (
          <CustomInput
            key={input.name}
            {...input}
            disabled={isSubmitting}
            onChange={handleOnchange}
          />
        ))}
        <div className="d-grid">
          <Button
            className="py-2 fw-semibold"
            variant="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <AppSpinner label="Creating account..." compact />
            ) : (
              "Sign Up"
            )}
          </Button>
        </div>
        <p className="mb-0 mt-4 text-center text-body-secondary">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </Form>
    </div>
  );
};

export default Signupform;
