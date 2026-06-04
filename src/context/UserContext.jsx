import { useState } from "react";
import { UserContext } from "./userContext";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
