import React, { useState, useEffect } from "react";
import { app } from "../base";

const home = app.firestore().collection("rent");

const ShowImage = ({ createdBy }) => {
  const [userData, setUserData] = useState("");

  const showUserData = async () => {
    const newUser = await app.auth().currentUser;

    if (newUser) {
      await home
        .doc(createdBy)
        .get()
        .then((doc) => {
          setUserData(doc.data());
          console.log(userData);
        });
    }
  };

  const [name, setName] = useState("");
  const [myUID, setMyUID] = useState("");

  const getName = () => {
    const newUser = app.auth().currentUser;
    if (newUser) {
      home
        .doc(createdBy)
        .get()
        .then((doc) => {
          setName(doc.data());
          console.log(name);
        });
    }
    setMyUID(newUser.uid);
    // console.log(myUID);
  };

  useEffect(() => {
    showUserData();
    getName();
  }, []);
  return (
    <div>
      <div>{createdBy}</div>
      <div>{name && name.name}</div>
    </div>
  );
};

export default ShowImage;
