import { Form, Button } from "react-bootstrap";
import { CustomInput } from "./CustomInput";
import { useState } from "react";
import { toast } from "react-toastify";
import { postNewUser } from "../../helpers/axiosHelper";

const Signupform = () => {
  const [form, setForm] = useState({});
  const fields = [
    {
      label: "name",
      type: "text",
      required: true,
      placeholder: "Enter your name",
      name: "name",
    },
    {
      label: "email",
      type: "email",
      required: true,
      placeholder: "Enter your email",
      name: "email",
    },
    {
      label: "password",
      type: "password",
      required: true,
      placeholder: "Enter your password",
      name: "password",
    },
    {
      label: "Confirm Password",
      type: "password",
      required: true,
      placeholder: "Confirm your password",
      name: "confirmPassword",
    },
  ];

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm({ ...form, [name]: value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.password) {
      return toast.error("Passwords do not match");
    }
    // const { status, message } = await postNewUser(rest);
    // toast[status](message);

    const { status, data, message } = await postNewUser(rest);

    if (status === "success") {
      const responseMessage = data?.message || "Account created successfully";
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
    <div className="border p-4 rounded">
      <h2 className="mb-4">Create an Account</h2>
      <Form onSubmit={handleOnSubmit}>
        {fields.map((input) => (
          <CustomInput key={input.name} {...input} onChange={handleOnchange} />
        ))}
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
