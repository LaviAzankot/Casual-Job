import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

export default function StoreContextProvider(props) {
  const [token, setToken] = useState("");
  const api_port = "http://localhost:3000";

  useEffect(() => {
    async function loadData() {
      // Check if user is already signed in
      const token = localStorage.getItem("token");
      if (token) {
        setToken(token);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    console.log("Updated token from context:", token);
  }, [token]);

  const contextValue = {
    api_port,
    setToken,
    token,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
}
