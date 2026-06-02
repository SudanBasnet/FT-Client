import { useState } from "react";

const handleOnchange = ({ e, form, setForm }) => {
  const { name, value } = e.target;

  setForm({ ...form, [name]: value });
};
const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);

  return {
    form,
    setForm,
    handleOnchange: (e) => handleOnchange({ e, form, setForm }),
  };
};

export default useForm;
