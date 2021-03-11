import { Input } from "antd";
import React from "react";
import { app } from "../../base";

const store1 = app.storage();

const UploadImage = () => {
  const [picture, setPicture] = React.useState(null);

  const UploadPix = async (e) => {
    const file = e.target.files[0];
    const storageRef = store1.ref();
    const fileRef = storageRef.child(file);
    await fileRef.put(file);
    setPicture(await fileRef.getDownloadURL());
  };

  return (
    <div>
      <Input
        type="file"
        style={{
          width: "400px",
          paddingLeft: "10px",
        }}
        onClick={UploadPix}
      />
      <br />
      <br />
      <br />
    </div>
  );
};

export default UploadImage;
