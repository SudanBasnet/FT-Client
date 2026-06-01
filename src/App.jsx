import "./App.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Login from "./assets/pages/Login.jsx";
import Signup from "./assets/pages/Signup.jsx";
import { DefaultLayout } from "./components/layouts/DefaultLayout.jsx";

const App = () => {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
