import { useCallback, useState } from "react";
import { UserContext } from "./userContext";
import { fetchTransactions } from "../../helpers/axiosHelper";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);

  //!modal

  const [show, setShow] = useState(false);

  const toggleModal = (value) => setShow(value);
  const getTransactions = useCallback(async () => {
    //call axios helper to call api
    const { status, data, message } = await fetchTransactions();

    //receive datga and mount to transactions,setTransactions

    if (status === "success") {
      setTransactions(data?.transactions || []);
    } else {
      console.log("Unable to fetch transactions:", message);
      setTransactions([]);
    }
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        transactions,
        setTransactions,
        getTransactions,
        toggleModal,
        show,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
