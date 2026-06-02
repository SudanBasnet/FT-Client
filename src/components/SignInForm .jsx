import { Form, Button } from "react-bootstrap";
import { CustomInput } from "./CustomInput";
import useForm from "../hooks/useForm";
import { loginUser } from "../../helpers/axiosHelper";
import { toast } from "react-toastify";
const initialState = {
  email: "",
  password: "",
};

const SignInform = () => {
  const { form, setForm, handleOnchange } = useForm(initialState);
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
      console.log(data.user, data.accessJWT);
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
        <div className="text-center mt-3">
          Already have an account? <a href="/login">Login</a>
        </div>
      </Form>
    </div>
  );
};

export default SignInform;
