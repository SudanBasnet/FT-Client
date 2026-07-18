import { useCallback, useState } from "react";
import { UserContext } from "./userContext";
import { fetchTransactions } from "../../helpers/axiosHelper";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [hasLoadedTransactions, setHasLoadedTransactions] = useState(false);

  //!modal

  const [show, setShow] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const toggleModal = (value) => {
    setShow(value);

    if (!value) {
      setEditingTransaction(null);
    }
  };
  const getTransactions = useCallback(async () => {
    try {
      const { status, data, message } = await fetchTransactions();

      if (status === "success") {
        setTransactions(data?.transactions || []);
      } else {
        console.log("Unable to fetch transactions:", message);
        setTransactions([]);
      }
    } finally {
      setHasLoadedTransactions(true);
    }
  }, []);

  const clearTransactions = () => {
    setTransactions([]);
    setHasLoadedTransactions(false);
  };
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        transactions,
        setTransactions,
        hasLoadedTransactions,
        getTransactions,
        clearTransactions,
        toggleModal,
        show,
        editingTransaction,
        setEditingTransaction,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
