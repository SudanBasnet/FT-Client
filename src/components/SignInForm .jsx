import { Button, Form } from "react-bootstrap";
import { CustomInput } from "./CustomInput";
import useForm from "../hooks/useForm";
import { loginUser } from "../../helpers/axiosHelper";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppSpinner } from "./AppSpinner";
import { completeToast } from "../utils/notifications";
const initialState = {
  email: "",
  password: "",
};

const SignInform = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser, getTransactions } = useUser();
  const { form, setForm, handleOnchange } = useForm(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const goTo = location?.state?.from?.pathname || "/dashboard";
  useEffect(() => {
    user?._id && navigate(goTo);
  }, [user?._id, navigate, goTo]);
  const fields = [
    {
      label: "email",
      type: "email",
      required: true,
      placeholder: "Enter your email",
      name: "email",
      value: form.email,
      autoComplete: "email",
    },
    {
      label: "password",
      type: "password",
      required: true,
      placeholder: "Enter your password",
      name: "password",
      value: form.password,
      autoComplete: "current-password",
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading("Signing you in...");

    try {
      const { status, data, message } = await loginUser(form);

      if (status !== "success" || !data?.accessJWT || !data?.user?._id) {
        completeToast(
          toastId,
          "error",
          message || data?.message || "Login failed.",
        );
        return;
      }

      completeToast(
        toastId,
        "success",
        data?.message || "Login successful!",
      );
      setForm(initialState);
      setUser(data.user);
      localStorage.setItem("accessJWT", data.accessJWT);
      getTransactions();
    } catch (error) {
      console.log(error);
      completeToast(toastId, "error", "Unable to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="bg-white p-4 p-md-5">
      <p className="mb-2 small fw-semibold text-uppercase text-primary">
        Welcome back
      </p>
      <h1 className="h3 fw-bold">Sign in to your account</h1>
      <p className="mb-4 text-body-secondary">
        Enter your details to continue to Finance Tracker.
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
              <AppSpinner label="Signing in..." compact />
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
        <p className="mb-0 mt-4 text-center text-body-secondary">
          New to Finance Tracker? <Link to="/signup">Create an account</Link>
        </p>
      </Form>
    </div>
  );
};

export default SignInform;
