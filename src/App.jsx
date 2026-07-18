import "./App.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Login from "./assets/pages/Login.jsx";
import Signup from "./assets/pages/Signup.jsx";
import { DefaultLayout } from "./components/layouts/DefaultLayout.jsx";
import Transaction from "./assets/pages/Transaction.jsx";
import Dashboard from "./assets/pages/Dashboard.jsx";
import LandingPage from "./assets/pages/LandingPage.jsx";
import { Auth } from "./auth/Auth.jsx";
import { useEffect, useState } from "react";
import { useUser } from "./context/userContext.js";
import { autoLogin } from "./utils/users.js";
import { AppSpinner } from "./components/AppSpinner.jsx";

const App = () => {
  const { user, setUser } = useUser();
  const [isCheckingSession, setIsCheckingSession] = useState(
    Boolean(localStorage.getItem("accessJWT")),
  );

  useEffect(() => {
    const updateUser = async () => {
      try {
        const currentUser = await autoLogin();
        setUser(currentUser || {});
      } finally {
        setIsCheckingSession(false);
      }
    };

    //autologin
    !user?._id && updateUser();
  }, [user?._id, setUser]);

  if (isCheckingSession) {
    return (
      <div className="d-flex min-vh-100 align-items-center justify-content-center bg-body-tertiary">
        <AppSpinner label="Restoring your session..." />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
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
      <ToastContainer
        position="top-right"
        autoClose={3500}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
        theme="light"
      />
    </>
  );
};

export default App;
