import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../CustomInput";
import useForm from "../../hooks/useForm";
import {
  postNewTransaction,
  updateTransaction,
} from "../../../helpers/axiosHelper";
import { useUser } from "../../context/userContext";
import { useEffect } from "react";
import { useState } from "react";
import { AppSpinner } from "../AppSpinner";
import { requestWithToast } from "../../utils/notifications";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

    const request = isEditing
      ? updateTransaction(editingTransaction._id, form)
      : postNewTransaction(form);
    const { status } = await requestWithToast(request, {
      pending: isEditing ? "Updating transaction..." : "Saving transaction...",
      success: isEditing ? "Transaction updated." : "Transaction added.",
      error: isEditing
        ? "Unable to update the transaction."
        : "Unable to add the transaction.",
    });
    setIsSubmitting(false);

    if (status === "success") {
      setForm(initialState);
      await getTransactions();
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
    <div className="bg-white p-4 text-dark">
      <p className="mb-2 small fw-semibold text-uppercase text-primary">
        {isEditing ? "Edit record" : "New record"}
      </p>
      <h2 className="h4 mb-4 fw-bold">
        {isEditing ? "Edit transaction" : "Add your transaction"}
      </h2>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Transaction type</Form.Label>
          <Form.Select
            name="type"
            required
            disabled={isSubmitting}
            value={form.type}
            onChange={handleOnchange}
          >
            <option value="">--select--</option>
            <option value="income">Income</option>
            <option value="expenses">Expenses</option>
          </Form.Select>
        </Form.Group>
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
              <AppSpinner
                label={isEditing ? "Updating..." : "Saving..."}
                compact
              />
            ) : isEditing ? (
              "Update"
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
};
