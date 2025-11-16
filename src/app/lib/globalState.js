"use client";

import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext({
  token: null,
  username: null,
});

export const GlobalProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      const u = token.split("-")[0];
      setUsername(u);

      fetch("/api/auth/validateToken", { method: "POST", body: JSON.stringify({ token }) })
        .then((res) => res.json())
        .then((res) => {
          if (!res.valid) {
            localStorage.removeItem("token");
            setToken(null);
            setUsername(null);
          }
        });
    }
  }, []);

  return <GlobalContext.Provider value={{ token, setToken, username, setUsername }}>{children}</GlobalContext.Provider>;
};
