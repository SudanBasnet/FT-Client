import { useCallback, useState } from "react";
import { UserContext } from "./userContext";
import { fetchTransactions } from "../../helpers/axiosHelper";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const getTransactions = useCallback(async () => {
    //call axios helper to call api
    const { status, data } = await fetchTransactions();

    //receive datga and mount to transactions,setTransactions

    status === "success" && setTransactions(data?.transactions || []);
  }, []);
  return (
    <UserContext.Provider
      value={{ user, setUser, transactions, setTransactions, getTransactions }}
    >
      {children}
    </UserContext.Provider>
  );
};
