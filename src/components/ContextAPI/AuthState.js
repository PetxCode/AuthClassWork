import React, { createContext, useState, useEffect } from "react";
import { app } from "../../base";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);
  return (
    <AppContext.Provider value={{ currentUser }}>
      {" "}
      {children}{" "}
    </AppContext.Provider>
  );
};
