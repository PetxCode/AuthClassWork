import React, { useContext, useEffect, useState } from "react";
import { app } from "../base";
import { AuthContext } from "../WorkFile/Context/AuthManager";

const view = app.firestore().collection("authUser");

const AddImage = ({ createdBy }) => {
  const { current, newCurrent } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [myUID, setMyUID] = useState("");

  const getName = () => {
    const newUser = app.auth().currentUser;
    if (newUser) {
      view
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
    getName();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>{myUID === createdBy && <div> Delete post </div>}</div>
      <div
        style={{
          zIndex: "1",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        {name && name.name}
      </div>
      {current ? (
        <img
          src={name && name.avatar}
          alt="avatar"
          style={{
            zIndex: "1",
            width: "50px",
            height: "50px",
            objectFit: "cover",
            borderRadius: "50%",
            border: "4px solid lightblue",
          }}
        />
      ) : null}
    </div>
  );
};

export default AddImage;
