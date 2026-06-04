import { useState } from "react";
import { Badge, Table } from "react-bootstrap";
import { useUser } from "../../context/userContext";

export const TransactionTable = () => {
  const { transactions } = useUser();
  const [searchText, setSearchText] = useState("");

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

  return (
    <div className="transaction-panel">
      <div className="transaction-panel__header">
        <div>
          <p className="transaction-panel__label">Overview</p>
          <h3 className="transaction-panel__title">
            {filteredTransactions.length} Transactions Found
          </h3>
        </div>
        <div className="transaction-panel__balance">
          <span>Total Balance</span>
          <strong
            className={totalBalance >= 0 ? "text-success" : "text-danger"}
          >
            {formatAmount(totalBalance)}
          </strong>
        </div>
      </div>

      <div className="transaction-summary">
        <div className="transaction-summary__item">
          <span>Income</span>
          <strong className="text-success">{formatAmount(totalIncome)}</strong>
        </div>
        <div className="transaction-summary__item">
          <span>Expense</span>
          <strong className="text-danger">{formatAmount(totalExpense)}</strong>
        </div>
        <div className="transaction-summary__item">
          <span>Records</span>
          <strong>{filteredTransactions.length}</strong>
        </div>
      </div>

      <div className="transaction-search">
        <input
          type="search"
          placeholder="Search by title, type, amount, or date"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <Table className="transaction-table mb-0" hover responsive>
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Type</th>
            <th>Income</th>
            <th>Expense</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map(
              ({ _id, title, type, amount, tdate }, index) => (
                <tr key={_id || index}>
                  <td>{index + 1}</td>
                  <td className="transaction-table__title">
                    {title}
                  </td>
                  <td>
                    <Badge
                      className="transaction-table__badge"
                      bg={type === "income" ? "success" : "danger"}
                    >
                      {type || "expense"}
                    </Badge>
                  </td>
                  <td className="text-success fw-semibold">
                    {type === "income" ? formatAmount(amount) : "-"}
                  </td>
                  <td className="text-danger fw-semibold">
                    {type !== "income" ? formatAmount(amount) : "-"}
                  </td>
                  <td>{tdate}</td>
                </tr>
              ),
            )
          ) : (
            <tr>
              <td colSpan="6" className="transaction-table__empty">
                {transactions.length > 0
                  ? "No matching transactions found."
                  : "No transactions found."}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
