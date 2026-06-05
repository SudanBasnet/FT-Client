import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../CustomInput";
import useForm from "../../hooks/useForm";
import {
  postNewTransaction,
  updateTransaction,
} from "../../../helpers/axiosHelper";
import { toast } from "react-toastify";
import { useUser } from "../../context/userContext";
import { useEffect } from "react";

const initialState = {
  type: "",
  title: "",
  amount: "",
  tdate: "",
};

export const TransactionForm = () => {
  const { form, setForm, handleOnchange } = useForm(initialState);
  const { getTransactions, toggleModal, editingTransaction } = useUser();
  const isEditing = Boolean(editingTransaction?._id);

  useEffect(() => {
    if (editingTransaction?._id) {
      setForm({
        type: editingTransaction.type || "",
        title: editingTransaction.title || "",
        amount: editingTransaction.amount || "",
        tdate: editingTransaction.tdate
          ? new Date(editingTransaction.tdate).toISOString().slice(0, 10)
          : "",
      });
    } else {
      setForm(initialState);
    }
  }, [editingTransaction, setForm]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const pending = isEditing
      ? updateTransaction(editingTransaction._id, form)
      : postNewTransaction(form);

    toast.promise(pending, {
      pending: "please wait ...",
    });
    const { status, data, message } = await pending;
    toast[status](
      data?.message ||
        message ||
        (isEditing ? "Transaction updated" : "Transaction submitted"),
    );

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
    <div className="transaction-form-card">
      <p className="auth-card__eyebrow">
        {isEditing ? "Edit record" : "New record"}
      </p>
      <h2 className="auth-card__title">
        {isEditing ? "Edit transaction" : "Add your transaction"}
      </h2>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Transaction type</Form.Label>
          <Form.Select
            name="type"
            required
            value={form.type}
            onChange={handleOnchange}
          >
            <option value="">--select--</option>
            <option value="income">Income</option>
            <option value="expenses">Expenses</option>
          </Form.Select>
        </Form.Group>
        {fields.map((input) => (
          <CustomInput key={input.name} {...input} onChange={handleOnchange} />
        ))}
        <div className="d-grid">
          <Button className="app-button" variant="primary" type="submit">
            {isEditing ? "Update" : "Submit"}
          </Button>
        </div>
      </Form>
    </div>
  );
};
