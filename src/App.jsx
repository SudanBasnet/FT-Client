import "./App.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Login from "./assets/pages/Login.jsx";
import Signup from "./assets/pages/Signup.jsx";
import { DefaultLayout } from "./components/layouts/DefaultLayout.jsx";
import Transaction from "./assets/pages/Transaction.jsx";
import Dashboard from "./assets/pages/Dashboard.jsx";
import { Auth } from "./auth/Auth.jsx";
import { useEffect } from "react";
import { useUser } from "./context/userContext.js";
import { autoLogin } from "./utils/users.js";

const App = () => {
  const { user, setUser } = useUser();
  useEffect(() => {
    const updateUser = async () => {
      const user = await autoLogin();
      setUser(user || {});
    };

    //autologin
    !user?._id && updateUser();
  }, [user?._id, setUser]);

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route
            path="transaction"
            element={
              <Auth>
                <Transaction />
              </Auth>
            }
          />
          <Route
            path="dashboard"
            element={
              <Auth>
                <Dashboard />
              </Auth>
            }
          />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
