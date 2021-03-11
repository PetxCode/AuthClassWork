import { app } from "../../base";
import React, { createContext, useState, useEffect } from "react";

const userThis = app.firestore().collection("authUser");

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [newCurrent, setNewCurrent] = useState();
  const [current, setCurrent] = useState();

  // const getUsersData = async () => {
  //   const newUser = await app.auth().currentUser;
  //   if (newUser) {
  //     await app
  //       .firestore()
  //       .collection("authUser")
  //       .doc(user.uid)
  //       .onSnapshot((snapshot) => {
  //         const item = [];
  //         snapshot.forEach((doc) => {
  //           item.push({ ...doc.data(), id: doc.id });
  //         });
  //         setNewCurrent(item);
  //       });
  //   }
  // };

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrent(user);

      userThis
        .doc(user.uid)
        .get()
        .then((doc) => {
          setNewCurrent(doc.data());
        });
    });
  }, []);
  return (
    <AuthContext.Provider value={{ current, newCurrent }}>
      {children}
    </AuthContext.Provider>
  );
};
