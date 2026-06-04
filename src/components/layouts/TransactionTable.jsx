import { Badge, Table } from "react-bootstrap";
import { useUser } from "../../context/userContext";

export const TransactionTable = () => {
  const { transactions } = useUser();

  const totalIncome = transactions.reduce((total, transaction) => {
    if (transaction.type !== "income") {
      return total;
    }

    return total + (Number(transaction.amount) || 0);
  }, 0);

  const totalExpense = transactions.reduce((total, transaction) => {
    if (transaction.type === "income") {
      return total;
    }

    return total + (Number(transaction.amount) || 0);
  }, 0);

  const totalBalance = totalIncome - totalExpense;

  const formatAmount = (amount) => `$${Number(amount || 0).toLocaleString()}`;

  return (
    <div className="transaction-panel">
      <div className="transaction-panel__header">
        <div>
          <p className="transaction-panel__label">Overview</p>
          <h3 className="transaction-panel__title">Transactions</h3>
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
          <strong>{transactions.length}</strong>
        </div>
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
          {transactions.length > 0 ? (
            transactions.map(({ _id, title, type, amount, tdate }, index) => (
              <tr key={_id}>
                <td>{index + 1}</td>
                <td className="transaction-table__title">{title}</td>
                <td>
                  <Badge
                    className="transaction-table__badge"
                    bg={type === "income" ? "success" : "danger"}
                  >
                    {type}
                  </Badge>
                </td>
                <td className="text-success fw-semibold">
                  {type === "income" ? formatAmount(amount) : "-"}
                </td>
                <td className="text-danger fw-semibold">
                  {type !== "income" ? formatAmount(amount) : "-"}
                </td>
                <td>{new Date(tdate).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="transaction-table__empty">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
