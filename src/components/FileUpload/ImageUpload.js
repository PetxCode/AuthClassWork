import { Button, Input } from "antd";
import React, { useState, useEffect } from "react";
import { app } from "../../base";

const ImageUpload = () => {
  const [pictureUrl, setPictureUrl] = useState(null);
  const [name, setName] = useState("");

  const imageUpload = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setPictureUrl(await fileRef.getDownloadURL());
  };

  const uploadData = async () => {
    await app
      .firestore()
      .collection("newData")
      .doc()
      .set({
        name,
        avatar: await pictureUrl,
      });
    setPictureUrl("");
    setName("");
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <center>Push file to fire base</center>
      <Input
        type="file"
        onChange={imageUpload}
        style={{
          width: "400px",
          marginRight: "30px",
        }}
      />
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        style={{
          width: "400px",
          marginRight: "30px",
        }}
      />
      <Button onClick={uploadData}>Submit</Button>
    </div>
  );
};

export default ImageUpload;
