import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../CustomInput";
import useForm from "../../hooks/useForm";
import { postNewTransaction } from "../../../helpers/axiosHelper";
import { toast } from "react-toastify";
import { useUser } from "../../context/userContext";

const initialState = {
  type: "",
  title: "",
  amount: "",
  tdate: "",
};

export const TransactionForm = () => {
  const { form, setForm, handleOnchange } = useForm(initialState);
  const { getTransactions, toggleModal } = useUser();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const pending = postNewTransaction(form);
    toast.promise(pending, {
      pending: "please wait ...",
    });
    const { status, data, message } = await pending;
    toast[status](data?.message || message || "transaction Submitted");

    if (status === "success") {
      setForm(initialState);
      //fetched all transactions
      getTransactions();
      //close the modal
      toggleModal(false);
    }
  };
  const fields = [
    {
      label: "Title",
      type: "text",
      required: true,
      placeholder: "Salary",
      name: "title",
      value: form.title,
    },
    {
      label: "Amount",
      type: "number",
      required: true,
      placeholder: "44",
      name: "amount",
      value: form.amount,
    },
    {
      label: "Transaction date",
      type: "date",
      required: true,
      placeholder: "",
      name: "tdate",
      value: form.tdate,
    },
  ];
  return (
    <div className="border p-4 rounded">
      <h2 className="mb-4">Add your transaction</h2>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Transaction type</Form.Label>
          <Form.Select name="type" required onChange={handleOnchange}>
            <option value="">--select--</option>
            <option value="income">Income</option>
            <option value="expenses">Expenses</option>
          </Form.Select>
        </Form.Group>
        {fields.map((input) => (
          <CustomInput key={input.name} {...input} onChange={handleOnchange} />
        ))}
        <div className="d-grid">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};
