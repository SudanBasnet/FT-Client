import { Form, Button } from "react-bootstrap";
import { CustomInput } from "./CustomInput";
import useForm from "../hooks/useForm";
import { loginUser } from "../../helpers/axiosHelper";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const initialState = {
  email: "",
  password: "",
};

const SignInform = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser, getTransactions } = useUser();
  const { form, setForm, handleOnchange } = useForm(initialState);

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
    },
    {
      label: "password",
      type: "password",
      required: true,
      placeholder: "Enter your password",
      name: "password",
      value: form.password,
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const toastId = toast.loading("Please wait...");
      const { status, data, message } = await loginUser(form);
      toast.dismiss(toastId);

      if (status !== "success" || !data?.accessJWT || !data?.user?._id) {
        return toast.error(message || data?.message || "Login failed.");
      }

      toast.success(data?.message || "Login successful!");
      setForm(initialState);
      setUser(data.user);
      localStorage.setItem("accessJWT", data.accessJWT);
      getTransactions();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="auth-card led-border">
      <p className="auth-card__eyebrow">Welcome back</p>
      <h2 className="auth-card__title">Sign in</h2>
      <Form onSubmit={handleOnSubmit}>
        {fields.map((input) => (
          <CustomInput key={input.name} {...input} onChange={handleOnchange} />
        ))}
        <div className="d-grid">
          <Button className="app-button" variant="primary" type="submit">
            Sign In
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignInform;
