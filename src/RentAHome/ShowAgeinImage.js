import React, { useState, useEffect, useContext } from "react";
import { app } from "../base";
import { AuthContext } from "../WorkFile/Context/AuthManager";

const home = app.firestore().collection("rent");
const ShowAgeinImage = ({ createdBy }) => {
  const { current } = useContext(AuthContext);
  const [userFile, setUserFile] = useState([]);

  const getData = async () => {
    const newUser = await app.auth().currentUser;

    if (newUser) {
      await home
        .doc()
        .get(createdBy)
        .then((doc) => {
          setUserFile(doc.data());
          console.log(userFile);
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div>{createdBy}</div>
      <div>{userFile && userFile.name}</div>
    </div>
  );
};

export default ShowAgeinImage;
