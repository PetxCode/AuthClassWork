import React, { useState, useEffect, useContext } from "react";
import { app } from "../base";
import { AuthContext } from "../WorkFile/Context/AuthManager";

const view = app.firestore().collection("authUser");

const Display = ({ postedBy }) => {
  const { current, newCurrent } = useContext(AuthContext);
  const [getUserData, setGetUserData] = useState([]);

  const getData = async () => {
    const newUser = await app.auth().currentUser;
    if (newUser) {
      await view
        .doc(postedBy)
        .get()
        .then((doc) => {
          setGetUserData(doc.data());
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {current ? (
        <img
          src={getUserData && getUserData.avatar}
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      ) : null}
      <div>{getUserData && getUserData.name} </div>
    </div>
  );
};

export default Display;
