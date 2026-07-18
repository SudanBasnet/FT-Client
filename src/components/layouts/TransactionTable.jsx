import { useState } from "react";
import { Badge, Button, Form, Pagination, Table } from "react-bootstrap";
import { useUser } from "../../context/userContext";
import { deleteTransactions } from "../../../helpers/axiosHelper";
import { AppSpinner } from "../AppSpinner";
import { requestWithToast } from "../../utils/notifications";

export const TransactionTable = () => {
  const { transactions, getTransactions, toggleModal, setEditingTransaction } =
    useUser();
  const [searchText, setSearchText] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const pageSize = 5;

  const formatAmount = (amount) => `$${Number(amount || 0).toLocaleString()}`;

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleDateString();
  };

  const displayTransactions = transactions.map((transaction) => ({
    ...transaction,
    title: transaction.title || "Untitled transaction",
    type: transaction.type || "",
    amount: Number(transaction.amount) || 0,
    rawDate: transaction.tdate,
    tdate: formatDate(transaction.tdate),
  }));

  const filteredTransactions = displayTransactions.filter((transaction) => {
    const search = searchText.toLowerCase();
    const amount = String(transaction.amount);

    return (
      transaction.title.toLowerCase().includes(search) ||
      transaction.type.toLowerCase().includes(search) ||
      amount.includes(search) ||
      transaction.tdate.toLowerCase().includes(search)
    );
  });

  const totalIncome = filteredTransactions.reduce((total, transaction) => {
    if (transaction.type !== "income") {
      return total;
    }

    return total + (Number(transaction.amount) || 0);
  }, 0);

  const totalExpense = filteredTransactions.reduce((total, transaction) => {
    if (transaction.type === "income") {
      return total;
    }

    return total + (Number(transaction.amount) || 0);
  }, 0);

  const totalBalance = totalIncome - totalExpense;
  const totalPages = Math.ceil(filteredTransactions.length / pageSize) || 1;
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * pageSize;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + pageSize,
  );

  const filteredIds = filteredTransactions
    .map((transaction) => transaction._id)
    .filter(Boolean);
  const currentPageIds = paginatedTransactions
    .map((transaction) => transaction._id)
    .filter(Boolean);
  const validSelectedIds = selectedIds.filter((id) => filteredIds.includes(id));

  const isAllSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => validSelectedIds.includes(id));

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setSelectedIds((ids) => [...new Set([...ids, value])]);
    } else {
      setSelectedIds((ids) => ids.filter((id) => id !== value));
    }
  };

  const handleOnSelectAll = (e) => {
    const { checked } = e.target;

    if (checked) {
      setSelectedIds((ids) => [...new Set([...ids, ...currentPageIds])]);
    } else {
      setSelectedIds((ids) => ids.filter((id) => !currentPageIds.includes(id)));
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
    setSelectedIds([]);
  };

  const handleOnDelete = async () => {
    if (
      confirm(
        `Are you sure you want to delete ${validSelectedIds.length} transactions`,
      )
    ) {
      setIsDeleting(true);
      const { status } = await requestWithToast(
        deleteTransactions({ ids: validSelectedIds }),
        {
          pending: "Deleting selected transactions...",
          success: "Transactions deleted.",
          error: "Unable to delete the selected transactions.",
        },
      );

      if (status === "success") {
        setSelectedIds([]);
        await getTransactions();
      }

      setIsDeleting(false);
    }
  };

  const handleOnEdit = (transaction) => {
    if (isDeleting) {
      return;
    }

    setEditingTransaction(transaction);
    toggleModal(true);
  };

  return (
    <div className="card overflow-hidden border-0 text-dark shadow-sm">
      <div className="d-flex flex-column flex-sm-row gap-3 align-items-sm-center justify-content-between p-4 border-bottom">
        <div>
          <p className="text-muted fw-bold text-uppercase mb-1">Overview</p>
          <h3 className="fs-4 fw-bold mb-0">
            {filteredTransactions.length} Transactions Found
          </h3>
        </div>
        <div className="text-sm-end">
          <span className="text-muted fw-bold">Total Balance</span>
          <strong
            className={`d-block fs-4 ${
              totalBalance >= 0 ? "text-success" : "text-danger"
            }`}
          >
            {formatAmount(totalBalance)}
          </strong>
        </div>
      </div>

      <div className="row g-0 bg-light border-bottom">
        <div className="col-md-4 p-3 border-end">
          <span className="text-muted fw-bold">Income</span>
          <strong className="d-block fs-5 text-success">
            {formatAmount(totalIncome)}
          </strong>
        </div>
        <div className="col-md-4 p-3 border-end">
          <span className="text-muted fw-bold">Expense</span>
          <strong className="d-block fs-5 text-danger">
            {formatAmount(totalExpense)}
          </strong>
        </div>
        <div className="col-md-4 p-3">
          <span className="text-muted fw-bold">Records</span>
          <strong className="d-block fs-5">{filteredTransactions.length}</strong>
        </div>
      </div>

      <div className="p-3 border-bottom">
        <Form.Control
          type="search"
          placeholder="Search by title, type, amount, or date"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>

      {validSelectedIds.length > 0 && (
        <div className="px-4 py-2 border-bottom bg-info-subtle text-info-emphasis fw-bold">
          {validSelectedIds.length} selected
        </div>
      )}

      <Table className="mb-0 align-middle" hover responsive>
        <thead className="table-dark small text-uppercase">
          <tr>
            <th>
              <Form.Check
                checked={isAllSelected}
                onChange={handleOnSelectAll}
              />
            </th>
            <th>No.</th>
            <th>Title</th>
            <th>Type</th>
            <th>Income</th>
            <th>Expense</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.length > 0 ? (
            paginatedTransactions.map((transaction, index) => (
              <tr key={transaction._id || index}>
                <td>
                  <Form.Check
                    disabled={!transaction._id}
                    checked={validSelectedIds.includes(transaction._id)}
                    value={transaction._id}
                    onChange={handleOnSelect}
                  />
                </td>
                <td>{startIndex + index + 1}</td>
                <td className="fw-semibold">{transaction.title}</td>
                <td>
                  <Badge
                    className="px-2 py-2 text-capitalize"
                    bg={transaction.type === "income" ? "success" : "danger"}
                  >
                    {transaction.type || "expense"}
                  </Badge>
                </td>
                <td className="text-success fw-semibold">
                  {transaction.type === "income"
                    ? formatAmount(transaction.amount)
                    : "-"}
                </td>
                <td className="text-danger fw-semibold">
                  {transaction.type !== "income"
                    ? formatAmount(transaction.amount)
                    : "-"}
                </td>
                <td>{transaction.tdate}</td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    disabled={isDeleting}
                    onClick={() =>
                      handleOnEdit({
                        ...transaction,
                        tdate: transaction.rawDate,
                      })
                    }
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="8"
                className="py-5 text-center fw-semibold text-body-secondary"
              >
                {transactions.length > 0
                  ? "No matching transactions found."
                  : "No transactions found."}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {filteredTransactions.length > pageSize && (
        <div className="d-flex flex-column flex-sm-row gap-3 align-items-sm-center justify-content-between p-3 border-top">
          <span className="text-muted fw-bold">
            Showing {startIndex + 1}-
            {Math.min(startIndex + pageSize, filteredTransactions.length)} of{" "}
            {filteredTransactions.length}
          </span>
          <Pagination className="mb-0">
            <Pagination.Prev
              disabled={activePage === 1}
              onClick={() => setCurrentPage(activePage - 1)}
            />
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={activePage === index + 1}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={activePage === totalPages}
              onClick={() => setCurrentPage(activePage + 1)}
            />
          </Pagination>
        </div>
      )}
      {validSelectedIds.length > 0 && (
        <div className="d-grid p-3 border-top">
          <Button
            variant="danger"
            onClick={handleOnDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <AppSpinner label="Deleting..." compact />
            ) : (
              `Delete ${validSelectedIds.length} Transactions`
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
