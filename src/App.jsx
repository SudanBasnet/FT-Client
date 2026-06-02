import "./App.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Login from "./assets/pages/Login.jsx";
import Signup from "./assets/pages/Signup.jsx";
import { DefaultLayout } from "./components/layouts/DefaultLayout.jsx";
import Transaction from "./assets/pages/Transaction.jsx";
import Dashboard from "./assets/pages/Dashboard.jsx";

const App = () => {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
