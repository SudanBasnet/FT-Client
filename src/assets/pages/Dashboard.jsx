import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import { useUser } from "../../context/userContext";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard = () => {
  const { user, transactions, getTransactions } = useUser();
  const [recentPage, setRecentPage] = useState(1);

  useEffect(() => {
    if (user?._id) {
      getTransactions();
    }
  }, [user?._id, getTransactions]);

  const formatAmount = (amount) => `$${Number(amount || 0).toLocaleString()}`;

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
  const cashFlowData = [
    { name: "Income", amount: totalIncome },
    { name: "Expense", amount: totalExpense },
  ];
  const pieColors = ["#16a34a", "#dc2626"];

  const recentPageSize = 2;
  const recentTransactions = [...transactions].reverse();
  const recentTotalPages =
    Math.ceil(recentTransactions.length / recentPageSize) || 1;
  const recentStartIndex = (recentPage - 1) * recentPageSize;
  const paginatedRecentTransactions = recentTransactions.slice(
    recentStartIndex,
    recentStartIndex + recentPageSize,
  );

  useEffect(() => {
    if (recentPage > recentTotalPages) {
      setRecentPage(recentTotalPages);
    }
  }, [recentPage, recentTotalPages]);

  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type !== "income",
  );

  const topExpenses = expenseTransactions
    .reduce((items, transaction) => {
      const title = transaction.title || "Untitled";
      const current = items.find((item) => item.title === title);

      if (current) {
        current.amount += Number(transaction.amount) || 0;
      } else {
        items.push({
          title,
          amount: Number(transaction.amount) || 0,
        });
      }

      return items;
    }, [])
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 4);

  return (
    <Container className="page-container">
      <Row className="app-surface g-3">
        <Col xs={12}>
          <div className="d-flex flex-column flex-md-row gap-3 align-items-stretch justify-content-between mb-1">
            <div>
              <p className="auth-card__eyebrow">Dashboard</p>
              <h1 className="dashboard-title">
                Welcome {user.name || "back"}
              </h1>
              <p className="dashboard-copy">
                Track cash flow, spot spending patterns, and keep every money
                decision visible.
              </p>
            </div>
            <div className="card p-4 rounded-4 shadow dashboard-balance-card">
              <span className="text-muted fw-bold text-uppercase">
                Total Balance
              </span>
              <strong
                className={totalBalance >= 0 ? "text-success" : "text-danger"}
              >
                {formatAmount(totalBalance)}
              </strong>
            </div>
          </div>
        </Col>

        <Col md={4}>
          <div className="card h-100 p-3 rounded-4 shadow">
            <span className="text-muted fw-bold text-uppercase">Income</span>
            <strong className="fs-4 text-success">
              {formatAmount(totalIncome)}
            </strong>
          </div>
        </Col>
        <Col md={4}>
          <div className="card h-100 p-3 rounded-4 shadow">
            <span className="text-muted fw-bold text-uppercase">Expense</span>
            <strong className="fs-4 text-danger">
              {formatAmount(totalExpense)}
            </strong>
          </div>
        </Col>
        <Col md={4}>
          <div className="card h-100 p-3 rounded-4 shadow">
            <span className="text-muted fw-bold text-uppercase">
              Transactions
            </span>
            <strong className="fs-4">{transactions.length}</strong>
          </div>
        </Col>

        <Col lg={7}>
          <div className="card h-100 p-4 rounded-4 shadow overflow-hidden">
            <div className="d-flex gap-3 align-items-center justify-content-between mb-3">
              <h2 className="fs-5 fw-bold mb-0">Cash Flow</h2>
              <span className="text-muted fw-bold text-uppercase">
                Income vs expense
              </span>
            </div>
            <div className="dashboard-chart">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={cashFlowData}
                    dataKey="amount"
                    nameKey="name"
                    innerRadius={58}
                    outerRadius={92}
                    paddingAngle={4}
                    label={({ name, value }) =>
                      value > 0 ? `${name}: ${formatAmount(value)}` : ""
                    }
                  >
                    {cashFlowData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatAmount(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Col>

        <Col lg={5}>
          <div className="card h-100 p-4 rounded-4 shadow overflow-hidden">
            <div className="d-flex gap-3 align-items-center justify-content-between mb-3">
              <h2 className="fs-5 fw-bold mb-0">Top Expenses</h2>
              <span className="text-muted fw-bold text-uppercase">By title</span>
            </div>
            <div className="dashboard-chart">
              {topExpenses.length > 0 ? (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={topExpenses} layout="vertical">
                    <XAxis
                      type="number"
                      tickFormatter={(value) => `$${value}`}
                    />
                    <YAxis
                      type="category"
                      dataKey="title"
                      width={92}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip formatter={(value) => formatAmount(value)} />
                    <Bar dataKey="amount" fill="#dc2626" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted fw-bold mb-0">No expenses yet.</p>
              )}
            </div>
          </div>
        </Col>

        <Col xs={12}>
          <div className="card p-4 rounded-4 shadow overflow-hidden">
            <div className="d-flex gap-3 align-items-center justify-content-between mb-3">
              <h2 className="fs-5 fw-bold mb-0">Recent Activity</h2>
              <span className="text-muted fw-bold text-uppercase">
                Latest records
              </span>
            </div>
            <div className="d-grid gap-0">
              {paginatedRecentTransactions.length > 0 ? (
                paginatedRecentTransactions.map((transaction) => (
                  <div
                    className="dashboard-recent-item"
                    key={transaction._id}
                  >
                    <div className="d-grid min-w-0">
                      <strong className="text-truncate">
                        {transaction.title || "Untitled transaction"}
                      </strong>
                      <span className="text-muted fw-bold">
                        {transaction.type}
                      </span>
                    </div>
                    <b
                      className={
                        transaction.type === "income"
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {formatAmount(transaction.amount)}
                    </b>
                  </div>
                ))
              ) : (
                <p className="text-muted fw-bold mb-0">No transactions yet.</p>
              )}
            </div>
            {recentTransactions.length > recentPageSize && (
              <div className="d-flex flex-column flex-sm-row gap-3 align-items-sm-center justify-content-between mt-3 pt-3 border-top">
                <span className="text-muted fw-bold">
                  Showing {recentStartIndex + 1}-
                  {Math.min(
                    recentStartIndex + recentPageSize,
                    recentTransactions.length,
                  )}{" "}
                  of {recentTransactions.length}
                </span>
                <Pagination className="mb-0">
                  <Pagination.Prev
                    disabled={recentPage === 1}
                    onClick={() => setRecentPage((page) => page - 1)}
                  />
                  {Array.from({ length: recentTotalPages }, (_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={recentPage === index + 1}
                      onClick={() => setRecentPage(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    disabled={recentPage === recentTotalPages}
                    onClick={() => setRecentPage((page) => page + 1)}
                  />
                </Pagination>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Dashboard;
