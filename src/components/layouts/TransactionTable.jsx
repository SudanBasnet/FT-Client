import { Badge, Table } from "react-bootstrap";

export const TransactionTable = () => {
  const transactions = [
    {
      id: 1,
      title: "Salary",
      type: "income",
      amount: 4200,
      tdate: "2026-06-01",
    },
    {
      id: 2,
      title: "Groceries",
      type: "expenses",
      amount: 185,
      tdate: "2026-06-02",
    },
    {
      id: 3,
      title: "Internet bill",
      type: "expenses",
      amount: 79,
      tdate: "2026-06-03",
    },
  ];

  return (
    <div>
      <h3 className="mb-3">Transactions</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(({ id, title, type, amount, tdate }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{title}</td>
              <td>
                <Badge bg={type === "income" ? "success" : "danger"}>
                  {type}
                </Badge>
              </td>
              <td>${amount.toLocaleString()}</td>
              <td>{tdate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
