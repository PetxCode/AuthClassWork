import { Button } from "antd";
import React, { useState, useEffect, useContext } from "react";
import { app } from "../base";

const view = app.firestore().collection("post");

const AvailableButton = ({ createdBy }) => {
  const [myUID, setMyUID] = useState("");
  const [free, setFree] = useState(false);

  const showDB = async () => {
    const newPost = await app.auth().currentUser;

    if (newPost) {
      setMyUID(newPost.uid);
    }
  };

  useEffect(() => {
    showDB();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div> {free ? <div> Open </div> : <div> Close </div>}</div>{" "}
        {myUID === createdBy && (
          <div>
            <Button
              onClick={(e) => {
                setFree(!free);
              }}
            >
              Open
            </Button>{" "}
          </div>
        )}{" "}
      </div>
    </div>
  );
};

export default AvailableButton;
