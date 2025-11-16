"use client";

import { createContext, useState } from "react";

export const GlobalContext = createContext({
  token: null,
  username: null,
});

export const GlobalProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  return <GlobalContext.Provider value={{ token, setToken, username, setUsername }}>{children}</GlobalContext.Provider>;
};
