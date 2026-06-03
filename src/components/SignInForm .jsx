import { Form, Button } from "react-bootstrap";
import { CustomInput } from "./CustomInput";
import useForm from "../hooks/useForm";
import { loginUser } from "../../helpers/axiosHelper";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const initialState = {
  email: "",
  password: "",
};

const SignInform = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { form, setForm, handleOnchange } = useForm(initialState);
  useEffect(() => {
    user?._id && navigate("/dashboard");
  }, [user?._id, navigate]);
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
    console.log(form);

    try {
      const pendingResp = loginUser(form);

      const { data } = await toast.promise(pendingResp, {
        pending: "Please wait...",
        success: {
          render({ data }) {
            return data?.data?.message || "Login successful!";
          },
        },
        error: {
          render({ data }) {
            return data?.message || "Login failed. Please try again.";
          },
        },
      });

      setForm(initialState);
      setUser(data.user);
      console.log(data.user, data.accessJWT);
      localStorage.setItem("accessJWT", data.accessJWT);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border p-4 rounded">
      <h2 className="mb-4">Sign in </h2>
      <Form onSubmit={handleOnSubmit}>
        {fields.map((input) => (
          <CustomInput key={input.name} {...input} onChange={handleOnchange} />
        ))}
        <div className="d-grid">
          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignInform;
